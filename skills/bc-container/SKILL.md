# BC Container Skill

Create and manage Business Central containers on GSPRO Windows PC via SSH.

## Important Notes
- ALWAYS use lowercase username 'john' - uppercase 'JOHN' fails with InvalidPasswordException
- Create a NEW container for each extension to avoid conflicts
- Use incremental ports (18207, 18208, etc.)

## SSH Access
- Host: 192.168.1.228
- User: bot
- Password: BotBotBot!
- Command: `sshpass -p 'BotBotBot!' ssh bot@192.168.1.228 "powershell -File C:/Users/bot/New-BCContainerRemote.ps1 -ContainerName <name> -WebPort <port> -DevPort <devport> -Username john -Password John1234"`

## Parameters

- **containerName**: Required - Name for the container (e.g., glapproval)
- **webPort**: Required - Web port (e.g., 18207 for new extension)
- **devPort**: Required - Dev port (e.g., 19207)
- **username**: Optional - Use 'john' (lowercase!)
- **password**: Optional - default: John1234

## Examples

- "Create BC container named myapp on port 18207"
- "Create BC container named testapp on ports 18208/19208"

## Output

After creating a container, returns:
- **Web URL (recommended):** http://192.168.1.228:<PORT>/BC/?tenant=default
- **Sign-In URL:** http://192.168.1.228:<PORT>/BC/SignIn?tenant=default
- **Dev URL:** http://192.168.1.228:<DEV_PORT>
- **Credentials:** john / John1234
