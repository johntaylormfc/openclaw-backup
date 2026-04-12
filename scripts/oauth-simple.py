#!/usr/bin/env python3
import http.server, urllib.parse, json, urllib.request, time, os, subprocess, threading

PORT = 9002
CONFIG = '/home/john/.openclaw/workspace/config/google-oauth.json'
TOKEN_FILE = '/home/john/.openclaw/workspace/config/google-oauth-token.json'

with open(CONFIG) as f:
    creds = json.load(f)['web']

client_id = creds['client_id']
client_secret = creds['client_secret']
SCOPE = 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/drive'

params = {
    'access_type': 'offline',
    'client_id': client_id,
    'redirect_uri': 'http://localhost:' + str(PORT),
    'response_type': 'code',
    'scope': SCOPE,
    'prompt': 'consent',
}
auth_url = 'https://accounts.google.com/o/oauth2/v2/auth?' + urllib.parse.urlencode(params)

HTML = (
    '<!DOCTYPE html>\n'
    '<html>\n'
    '<head><title>Gmail OAuth</title></head>\n'
    '<body style="font-family:Arial;max-width:700px;margin:60px auto;padding:20px">\n'
    '<h1>GMail OAuth Setup</h1>\n'
    '<p>Click the button below to authorize:</p>\n'
    '<form action="' + auth_url + '" method="get">\n'
    '  <button type="submit" style="font-size:20px;padding:10px 20px;background:#4285f4;color:white;border:none;border-radius:4px;cursor:pointer">Authorize Gmail Access</button>\n'
    '</form>\n'
    '<p>After clicking, complete the Google login in the same window.</p>\n'
    '<p>The page will show "Authenticated!" when complete.</p>\n'
    '</body>\n'
    '</html>\n'
)

code_received = threading.Event()
code_value = {}

class Handler(http.server.BaseHTTPRequestHandler):
    def log_message(self, *args): pass
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        params = urllib.parse.parse_qs(parsed.query)
        if parsed.path == '/favicon.ico':
            self.send_response(204)
            return
        if 'code' in params:
            code_value['code'] = params['code'][0]
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            self.wfile.write(b'<html><body style="font-family:Arial;text-align:center;margin-top:100px"><h1 style="color:green">Authenticated! Token being generated...</h1><p>You can close this window.</p></body></html>')
            code_received.set()
        else:
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            self.wfile.write(HTML.encode())

server = http.server.HTTPServer(('', PORT), Handler)
t = threading.Thread(target=server.handle_request)
t.start()

print('Landing page: http://localhost:' + str(PORT))
print('Auth URL: ' + auth_url)

env = dict(os.environ)
env['DISPLAY'] = ':10'
chrome = subprocess.Popen(
    ['google-chrome', '--new-window', '--incognito', 'http://localhost:' + str(PORT)],
    env=env,
    stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
)

print('Chrome opened on display :10')
print('Waiting for user to complete login...')

if code_received.wait(timeout=600):
    code = code_value['code']
    print('Got code! Exchanging for tokens...')
    
    data = urllib.parse.urlencode({
        'code': code,
        'client_id': client_id,
        'client_secret': client_secret,
        'redirect_uri': 'http://localhost:' + str(PORT),
        'grant_type': 'authorization_code',
    }).encode()
    
    req = urllib.request.Request('https://oauth2.googleapis.com/token', data=data)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            tokens = json.loads(resp.read())
            print('SUCCESS!')
            print('Expires in:', tokens.get('expires_in'), 'seconds')
            has_refresh = bool(tokens.get('refresh_token'))
            print('Refresh token:', 'YES' if has_refresh else 'NO (might reuse old)')
            
            token_data = {
                'access_token': tokens['access_token'],
                'refresh_token': tokens.get('refresh_token', ''),
                'token_type': tokens.get('token_type', 'Bearer'),
                'expiry_date': (int(time.time()) + tokens.get('expires_in', 3600)) * 1000,
                'scope': SCOPE,
            }
            with open(TOKEN_FILE, 'w') as f:
                json.dump(token_data, f, indent=2)
            print('Token saved to:', TOKEN_FILE)
    except Exception as e:
        print('Error:', e)
else:
    print('Timeout - no redirect received')

chrome.terminate()
server.server_close()
