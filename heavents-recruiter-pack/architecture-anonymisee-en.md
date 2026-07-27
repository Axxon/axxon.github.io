# Sonomundi Anonymized Architecture

This page summarizes the project architecture. It contains no secret, operating procedure or launch command.

## Overview

Sonomundi is a long-term personal side project built around a Laravel/Vue monorepo to explore a music/event product:

- event discovery;
- event/artist/track navigation;
- multi-role auth;
- public/authenticated/admin surfaces;
- tests and validation of the demo path.

## Main Components

| Layer | Role |
| --- | --- |
| Laravel / PHP | REST API, auth, roles, business resources, jobs |
| Vue 3 / TypeScript | SPA, navigation, events hub, user surfaces |
| MySQL | main application data |
| Redis | cache, queues, local coordination |
| Neo4j | graph/recommendation experimentation |
| Playwright / PHPUnit | back-end, UI and role-based access validations |
| OpenAPI/Scramble | documented API contracts |
| Docker/local k3s | demo environment and local validation |

## Demonstrated Path

1. `/events` hub.
2. Selected region with visible events.
3. Event, artist and track opening.

The public/authenticated/admin surfaces are part of the product scope. The short path prioritizes discovery and event/artist/track navigation to keep a clear reading of the domain.

## AI Workflow

AI was used as a delivery accelerator, not as a replacement for technical responsibility:

- Codex for implementation, analysis and documentation;
- Codex Skills and MCP to support contextualized workflows;
- Paperclip to structure agent lanes;
- LangChain/LangGraph for audits and readiness;
- isolated worktrees to separate workstreams;
- Docker/tests validation;
- pull-request auto-review and validation documentation before the integration decision.

## Presentation Limits

- The project is presented as a Laravel/Vue side project intended for gradual release, with no rushed schedule.
- Development stays outside working hours, can be paused and does not affect full availability to an employer.
- Billing, wallet, settlement, monetization and advanced surfaces remain distinct workstreams.
- Secrets, credentials and operating details are not shared.
- The demonstration is done through screen sharing; the reader does not have to run the project.
