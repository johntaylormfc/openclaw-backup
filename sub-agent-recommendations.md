# Specialized Sub-Agent Recommendations

Based on analysis of john's setup, workflow, and business needs.

## Identified Areas for Specialized Sub-Agents

### 1. ARR Stack Guardian 🤖
**What it handles**: Proactive monitoring and management of the Docker ARR stack (Sonarr, Radarr, Prowlarr, Plex, qBittorrent, etc.)
**Why separate**: Different focus (media management, download handling) vs general assistance. Needs deep Docker integration andARR API knowledge.
**Skills needed**: Docker management, ARR APIs, health monitoring, auto-remediation
**Priority: HIGH** - Already have ARR_Bot persona, could elevate to sub-agent

### 2. Business Central AL Developer 💼
**What it handles**: Microsoft Dynamics Business Central extension development, AL code generation, Docker-based BC deployment
**Why separate**: Specialized domain (ERP/finance), requires different knowledge base, different interaction patterns
**Skills needed**: AL language, VS Code integration, Docker for BC, API testing
**Priority: HIGH** - Mentioned in memory as "business-central" focus area

### 3. Dashboard Health & Ops Agent 📊
**What it handles**: Dashboard resilience, kanban operations, metrics monitoring, self-healing
**Why separate**: Operational focus vs creative/strategic. Can run autonomous health checks.
**Skills needed**: SQLite ops, API monitoring, cron job management, incident response
**Priority: MEDIUM** - Already partially working

### 4. Home Automation Integrator 🏠
**What it handles**: Home Assistant integration, smart home monitoring, automation debugging
**Why separate**: Different domain entirely, requires HA knowledge, different escalation path
**Skills needed**: Home Assistant API, MQTT, device management, log analysis
**Priority: MEDIUM** - Listed in skill recommendations

### 5. Security & Hardening Specialist 🔐
**What it handles**: Docker security scanning, SSH hardening, vulnerability monitoring, firewall management
**Why separate**: Security is specialized, requires different mindset, regular audits
**Skills needed**: Security tools, firewall config, update management, audit logging
**Priority: MEDIUM** - Already have healthcheck skill

## Recommendations

The most valuable to build right now:
1. **ARR Guardian** - Formalize ARR_Bot as a sub-agent with enhanced capabilities
2. **BC Developer** - New agent for Business Central work

These align with John's known interests and would provide clear value.
