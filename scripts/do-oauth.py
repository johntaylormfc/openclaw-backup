#!/usr/bin/env python3
"""Run Gmail OAuth flow using Chrome on the Xrdp display."""
import json, http.server, urllib.parse, urllib.request, threading, time, os, subprocess

CONFIG = '/home/john/.openclaw/workspace/config/google-oauth.json'
TOKEN_FILE = '/home/john/.openclaw/workspace/config/google-oauth-token.json'

with open(CONFIG) as f:
    creds = json.load(f)['web']
client_id = creds['client_id']
client_secret = creds['client_secret']

# Build auth URL
params = {
    'access_type': 'offline',
    'client_id': client_id,
    'redirect_uri': 'http://localhost',
    'response_type': 'code',
    'scope': 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/drive',
    'prompt': 'consent',
}
auth_url = 'https://accounts.google.com/o/oauth2/v2/auth?' + urllib.parse.urlencode(params)
print('Auth URL:', auth_url)

# HTTP server to catch the redirect
code_received = threading.Event()
code_value = {}

class Handler(http.server.BaseHTTPRequestHandler):
    def log_message(self, *args): pass
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        params = urllib.parse.parse_qs(parsed.query)
        if 'code' in params:
            code_value['code'] = params['code'][0]
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            self.wfile.write(b'<html><body><h1>OK - close this window</h1></body></html>')
            code_received.set()
        else:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b'No code')

server = http.server.HTTPServer(('', 80), Handler)
t = threading.Thread(target=server.handle_request)
t.start()

print('Server started on port 80')
print('Opening Chrome...')

# Open Chrome on the Xrdp display
env = os.environ.copy()
env['DISPLAY'] = ':10'
chrome = subprocess.Popen(
    ['/usr/bin/google-chrome', '--new-window', '--incognito', auth_url],
    env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
)

print('Waiting for OAuth redirect (5 min timeout)...')
if code_received.wait(timeout=300):
    print('Got code! Exchanging for tokens...')
    code = code_value['code']
    
    # Exchange code for tokens
    data = urllib.parse.urlencode({
        'code': code,
        'client_id': client_id,
        'client_secret': client_secret,
        'redirect_uri': 'http://localhost',
        'grant_type': 'authorization_code',
    }).encode()
    
    req = urllib.request.Request('https://oauth2.googleapis.com/token', data=data)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            tokens = json.loads(resp.read())
            print('✅ Token exchange SUCCESS!')
            print('Access token expires in:', tokens.get('expires_in'), 'seconds')
            
            # Save token
            import time as t_
            token_data = {
                'access_token': tokens['access_token'],
                'refresh_token': tokens.get('refresh_token', ''),
                'token_type': tokens.get('token_type', 'Bearer'),
                'expiry_date': (int(t_.time()) + tokens.get('expires_in', 3600)) * 1000,
                'scope': 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/drive',
                'client_id': client_id,
                'client_secret': client_secret,
            }
            
            with open(TOKEN_FILE, 'w') as f:
                json.dump(token_data, f, indent=2)
            print('Token saved to:', TOKEN_FILE)
            
    except Exception as e:
        print('❌ Token exchange error:', e)
        if hasattr(e, 'read'):
            print(e.read().decode())
else:
    print('❌ Timeout - no OAuth redirect received')

server.server_close()
chrome.terminate()
