# Design: Superpowers Blog Post

**Date:** 2026-04-28
**Topic:** How to install and use the Superpowers plugin on Claude Code and OpenCode
**Output:** `src/content/blog/superpowers-plugin.mdx`

## Approach

Problem-first (Option A). Opens with the frustration of agents that skip design and go straight to code, introduces Superpowers as the structural fix, then walks through installation and a real session.

Matches the voice of the existing blog (first-person, direct, no fluff, explains the "why" before the "how").

## Structure

1. **Hook** — relatable failure mode: agent writes 300 lines, misses requirements
2. **What Superpowers is** — plugin that installs a 6-phase dev methodology into the agent
3. **Claude Code install** — `/plugin install superpowers@claude-plugins-official`, verify command
4. **OpenCode install** — `opencode.json` config, restart, optional version locking, upgrade path
5. **Real session walkthrough** — brainstorming → design approval → planning → subagent execution → TDD → finishing
6. **Closing** — honest take on the tradeoff (slower first session, better output long-term), link to repo

## Content Sources

- GitHub repo: https://github.com/obra/superpowers
- OpenCode install: https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md
- README for Claude Code install commands and skill descriptions

## Frontmatter

```yaml
title: "Superpowers: The Plugin That Teaches Your AI Agent How to Think"
date: "2026-04-28"
excerpt: "AI agents are great at writing code. They're bad at knowing when not to. Superpowers fixes that by installing a structured development methodology directly into your agent."
tags: ["tooling", "claude", "ai", "productivity"]
published: true
```
