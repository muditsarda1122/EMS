---
title: "Everything till now"
date: "2026-07-29"
excerpt: "This article documents the thinking that has shaped EMS. It is a research log—a record of the questions, assumptions, experiments, failures, and redesigns that have gradually transformed a simple engineering idea into an open research problem."
---

# 1. Introduction — Why this project exists

This article exists for one reason: to document the thinking that has shaped EMS.

It is not a product announcement, a technical specification, or a marketing document. Instead, it is a research log—a record of the questions, assumptions, experiments, failures, and redesigns that have gradually transformed a simple engineering idea into an open research problem.

When this project began, the objective was surprisingly practical. The goal was to make AI coding sessions continuous. Like many engineers working with modern coding agents, I found myself repeatedly rebuilding context every time a session ended. Architectural decisions, debugging discoveries, implementation trade-offs, and ongoing reasoning disappeared with the conversation, forcing the next session to start almost from scratch. EMS was originally conceived as an attempt to preserve that context.

As the project evolved, however, the implementation became less interesting than the questions it exposed.

Every attempt to design a better memory system eventually arrived at the same uncertainty: **what exactly should be remembered?** Before discussing storage, retrieval, ranking, or search, it became necessary to understand the nature of the knowledge itself. That question fundamentally changed the direction of the project. EMS gradually shifted away from being a software product focused on persistent memory and towards a research effort centred on what we now call **Engineering Cognition**.

This article documents that journey.

Rather than presenting a polished success story, it presents the reasoning that led from one idea to the next. Wherever possible, design decisions are explained alongside the assumptions that motivated them, the experiments that validated or challenged them, and the lessons that forced us to rethink our approach.

Whether the ideas described here ultimately prove correct or not, we believe documenting the path itself is valuable. Research is rarely a straight line, and understanding *why* certain decisions were made is often as important as the decisions themselves.

# 2. The First Problem We Were Trying to Solve

Like many software engineers today, I had gradually shifted from writing code alongside AI to building software *through* AI. OpenCode had become my primary development environment, and it was no longer unusual for an agent to implement features, refactor modules, investigate bugs, or reason through unfamiliar parts of a codebase with very little intervention from me.

Over time, however, one pattern became impossible to ignore: every new coding session felt like starting over.

The original motivation for EMS was not born from an abstract research question. It came from an incredibly practical frustration that surfaced almost every day while working on real software projects.

Most software development is not completed inside a single uninterrupted conversation.

A typical project consists of a main branch that represents the production-ready state of the software, alongside multiple feature or bug-fix branches that evolve independently before eventually being merged back. Individual features are rarely implemented in one large change. Instead, they grow through dozens of small commits, experiments, refactorings, failed ideas, debugging sessions, and architectural discussions.

This is simply how software engineering works.

Humans naturally carry this continuity forward. An engineer remembers why a particular abstraction was introduced two weeks ago. They remember why one implementation was abandoned in favour of another. They remember subtle debugging discoveries that never made it into documentation but continue to influence future decisions.

AI coding agents did not.

A session could last several hours, during which the agent would gradually develop an increasingly accurate understanding of the repository. It would discover architectural conventions, implementation patterns, debugging observations, and repository-specific assumptions. As the conversation progressed, the quality of its reasoning noticeably improved because it had accumulated context.

The moment the session ended, however, that understanding disappeared.

The next session began with a blank slate.

The repository still contained the code, but the reasoning that had produced the code was gone. Architectural intuition, debugging discoveries, implementation trade-offs, and ongoing engineering decisions all vanished with the conversation itself.

This became especially painful whenever work had to pause midway through a feature. Returning the next day often meant spending a significant amount of time reconstructing context that had already existed only hours earlier. The problem became even more obvious whenever multiple parallel branches were active, each representing a different stream of engineering work with its own evolving understanding.

At the time, the problem seemed obvious.

If the engineering understanding developed during one session could somehow persist into the next, AI coding agents would no longer have to repeatedly reconstruct the same reasoning.

At the time, we believed **memory was the missing piece.**

# 3. The First Version of EMS

Once we had framed the problem as **Engineering Continuity**, the next question became practical: *where should that continuity live?*

At the time, our assumption was simple. If engineering understanding disappears when a session ends, then the system needs a place to store it.

## 3.1 Repository Memory

The first major design decision was that EMS would store memory **inside the repository itself** rather than in a global database.

This was a deliberate choice. Engineering understanding is rarely universal. The architectural constraints of one project may be irrelevant to another, and implementation decisions that make sense in one codebase can be actively harmful when applied elsewhere. By keeping memory local to the repository, we could guarantee that every retrieved artifact belonged to the project the developer was currently working on.

This also aligned with how modern software teams operate. A repository already contains the source code, the commit history, the configuration, and the documentation. EMS extended that idea by treating engineering understanding as another repository-level asset that should travel with the code.

The system was intentionally local-first. All memory artifacts were stored on the developer’s machine, and EMS was designed to work with whichever coding agent the developer chose to use. Because we were using OpenCode heavily at the time, the initial integration targeted OpenCode, but the underlying design was intended to be agent-agnostic.

## 3.2 Memory Hierarchy

The first version of EMS organised memory into four layers:

```text
.repo-memory/
├── canonical/
├── historical/
├── proposals/
└── sessions/
```

**Canonical memory** contained developer-approved knowledge that had been promoted to persistent memory.

**Historical memory** stored summaries generated from the repository’s Git history, allowing the agent to understand why the codebase had evolved the way it had.

**Proposal memory** acted as a staging area for newly extracted knowledge that had not yet been reviewed by the developer.

**Session memory** contained the active and past session state, including working memory and contextual artifacts associated with a specific engineering task.

This hierarchy reflected an important principle: **the developer remained the highest authority**. EMS was allowed to propose knowledge, but it was not allowed to silently make that knowledge permanent.

## 3.3 Bootstrapping a Repository

The first time EMS was used on a repository, the developer would run:

```bash
/project-init
```

This command created the EMS directory structure and then performed an initial scan of the entire codebase. During this scan, the system looked for signals such as architectural patterns, implementation conventions, workflow assumptions, recurring abstractions, and explicit engineering decisions.

Rather than immediately storing these observations as truth, EMS converted them into **bootstrap proposals** and placed them in the proposal layer. The idea was that a repository often contains a large amount of implicit knowledge, and the system should surface that knowledge for review rather than assuming it had interpreted the code correctly.

After bootstrapping, the developer could optionally run:

```bash
/build-history
```

This command walked through the commit history of the repository and generated short summaries of significant commits. We considered this one of the most valuable artifacts in the entire system because it gave the agent access not only to *what* the repository looked like, but *how it had become that way*.

The command was intentionally optional. Large repositories may contain thousands of commits, and asking an LLM to analyse every meaningful diff can become expensive very quickly. In practice, we expected this command to be run primarily on the main branch, where the authoritative history of the project lived.

Once the bootstrap scan was complete, the developer would review the generated proposals and promote the ones that represented reusable understanding.

## 3.4 Promoting Knowledge

Once the repository had been bootstrapped, the next step was to review the generated proposals:

```bash
/promote
```

This command presented every proposal that EMS had extracted but not yet accepted as persistent engineering knowledge. Each proposal included the extracted conclusion, the evidence that had led to it, and a confidence score indicating how strongly the system believed the conclusion was supported by the repository.

The review process was intentionally manual. While EMS could identify recurring architectural patterns, implementation conventions and engineering decisions, we did not believe a language model should be allowed to permanently modify the repository's knowledge without human oversight. Developers could therefore accept, reject or postpone individual proposals.

Accepted proposals were moved into **Canonical Memory**, where they became available for future retrieval. During promotion, EMS also generated repository-specific tags for each accepted artifact, allowing later retrieval to rely on semantic intent rather than simple keyword matching. Rejected proposals were discarded, while postponed proposals remained available for future review.

Although the review step introduced additional friction, we considered it essential. The objective was never to accumulate the largest possible collection of memory artifacts, but to gradually build a high-quality body of engineering understanding that the developer trusted enough to reuse in future sessions.

## 3.5 Sessions and Continuity

A new engineering task began with:

```bash
/open
```

This command could either create a new session or resume an existing one. Resuming was one of the original goals of EMS: the ability to stop working, return later, and continue from roughly the same level of understanding.

EMS also supported multiple concurrent sessions. A developer could pause work on one feature, switch to another branch, complete a different task, and later return to the original session without losing its context.

When a session was opened, EMS generated a **bootstrap context** containing the most relevant information for that task. The goal was not to provide exhaustive repository knowledge, but to ensure that the very first prompt in the new session started with *some* relevant understanding rather than none.

## 3.6 Working Memory

The most interesting component of the first EMS architecture was **Working Memory**.

Working Memory was not a chat transcript. It was not a collection of copied LLM responses, meeting notes, or conversation summaries. Instead, it attempted to continuously capture the *understanding being generated during the session while that understanding was still fresh*.

As the agent debugged issues, explored files, discovered constraints, or reasoned about architectural trade-offs, EMS would update the session’s working memory with concise conclusions. The emphasis was always on **what had been learned**, not on what had been said.

This distinction became extremely important later in the project because it was our first attempt to separate **information** from **understanding**.

## 3.7 Retrieval

When the developer wanted to retrieve relevant memory, they would run:

```bash
/context <prompt>
```

Retrieval was **intent-driven**. EMS analysed the developer’s prompt and extracted primary and secondary intents, probable repository areas, and related engineering concepts. Those concepts were then expanded into a larger set of candidate tags.

Every artifact stored in EMS carried LLM-generated tags, so retrieval became a process of matching the expanded intent against the indexed memory artifacts. EMS searched across canonical memory, historical memory, and the current session’s working memory.

Artifacts were ranked using a weighted scoring system that considered concept matches, repository-area matches, layer priority, recency, and working-memory relevance. We also introduced layer budgets so that more recent sources, such as the active session, would generally receive a larger share of the available context window than older historical artifacts.

The final result was a bounded context package that could be injected into the coding agent before it began reasoning about the developer’s request.

## 3.8 Closing a Session

Once work was complete, the developer would run:

```bash
/close
```

This command examined the changed files, code diffs, commits, and the session’s working memory to generate new proposals. EMS looked for implementation signals, workflow signals, pattern signals, architectural signals, and explicit engineering decisions. Each proposal was assigned a confidence score based on the evidence available in the session.

The developer could then review those proposals and decide which ones should become part of the repository’s persistent memory. High recall was encouraged during extraction, while precision was enforced during promotion.

On paper, EMS solved **Engineering Continuity**.

# 4. The Question That Changed Everything

For some time, EMS evolved exactly as we had intended.

The repository accumulated memory over time. Sessions could be resumed. Historical commits became searchable. Context retrieval steadily improved as more knowledge was promoted into persistent memory. From an engineering perspective, the system behaved remarkably well. Every new feature addressed a practical limitation that we had encountered while working with AI coding agents, and every iteration appeared to move us closer to our original goal of engineering continuity.

Then an uncomfortable realization emerged.

The system had become increasingly good at **storing information**, but we had never stopped to ask whether the information being stored was actually the right thing.

Every proposal generated by EMS represented something the language model believed was worth remembering. Every promoted memory became part of the repository's growing knowledge base. Every retrieval operation assumed that the stored artefacts represented reusable engineering understanding.

That assumption had never been questioned.

We had invested considerable effort into designing memory hierarchies, retrieval pipelines, proposal generation, ranking algorithms, and developer review workflows. Yet every one of those components silently relied on a much more fundamental premise: that we already knew what engineering memory looked like.

In reality, we did not.

Was an implementation detail a memory?

Was a debugging observation a memory?

Was an architectural decision a memory?

Was a design principle a memory?

Or were these fundamentally different kinds of engineering knowledge that merely happened to be stored in the same system?

The more we discussed these questions, the more obvious it became that memory itself was probably not the research problem. Storage, indexing, retrieval, and ranking were all downstream engineering problems. Before solving any of them, we first needed to understand the thing they were supposed to operate on.

The question gradually changed from *"How do we build a better memory system?"* to something far more fundamental:

**What actually deserves to become memory?**

That single question completely changed the direction of the project.

From that point onwards, EMS stopped being primarily a product designed to preserve engineering continuity. It became a research project aimed at understanding the nature of engineering knowledge itself. Every subsequent experiment, benchmark, and redesign was driven by that question, rather than by the goal of simply storing more information.

# 5. EC-Bench

## Why EC-Bench existed

Once the first version of EMS was complete, we faced a question: **did any of it actually improve software engineering, or did it simply feel useful because we had built it?**

Until this point, every design decision had been driven by intuition. Repository memory, session continuity, historical knowledge and retrieval all appeared valuable during day-to-day use, but none of that constituted evidence. If EMS was going to become more than an interesting engineering project, we needed a way to measure whether accumulated engineering understanding genuinely changed the quality of software engineering.

Existing software engineering benchmarks could not answer that question.

Benchmarks such as SWE-bench and HumanEval measure whether a model can solve programming tasks from a clean starting point. Our hypothesis was fundamentally different. We were interested in whether **the same model becomes a better engineer after accumulating understanding over time.**

To answer that question, we built **EC-Bench**.

---

## What EC-Bench measures

Rather than evaluating isolated coding tasks, EC-Bench evaluates an engineering workflow.

A language model is asked to explore an unfamiliar repository, understand its architecture, implement features, debug issues, explain design decisions and plan future work. The benchmark is then executed twice using exactly the same repository, prompts and evaluation procedure.

The only difference between the two runs is whether repository-specific engineering understanding retrieved from EMS is available.

For the first experiment we evaluated two frontier reasoning models:

- Kimi K2.5
- GLM-5.2

Responses(came from OpenCode using Kimi K2.5) from both baseline and EMS-assisted runs were evaluated by an independent judge agent(which used GLM-5.2) using several engineering-focused metrics, including architectural continuity, repository groundedness, engineering quality, debugging effectiveness and engineering cognition reuse.

The benchmark repository, prompts, judge and scoring methodology were all designed specifically to isolate the impact of accumulated engineering understanding.

---

## First Results

The first experiment produced encouraging results.

Across thirty engineering tasks, EMS improved the overall engineering score on twenty-two prompts, increasing the average score from **7.96** to **8.35**.

Interestingly, the improvements were not concentrated around code generation. Both Kimi and GLM demonstrated their largest gains during architectural reasoning, planning and repository understanding. When previous engineering understanding was available, the models spent less time reconstructing context and produced more coherent long-horizon decisions.

The benchmark also revealed weaknesses.

During several debugging tasks, previously retrieved memories occasionally biased the model towards earlier assumptions instead of encouraging fresh investigation. In those situations, engineering memory reduced rather than improved performance. Although disappointing initially, these regressions became some of the most valuable findings from the experiment because they exposed limitations in our underlying assumptions rather than in the implementation itself.

---

## What we learned

EC-Bench successfully validated our original assumption: accumulated engineering understanding can improve long-horizon software engineering.

However, it also exposed a much deeper problem.

Throughout the project we had invested significant effort into storing, retrieving and ranking engineering memory, yet we had never rigorously defined **what engineering memory actually was.** Every retrieved artefact was implicitly treated as reusable understanding, but the benchmark demonstrated that this assumption was not always correct.

The bottleneck was no longer retrieval. The bottleneck had become the knowledge itself.

That realization fundamentally changed the direction of EMS. From this point onwards, the project shifted away from building better memory systems and towards answering a much more fundamental research question: **What constitutes Engineering Cognition?**

# 6. What EMS Became

The first version of EMS was built to solve a practical engineering problem.

The current version exists to answer a research question.

That transition did not happen because the original implementation failed. Quite the opposite—the implementation worked well enough to expose a deeper problem that we had never intended to study. Every iteration of EMS improved repository continuity, session resumption, proposal generation and retrieval. From a product perspective, the project was progressing exactly as planned.

What changed was our understanding of *why* it worked.

Every feature inside EMS ultimately depended on a hidden assumption: that we already knew what engineering knowledge looked like. The retrieval pipeline assumed that proposals represented reusable understanding. The promotion workflow assumed that a developer could recognise valuable engineering knowledge when reviewing it. The benchmark assumed that accumulated understanding could be measured. None of these assumptions had been rigorously defined.

Once we recognised that, the priorities of the project naturally reversed.

Instead of asking how to build a better memory system, we began asking how engineering understanding itself should be represented. Questions around storage, retrieval and ranking became secondary because they could only be answered after understanding the object they were operating on.

This fundamentally changed the role of EMS.

Today, EMS is no longer primarily a memory system, nor is it simply an assistant for AI coding agents. It has become an experimental platform that allows us to formulate hypotheses, design experiments and validate ideas about Engineering Cognition. Features are no longer added because they improve the product; they are added because they help answer a research question.

In that sense, EMS has become an instrument for studying engineering understanding itself.

The software still matters, but its purpose has changed.

The product now exists to support the research.

It no longer defines it.

# 7. The Questions We Are Researching Today

When EMS first began, success seemed relatively easy to define. If coding sessions could be resumed with the same level of context, if engineering decisions no longer had to be repeatedly explained, and if AI agents could preserve useful understanding between interactions, then the project would have achieved its objective.

Today, none of those outcomes are sufficient.

The project has reached a stage where the most valuable work is no longer writing software but asking better questions. Every improvement to the implementation now serves as a way of testing an idea rather than shipping a feature. In many ways, EMS has become a vehicle for exploring a collection of open research problems that, to our knowledge, remain largely unanswered.

The most fundamental of these questions is the one that changed the direction of the project entirely:

**What constitutes Engineering Cognition?**

If engineering understanding truly exists as something distinct from prompts, conversations and documentation, then it should be possible to describe it rigorously. It should have identifiable properties, clear boundaries and a representation that remains meaningful even after the interaction that produced it has disappeared.

Once that question is answered, a number of equally interesting questions naturally follow.

Can Engineering Cognition be extracted reliably from the outputs of language models, or is too much of it implicit to ever become an explicit computational object?

Can Engineering Cognition be benchmarked independently of the systems that generate it? In other words, is it possible to evaluate the quality of accumulated engineering understanding rather than simply evaluating the quality of code?

Does accumulated cognition genuinely improve long-horizon software engineering, or are the improvements we observed in EC-Bench specific to our experimental design?

If Engineering Cognition is tied to repositories today, could it eventually transfer across repositories that share architectural similarities? More ambitiously, could it transfer between engineers working on the same system, allowing teams to accumulate understanding collectively rather than individually?

Finally, if Engineering Cognition represents understanding rather than model-specific reasoning, should it remain useful even as the underlying language models improve? In an ideal world, changing from one frontier model to another would not reset years of accumulated engineering knowledge.

We do not yet have definitive answers to any of these questions.

At the moment, they define the research agenda. Every redesign of EMS, every experiment we run, and every benchmark we build exists to make those questions slightly less uncertain than they were before.

# 8. Where We Think This Leads

It is difficult to predict what software engineering will look like ten years from now, but one trend already feels difficult to ignore. AI agents are becoming increasingly capable, and engineers are gradually shifting from writing every line of code themselves to collaborating with systems that can reason, implement and debug alongside them.

If that trend continues, then code generation is unlikely to remain the defining challenge.

Understanding will.

Human engineers become better over time because every project leaves behind something that survives beyond the task itself. They begin to recognise familiar architectural patterns, anticipate failure modes, develop intuitions about systems they have worked on before, and make decisions that are informed by years of accumulated experience rather than only the problem immediately in front of them. That accumulated understanding is one of the reasons experienced engineers consistently outperform newcomers, even when both have access to the same codebase.

Today's AI agents do not work that way.

Each interaction begins with remarkable reasoning ability, but very little accumulated understanding. They can solve difficult problems, yet much of the engineering intuition developed during one session disappears before the next begins.

Our long-term vision is built around the idea that this should not always be true.

We imagine a future in which engineering understanding becomes a persistent asset that grows alongside the software itself. Every completed feature, every debugging session, every architectural discussion and every engineering decision contributes to a body of cognition that future engineers—and future AI agents—can build upon rather than repeatedly reconstruct.

If that vision is correct, then Engineering Cognition becomes more than a memory system. It becomes part of the software development process itself: a continuously evolving layer of shared understanding that allows both humans and AI systems to become better engineers simply by continuing to work together.

Whether that future is achievable remains an open question.

That is the question we hope to spend the next several years answering.