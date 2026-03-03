# BC Container Skill

Create and manage Business Central containers on GSPRO Windows PC.

## Usage

- `Create BC container named <name>` - Create a new BC container
- `Delete BC container <name>` - Remove a container
- `List BC containers` - Show running containers

## Parameters

- **containerName**: Required - Name for the container
- **country**: Optional - Country version (default: w1)
- **memoryLimit**: Optional - Memory limit (default: 6GB)

## Defaults

- **memoryLimit**: 6GB
- **isolation**: hyperv
- **includeAL**: yes
- **auth**: NavUserPassword
- **credential**: john/john

## Examples

- "Create BC container named myapp"
- "Create BC container named testapp with country uk"
