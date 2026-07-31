# Powerhouse Enterprise Copy Standard

This file defines how Powerhouse Enterprise copy should read before it ships.
It adapts controlled-language principles for this specific site. It does not
reproduce ASD-STE100.

## External References

- ASD-STE100 Simplified Technical English: use as a clarity reference for
  technical documentation. The official standard is owned by ASD and should be
  requested from the official source when exact compliance is needed:
  https://www.asd-ste100.org/
- stop-slop: use as an editing lens for AI writing tells, filler, passive
  structure, generic rhythm, and vague claims:
  https://www.skills.sh/hardikpandya/stop-slop/stop-slop

## Source Of Truth

Use `MESSAGE.md` first. This file controls style, not positioning.

The canonical promise is:

> Turn workflows into software you own.

Do not rewrite that sentence unless `MESSAGE.md` changes.

## Audience

Write for operations and technology leaders who own valuable, private,
document-heavy workflows. They need to understand risk, workflow shape,
deployment control, and proof fast.

They do not need:

- AI hype
- industry buffet language
- generic automation promises
- unexplained product names
- unsupported compliance or security claims

## Voice

The voice is quiet, direct, technical, and specific.

It should sound like a senior operator explaining a system boundary to another
senior operator. It should not sound like a SaaS landing-page generator.

## Controlled-Language Rules

1. Use short sentences by default.
   Target 12 to 22 words. Longer sentences need a clear reason.

2. Put the actor near the verb.
   Prefer "Powerhouse maps the workflow" or "We map the workflow" over "The workflow is mapped by BAI."

3. Use one idea per sentence.
   Split a sentence when it mixes problem, value, and proof.

4. Use concrete nouns before abstractions.
   Prefer "contracts, invoices, reports, approvals" before "unstructured data."

5. Use stable terminology.
   Prefer the approved terms in `MESSAGE.md`. Do not invent synonyms for core
   concepts.

6. Explain acronyms on first use.
   Avoid acronyms when a plain noun is clearer.

7. Make pronouns unambiguous.
   If "it", "they", or "this" could refer to more than one thing, name the
   thing.

8. Use active voice for claims and actions.
   Passive voice is allowed only when the actor is unknown or irrelevant.

9. Avoid stacked modifiers.
   Replace "enterprise-grade AI-ready operational transformation layer" with a
   concrete object or action.

10. Qualify claims that depend on customer context.
    Use "can", "designed to", or "depending on workflow sensitivity" when the
    statement depends on deployment, contract, or environment.

## Claim Rules

Every meaningful claim must fit one of these types:

- **Observed**: backed by a cited public source, screenshot, or product artifact.
- **Architectural**: true because of how the product is built.
- **Scoped**: true only in a defined customer environment or engagement.
- **Promise**: the public proposition defined in `MESSAGE.md`.

Do not publish a quantified outcome without attribution.

Approved quantified proof:

- BAI states that 22 business modules are in active production.
- BAI attributes a 65% invoice-review time reduction to Wouter Vonk, CEO of
  Powerhouse.

Claims that need evidence or qualification:

- compliance with named laws or standards
- "secure", "sovereign", "zero trust", or "audit-ready"
- local model deployment in a specific customer environment
- no vendor access to customer data
- guaranteed time savings
- production status outside named examples
- AI Act, GDPR, SOC 2, ISO, HIPAA, FCA, SEC, or other regulatory language

## Approved Terms

Use these terms consistently:

- owned operational software
- private, document-heavy workflows
- structured workflow layer
- AI-ready operational software
- scoped AI assistance
- human approval
- attributable history
- operation history
- portable data and schemas
- private deployment options
- open-source platform
- no rip-and-replace
- workflow assessment
- first workflow

## Terms To Avoid Or Qualify

| Avoid | Use Instead |
| --- | --- |
| AI transformation | first workflow, workflow assessment, owned software |
| magic, effortless, seamless | specific action or result |
| autonomous agents | scoped AI assistance, unless autonomy is specifically true |
| data sovereignty | private deployment options, portable data and schemas |
| AI-compatible | AI-ready, then explain the structure and context that make it ready |
| enterprise-grade | name the real capability |
| unlock, unleash, supercharge | connect, structure, approve, retain |
| all industries | the audience in `MESSAGE.md` |
| end-to-end platform | open-source platform plus BAI delivery path |
| democratize | say who gets what capability |
| future-proof | portable, inspectable, open-source |

## AI Slop Tells

Cut these patterns unless there is a clear reason:

- "In today's fast-paced world"
- "It's not just X, it's Y"
- "Whether you are X, Y, or Z"
- "Imagine a world where"
- "Unlock the power of"
- "Seamlessly integrate"
- "Robust and scalable"
- "Designed to empower"
- "Game-changing"
- "Revolutionize"
- "Take your workflow to the next level"
- vague three-part lists with equal weight
- dramatic one-line fragments
- claims that make software sound like a person

## Section-Level Rules

### Hero

- H1 must use the canonical promise.
- Supporting copy must name the audience, workflow type, and control model.
- Do not use "sandbox" in the main proposition. Reserve it for assessment or
  exploration environments.
- CTA copy must be an action the prospect can actually take.

### Problem

- Name the current places where work lives.
- Explain why AI cannot safely operate without structure, permissions, and
  context.
- Explain the causal chain: disconnected tools create fragments, AI lacks the
  complete process, accuracy suffers, and unsafe workarounds expose data.
- Do not turn the problem into fear marketing.

### How It Works

- Use verbs: connect, structure, add, keep, retain.
- Explain how workflow objects, permissions, approvals, and history create
  operational context for scoped AI agents.
- Explain the workflow before naming platform components.
- Avoid implementation detail unless the page is technical.

### Ownership

- Name practical controls: deployment options, open-source stack, portable
  schemas, model choice, no rip-and-replace.
- Qualify environment-specific claims.

### Proof

- Prefer screenshots, product surfaces, and named production systems.
- Attribute numbers.
- Avoid abstract proof like "trusted by leaders" unless there are names.

### Engagement

- Explain the five-day assessment in concrete deliverables.
- Route the primary action to BAI.
- Do not imply a build commitment before the assessment.

## Before And After Examples

| Sloppy | Better |
| --- | --- |
| Unlock AI transformation across your enterprise. | Map one private workflow and turn it into owned software. |
| Our platform seamlessly integrates with your stack. | Powerhouse connects records, documents, and events beside existing systems. |
| Autonomous agents revolutionize operations. | Scoped AI assistance can extract, compare, draft, and flag within an approved workflow boundary. |
| Enterprise-grade security keeps your data safe. | Sensitive workflows can use private deployment options, depending on the customer environment. |
| We serve finance, legal, manufacturing, and more. | We serve leaders responsible for private, document-heavy workflows. |

## Copy Review Checklist

Before copy ships, answer yes to each question:

- Does the page preserve the canonical promise?
- Does each section speak to one audience?
- Does the copy explain Powerhouse before component names appear?
- Does each sentence have a clear subject and verb?
- Are quantified claims attributed?
- Are regulatory or security claims qualified or removed?
- Are vague AI words replaced with workflow objects and actions?
- Are CTA destinations real?
- Could a busy operations leader understand the page in one scan?
