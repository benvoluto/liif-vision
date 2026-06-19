# LIIF — A Grant Operating System

**Ben Clemens · June 2026**

An ontology-first, agent-led vision for how the Low Income Investment Fund (LIIF)
administers early-childhood-education facilities grants — replacing today's stack of
seven point tools (Submittable, Salesforce, RightSignature, Payoneer, MIP, Concur,
Asana) with one grant ontology and agent-mediated action on top.

Grounded in LIIF's own research: the 60-cell role-by-stage process matrix, the
Submittable payment SOPs, seven stakeholder interviews, the CFO friction-point guide,
and the FY26 ECE monthly report. Institutions, programs, and systems are real; the
three personas are fictional but grounded in LIIF's documented roles and delegation of
authority.

---

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Routes

| Route | Description |
|---|---|
| `/` | Vision document — four accordion sections + persona picker |
| `/grantee/maria-delgado` | Grantee surface — Maria Delgado, Sunrise Family Child Care (CCFF) |
| `/program/tasha-brooks` | Program Officer surface — Tasha Brooks, CCFF |
| `/finance/david-okafor` | Finance / Controller surface — David Okafor |
| `/flows/grant-application` | Flow 1 — Grant Application Concierge (Maria) |
| `/flows/payment-readiness` | Flow 2 — Compliance-complete handoff + monitoring (Tasha) |
| `/flows/payment-release` | Flow 3 — Payment release (David) |

## 90-second click-through

1. Start at `/grantee/maria-delgado`. Click **Explain** on any card — the drawer shows
   why it surfaced, the ontology objects consulted, confidence, and what the agent will
   and won't do. Then **Continue** into the application concierge flow.
2. Go to `/program/tasha-brooks`. Open the **Sunrise FCC is ready for payment** card →
   Flow 2. Tab A is the compliance-complete handoff that ends the duplicate Finance
   review; Tab B is monitoring and the non-compliance cadence.
3. Go to `/finance/david-okafor`. Open **Aged-payment queue** → Flow 3. Step through
   scope → controls reasoning → queue calculation → governed release, and stop on the
   **before & after**: weeks of waiting → same day, with every control intact.

## The four friction points it answers

1. No shared target for compliant disbursement (time-to-payment 3 weeks → months).
2. Fragile Submittable routing (backward moves, erased reviews, mis-routing).
3. Duplicate document review before payment (Program ↔ Finance).
4. Bespoke, rebuilt-per-RFP program design.

## Tech

- Next.js 16 · App Router · TypeScript
- Tailwind CSS v4 · framer-motion · MUI icons
- All data mocked in `/lib/ontology/` — no backend, no model calls.
