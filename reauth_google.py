#!/usr/bin/env python3
"""Google OAuth2 re-authentication script"""

import json
import os
from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.metadata.readonly',
]

def main():
    # Load client config
    with open(os.path.expanduser('~/.openclaw/workspace/config/google-oauth.json')) as f:
        client_config = json.load(f)
    
    # Run OAuth flow
    flow = InstalledAppFlow.from_client_config(
        client_config,
        scopes=SCOPES
    )
    
    print("Opening browser for authentication...")
    credentials = flow.run_local_server(port=9876, prompt='consent')
    
    # Save token
    token_path = os.path.expanduser('~/.openclaw/workspace/config/google-oauth-token.json')
    with open(token_path, 'w') as f:
        json.dump({
            'token': credentials.token,
            'refresh_token': credentials.refresh_token,
            'token_uri': credentials.token_uri,
            'client_id': credentials.client_id,
            'client_secret': credentials.client_secret,
            'scopes': credentials.scopes,
            'expiry': str(credentials.expiry) if credentials.expiry else None
        }, f, indent=2)
    
    print(f"✅ Token saved to {token_path}")
    print("Google OAuth re-authentication complete!")

if __name__ == '__main__':
    main()
