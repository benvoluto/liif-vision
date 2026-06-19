"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import ReportProblemOutlined from "@mui/icons-material/ReportProblemOutlined";
import RouteOutlined from "@mui/icons-material/RouteOutlined";
import Click from "@mui/icons-material/AdsClickOutlined";
import { cn } from "@/lib/utils";

const sections = [
  {
    id: "broken",
    title: "The Big Opportunity",
    Icon: ReportProblemOutlined,
    color: "#E26A2C",
    body: `LIIF administers roughly <span class="tip" tabindex="0" data-tip="From the FY26 ECE monthly report: 22 active funding sources, $478M in total active value, spanning CCFF (San Francisco), SHINE (Harris County), Alameda, Sonoma, CDSS and more.">$478M in active early-childhood-education funding</span> across a dozen-plus programs. The mission is sound and the demand is real. LIIF's single biggest lever on how many children are served is operational: <strong>fast, compliant, risk-free operations</strong>. Today, grant administration runs on a stack of <span class="tip" tabindex="0" data-tip="Submittable (intake & review routing), Salesforce (records & compliance), RightSignature (e-signature), Payoneer (disbursement), MIP/Sage (fund accounting), Concur (legacy invoicing), Asana (pipeline).">seven point tools</span> — Submittable, Salesforce, RightSignature, Payoneer, MIP, Concur, Asana — stitched together by people re-keying between them.

None of those tools share consistent definitions of a grant program, an eligible provider, strong internal disbursement controls, or a compliant, on-time payment. The real operating knowledge — eligibility rules, program designs, signing thresholds, the reminder cadence — lives in PowerPoints, how-to guides, emails, and people's heads, and gets <span class="tip" tabindex="0" data-tip="Staff report there is no single upfront checklist of 'what a LIIF grant requires,' so program setup is built from scratch per RFP.">rebuilt from scratch every RFP</span>.

The research surfaced <strong>four friction points</strong>, validated across the role-by-stage process matrix, the payment SOPs, and the stakeholder interviews:
<ol>
<li><strong>No shared disbursement target.</strong> &ldquo;Good, compliant disbursement&rdquo; is undefined; timelines vary widely and no one owns the clock.</li>
<li><strong>Fragile routing.</strong> Submittable can move a submission backward and erase reviews; <span class="tip" tabindex="0" data-tip="A real reported incident: a payment request was mis-routed to the CFO in error and stalled for months before anyone noticed.">a payment once mis-routed to the CFO and stalled for months</span>.</li>
<li><strong>Duplicate review.</strong> Finance re-checks the same documents the program team already vetted before a payment can move.</li>
<li><strong>Bespoke programs.</strong> Single vs. tranche, advances, channel, who signs — all vary per program, so tooling and timelines differ each time.</li>
</ol>

The cost shows up in the numbers: about <span class="tip" tabindex="0" data-tip="FY26 ECE monthly report: $30.5M deployed against a $94.4M target — an aggressive internal goal.">$30.5M of a $94.4M FY26 deployment target</span> is out the door — an aggressive goal, with LIIF carrying much of the risk if audited — while a payment today is a <em>one-to-two-month process</em> with no shared target and no owner. With demand and awards in place, the binding constraint on dollars reaching children is fast, compliant disbursement.`,
  },
  {
    id: "strategy",
    title: "A New Strategy",
    Icon: RouteOutlined,
    color: "#1F9E8F",
    body: `Replace the point-tool stack and ad-hoc process with one thing: an <span class="tip" tabindex="0" data-tip="The same LLM-assisted approach that captures LIIF's rules at setup powers the agent that reasons against them at runtime — so the platform is self-configuring and self-adjusting instead of re-integrated by vendors each time.">agentic grant platform</span>, where processes are mediated and collaboratively adjusted by agents and humans. A typed, linked graph — Funder → Program → Application → Provider → Agreement → Award → Payment Request → Disbursement → Compliance Item → Report — becomes the system of record. Every surface and every workflow is a <em>view</em> over that one graph, not a separate module with its own model. Rather than a cycle of configuration and integration with costly vendors that breaks or gets outgrown, the platform is self-configuring and self-adjusting.

The product is a <span class="tip" tabindex="0" data-tip="The grantee surface generates the volume and trust-calibration signal; the staff surface provides governance and legitimacy. Both compound off the same graph, so each object added for Finance makes the grantee surface smarter and vice versa.">dual surface</span> on top of that graph: a <strong>grantee surface</strong> — a concierge that gets providers to compliant applications and paid faster — and a <strong>staff surface</strong> for program officers and finance, with governance, controls, and audit built in.

Both surfaces share a new interaction pattern, a design system of <span class="tip" tabindex="0" data-tip="Explain, Show Sources, Scope, Dry-run, Audit, Undo — the reusable pattern that makes agent actions reviewable, previewable, reversible, and defensible to a funder or an auditor. Build it once, reuse everywhere.">"trust scaffolding"</span> — Explain, Sources, Scope, Dry-run, Audit, Undo — that makes agent actions safe to ship. Crucially, it <strong>preserves finance and accounting controls</strong>: segregation of duties, two-tier release, audit-readiness.

<strong>The catch is significant.</strong> Getting here requires a period of human collaboration with agents to train their understanding of LIIF's needs and each funder's. Until the agents prove their processes and suggested actions are compliant and trusted, <strong>they take no actions on their own</strong> — only when their suggestions are approved at a high enough rate are they empowered to operate semi-autonomously. Agents earn their authority on low-stakes grantee tasks long before they touch a disbursement.

<strong>Where to invest</strong><br />
• The grant ontology as the new system of record — absorbing what Submittable, Salesforce, and MIP hold today.<br />• The trust-scaffolding design system as a first-class, reusable surface.<br />• The grantee surface as the low-stakes training ground where agents earn authority.

<strong>Where to say no</strong><br />
• No chat-first UI — agent <em>suggestions</em>, not a chatbot.<br />• No agent-executed disbursement without human two-tier approval.<br />• No removing a control to move faster.<br />• No more bespoke, rebuilt-per-RFP programs.

<strong>Sequencing</strong>
<ol>
<li><strong>Months 0–6:</strong> Ontology + trust primitives; instrument time-to-payment with an owner.</li>
<li><strong>Months 6–12:</strong> Grantee concierge — application assembly, payee, reminders.</li>
<li><strong>Months 9–18:</strong> Program-officer surface — the compliance-complete handoff and monitoring.</li>
<li><strong>Months 12–24:</strong> Governed finance release (two-tier, segregation of duties) — only after the handoff has proven itself.</li>
</ol>

<strong>The strategy in a nutshell</strong><br />
Instead of stitching seven tools together by hand and rebuilding each program from scratch, <strong>the agent learns LIIF's rules and goals once, then proposes compliant applications, packages, and releases against them</strong> — so money reaches providers faster without giving up a single control.`,
  },
  {
    id: "life",
    title: "Designs & Flows",
    Icon: Click,
    color: "#2E5BFF",
    body: `I built three surfaces and three flows (below, click to enter), grounded in CCFF and a real, recurring failure mode: a payment that stalls for a month or more because of routing fragility and duplicate review.

<strong>The flows show the experience from all three sides of a grant</strong> — the grantee getting to a compliant application and getting paid, the program officer handing Finance a package it can rely on, and Finance clearing an aged-payment queue with every control intact. The third flow is the money disbursement: it fixes the exact stall the research surfaced, and ends on a before-and-after that any CFO would recognize.

Each set is one static flow, not a working backend — there are no live data or model calls. The <strong>Explain</strong> buttons open a drawer showing the agent's reasoning and the ontology objects it consulted; <strong>Show sources</strong> lists the specific records and policies behind each card. The designs deliberately favor real-world process accuracy over visual polish.`,
    hasPersonaPicker: true,
  },
];

const personas = [
  {
    id: "maria",
    name: "Maria Delgado",
    role: "Owner & Director · Sunrise Family Child Care",
    flow: "Grant Application Concierge",
    href: "/grantee/maria-delgado",
    photo: "/avatars/maria.svg",
    accent: "bg-[#0E7C7B]",
    description: "Gets to a compliance-complete application, then onboarded for payment",
  },
  {
    id: "tasha",
    name: "Tasha Brooks",
    role: "Program Officer · CCFF, LIIF",
    flow: "Payment Readiness & Monitoring",
    href: "/program/tasha-brooks",
    photo: "/avatars/tasha.svg",
    accent: "bg-[#2E5BFF]",
    description: "Hands Finance a package it can rely on — ending the duplicate review",
  },
  {
    id: "david",
    name: "David Okafor",
    role: "Controller · Grants Finance, LIIF",
    flow: "Payment Release",
    href: "/finance/david-okafor",
    photo: "/avatars/david.svg",
    accent: "bg-[#E26A2C]",
    description: "Clears an aged-payment queue in minutes with every control intact",
  },
];

function AccordionSection({
  section,
  isOpen,
  onToggle,
}: {
  section: (typeof sections)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-0 text-left group gap-3"
      >
        <div className="flex items-center gap-3 min-w-0">
          <section.Icon className="flex-shrink-0" sx={{ fontSize: 32, color: section.color }} />
          <h2 className="text-2xl font-medium" style={{ color: section.color }}>
            {section.title}
          </h2>
        </div>
        <ChevronDown
          size={20}
          className={cn(
            "text-ink-muted transition-transform duration-200 flex-shrink-0",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div className="pb-6">
          <div className="prose prose-sm max-w-none text-ink-muted leading-relaxed tracking-tight space-y-3">
            {section.body.split("\n\n").map((para, i) => (
              <div key={i} dangerouslySetInnerHTML={{ __html: para }} />
            ))}
          </div>

          {section.hasPersonaPicker && (
            <div className="mt-8">
              <p className="text-[11px] font-bold uppercase tracking-tight text-ink-muted mb-4">
                Enter the flows
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {personas.map((p) => (
                  <Link
                    key={p.id}
                    href={p.href}
                    className="group bg-surface border border-border rounded-2xl p-5 hover:shadow-md hover:border-ink/20 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image src={p.photo} alt={p.name} fill unoptimized className="object-cover" sizes="48px" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-ink">{p.name}</p>
                        <p className="text-[11px] text-ink-muted">{p.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-block w-2 h-2 rounded-full ${p.accent}`} />
                      <p className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">{p.flow}</p>
                    </div>
                    <p className="text-xs text-ink-muted leading-relaxed">{p.description}</p>
                    <p className="mt-3 text-xs font-semibold text-employee-accent group-hover:underline">Enter →</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function LandingPage() {
  const [openId, setOpenId] = useState<string | null>("broken");

  function toggle(id: string) {
    setOpenId(openId === id ? null : id);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative" style={{ backgroundColor: "#E8F4EF" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-8 pb-24 pt-12">
          <Image
            src="/liif.png"
            alt="LIIF"
            width={742}
            height={529}
            priority
            className="h-12 w-auto mb-12"
          />
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-ink-muted mb-2">
                Vision · Low Income Investment Fund
              </p>
              <h1 className="text-4xl sm:text-5xl text-ink tracking-tight font-semibold leading-[1.05]">
                A Vision for a LIIF &ldquo;Grant Operating System&rdquo;
              </h1>
              <p className="text-sm text-ink-muted mt-3 max-w-xl">
                An agent-enabled way to administer early-childhood-education facilities grants — and get money to providers faster, without giving up a single control.
              </p>
            </div>
            <p className="text-sm text-ink-muted">Ben Clemens · June 2026</p>
          </div>
        </div>
      </header>

      {/* Intro */}
      <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-10 pb-4">
        <p className="text-sm text-ink-muted max-w-2xl">
          A proposal in three parts to envision how an agentic framework replace LIIF&rsquo;s current mix of software
          and services. The interactive flows are in the third section.
        </p>
      </div>

      {/* Accordion */}
      <div className="max-w-3xl mx-auto px-4 sm:px-8 pb-20">
        {sections.map((section) => (
          <AccordionSection
            key={section.id}
            section={section}
            isOpen={openId === section.id}
            onToggle={() => toggle(section.id)}
          />
        ))}
      </div>
    </div>
  );
}
