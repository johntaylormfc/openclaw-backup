#!/usr/bin/env python3
"""Capture OAuth redirect on port 8888 and poll Chrome DevTools."""
import urllib.request, json, time, http.server, threading, urllib.parse, urllib.error, sys

PORT = 8888

class Handler(http.server.BaseHTTPRequestHandler):
    def log_message(self, *args): pass
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        params = urllib.parse.parse_qs(parsed.query)
        if 'code' in params:
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            self.wfile.write(b'<html><body><h1>Auth complete - close window</h1></body></html>')
            code_value['code'] = params['code'][0]
            code_received.set()
        else:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b'No code')

code_received = threading.Event()
code_value = {}

server = http.server.HTTPServer(('', PORT), Handler)
t = threading.Thread(target=server.handle_request)
t.start()
print(f'HTTP server listening on port {PORT}')

auth_url = (
    'https://accounts.google.com/o/oauth2/v2/auth'
    '?access_type=offline'
    '&client_id=784690914094-70uo4kt0p0tddmqa3rirc9oscditseou.apps.googleusercontent.com'
    '&redirect_uri=http%3A%2F%2Flocalhost%3A' + str(PORT)
    '&response_type=code'
    '&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.readonly'
    '&prompt=consent'
)
print('Auth URL ready')

# Wait for redirect or timeout
if code_received.wait(timeout=300):
    code = code_value['code']
    print(f'Got code: {code[:30]}...')
    print('Exchanging for tokens...')
    
    # Exchange code for tokens
    data = urllib.parse.urlencode({
        'code': code,
        'client_id': '784690914094-70uo4kt0p0tddmqa3rirc9oscditseou.apps.googleusercontent.com',
        'client_secret': json.load(open('/home/john/.openclaw/workspace/config/google-oauth.json'))['web']['client_secret'],
        'redirect_uri': f'http://localhost:{PORT}',
        'grant_type': 'authorization_code',
    }).encode()
    
    req = urllib.request.Request('https://oauth2.googleapis.com/token', data=data)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            tokens = json.loads(resp.read())
            print('SUCCESS!')
            
            # Save token
            import time as t_
            token_data = {
                'access_token': tokens['access_token'],
                'refresh_token': tokens.get('refresh_token', ''),
                'token_type': tokens.get('token_type', 'Bearer'),
                'expiry_date': (int(t_.time()) + tokens.get('expires_in', 3600)) * 1000,
                'scope': 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/drive',
            }
            with open('/home/john/.openclaw/workspace/config/google-oauth-token.json', 'w') as f:
                json.dump(token_data, f, indent=2)
            print('Token saved!')
    except Exception as e:
        print('Error:', e)
else:
    print('Timeout - no redirect received')

server.server_close()
