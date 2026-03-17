# BC Container Skill

Create and manage Business Central containers on GSPRO Windows PC via SSH.

## Important Notes
- ALWAYS use lowercase username 'john' - uppercase 'JOHN' fails with InvalidPasswordException
- Create a NEW container for each extension to avoid conflicts
- Use incremental ports (18207, 18208, etc.)
- ALWAYS expose Developer Services and OData ports - script handles this automatically
- For VS Code launch.json, use the DEV SERVICES port (not web port)

## SSH Access
- Host: 192.168.1.228
- User: bot
- Password: BotBotBot!
- Command: `sshpass -p 'BotBotBot!' ssh bot@192.168.1.228 "powershell -File C:/Users/bot/New-BCContainerRemote.ps1 -ContainerName <name> -WebPort <port> -DevPort <devport> -ODataPort <odataport> -Username john -Password John1234"`

## Parameters

- **containerName**: Required - Name for the container (e.g., glapproval)
- **webPort**: Required - Web port (e.g., 18207 for new extension)
- **devPort**: Required - Dev services port (e.g., 19207) - USE THIS IN launch.json
- **oDataPort**: Required - OData services port (e.g., 19208)
- **username**: Optional - Use 'john' (lowercase!)
- **password**: Optional - default: John1234

## Examples

- "Create BC container named myapp on port 18207"
- "Create BC container named testapp on ports 18208/19208/19209"

## VS Code launch.json

When creating launch.json for the container, ALWAYS use the DEV SERVICES port (e.g., 19206):
```json
{
    "server": "http://192.168.1.228",
    "port": 19206,
    "authentication": "UserPassword"
}
```

## Output

After creating a container, returns:
- **Web URL (recommended):** http://192.168.1.228:<PORT>/BC/?tenant=default
- **Dev Services URL:** http://192.168.1.228:<DEV_PORT>
- **OData Services URL:** http://192.168.1.228:<ODATA_PORT>/BC/OData
- **Credentials:** john / John1234
