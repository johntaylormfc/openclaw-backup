# Idea
**ID:** IDEA-0053
**Title:** Personal Second Brain — Semantic Search Across All Your Files and Sessions
**Status:** Pending Review
**Suggested Priority:** High
**Source:** awesome-openclaw-usecases-zh (AlexAnys)
**Created:** 2026-03-25
**Last Updated:** 2026-03-25

## Summary
A semantic search layer over all your files, session transcripts, and project docs — so you can ask "what did we decide about the Plex metadata issue?" and get an answer even if you phrase it completely differently.

## Why It Matters
Right now your memory is scattered across session logs, daily notes, kanban tickets, and project files. Finding something requires knowing exactly what to search for. A RAG-powered second brain would let you search by meaning, not keywords.

## What You'd Need
- Vector embeddings for session files and project docs
- A retrieval layer (Pinecone, Chroma, or local vector DB)
- Skill wrapping the search into conversational queries

## Outcome
- [ ] Evaluate vector DB options (Pinecone vs local)
- [ ] Test on existing session transcripts
- [ ] Build skill for natural language search
- [ ] Integrate with existing memory system

## Approval Decision
Pending Review
