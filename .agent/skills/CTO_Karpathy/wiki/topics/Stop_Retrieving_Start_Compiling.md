# Stop Retrieving, Start Compiling

> **Summary**: The philosophical shift in AI knowledge systems from just-in-time document retrieval (RAG) to ahead-of-time, incremental compilation of information into a structured, persistent knowledge graph.

---

## 1. Contrast: Traditional RAG vs. Compilation (LLM Wiki)

| Dimension | Traditional RAG (Retrieving) | LLM Wiki (Compiling) |
| :--- | :--- | :--- |
| **Execution Timing** | At query time (when a question is asked) | At ingestion time (when a source is read) |
| **Knowledge Artifact** | Ephemeral, flat chunks of raw text | Structured, interconnected Markdown pages |
| **Context Assembly** | Re-derives synthesis from scratch every query | Benefits from an evolving, pre-linked graph |
| **Contradiction Handling**| Struggles with cross-document conflicts | Flags contradictions and updates stale claims explicitly |
| **Knowledge Compounding**| Zero compounding; queries vanish in chat logs | High compounding; good query answers get filed back into the wiki |
| **Human Role** | Tries to engineer keywords to retrieve chunks | Curation of raw sources, inquiry, and critical thinking |

---

## 2. The Compounding Artifact
- In typical RAG setups, documents remain dead, passive text until queried.
- Under the compilation model:
  1. A source document is processed once by the LLM agent.
  2. The agent propagates new findings across the entire knowledge base—touching 10 to 15 existing concept, topic, or entity pages in a single pass.
  3. Over time, the knowledge base compounds in density and intelligence. Asking a nuanced question against a compiled wiki yields immediate, deep synthesis because the thematic connections have already been established.

---

## 3. The Memex Realized
- Vannevar Bush envisioned the **Memex** (1945) as a personal, curated desk with associative trails between documents, where the associative trails themselves are as valuable as the raw texts.
- Bush could not resolve the bottleneck of human maintenance. LLMs solve this exact bottleneck: they do not tire, never forget to update cross-references, and perform the continuous bookkeeping that humans inevitably abandon.

---

## 4. Connections & Context
- [[LLM_Wiki]] - The practical implementation pattern.
- [[LLM_OS]] - The storage architecture for autonomous reasoning agents.
- [[Andrej_Karpathy]] - Author and proponent.

---

## Sources & References
- [[../sources/20260918_karpathy_llm_wiki|20260918_karpathy_llm_wiki.md (GitHub Gist)]]
