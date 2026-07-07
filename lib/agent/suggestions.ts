import type { BriefingCardDef, QuickAction, InProgressItem } from '../ontology/types'

// ── Maria Delgado — Grantee surface (Sunrise Family Child Care) ───────────────

export const mariaCards: BriefingCardDef[] = [
  {
    id: 'card-maria-application',
    icon: '📝',
    title: 'Finish your CCFF facilities application',
    context:
      'You\'re at step 2 of 6. I can verify your license, run the SAM.gov and OFAC checks, and pre-fill your $48,500 use-of-funds budget so it clears review on the first pass.',
    priority: 'process',
    priorityLabel: 'In Progress · Step 2 of 6',
    ctaLabel: 'Continue',
    ctaHref: '/flows/grant-application',
    sources: [
      { label: 'Application app-sunrise-ccff-fy26', kind: 'Application', id: 'app-sunrise-ccff-fy26' },
      { label: 'CCFF FY26 eligibility', kind: 'Program', id: 'program-ccff' },
    ],
    explain: {
      whySurfaced:
        'You started a CCFF FY26 Family Child Care application on June 9 and the eligibility auto-screen passed. Four of the six required items can be verified for you right now from authoritative sources; two need your input. Completing them before you submit is what keeps the application from bouncing back at review.',
      whatLooked: [
        { kind: 'Provider', id: 'provider-sunrise-fcc', label: 'Provider: Sunrise Family Child Care' },
        { kind: 'Program', id: 'program-ccff', label: 'Program: CCFF FY26' },
        { kind: 'Application', id: 'app-sunrise-ccff-fy26', label: 'Application: in progress' },
        { kind: 'ComplianceItem', id: 'ci-license', label: 'ComplianceItem: CCLD license' },
      ],
      confidence: 92,
      confidenceNote: 'High · Eligibility rules and verification sources are well-defined for CCFF. Your budget figures remain editable.',
      willDo: 'I can verify your license, SAM.gov, OFAC, and W-9, pre-fill the budget from your line items, and draft the Project Proposal for your review.',
      wontDo: 'I will not submit anything without your review and e-signature.',
    },
  },
  {
    id: 'card-maria-payment',
    icon: '⏳',
    title: 'Your $48,500 payment is delayed',
    context:
      'Your approved facilities grant has been waiting 78 days. It got stuck in routing — not anything you did. Your Program Officer and Finance have been notified and it\'s now first in line.',
    priority: 'high',
    priorityLabel: 'Delayed · Action On LIIF',
    ctaLabel: 'Track payment',
    sources: [
      { label: 'PR-CCFF-0461 ($48,500)', kind: 'PaymentRequest', id: 'pr-sunrise-ccff-0461' },
      { label: 'Stalled-payment event', kind: 'Event', id: 'event-payment-stalled' },
    ],
    explain: {
      whySurfaced:
        'Payment PR-CCFF-0461 for your executed $48,500 grant has been in "Payment Pending" for 78 days. The cause was internal: a reviewer reassignment moved your request backward in the system and erased the prior review, then it was mis-routed. This is exactly the kind of silent delay the new architecture is built to prevent.',
      whatLooked: [
        { kind: 'PaymentRequest', id: 'pr-sunrise-ccff-0461', label: 'PaymentRequest: PR-CCFF-0461' },
        { kind: 'Agreement', id: 'agr-sunrise-ccff-fy26', label: 'Agreement: executed $48,500' },
        { kind: 'Event', id: 'event-payment-stalled', label: 'Event: payment stalled 78 days' },
      ],
      confidence: 88,
      confidenceNote: 'High on the facts (timestamps are in the record). The recovery is now staged on the Finance surface.',
      willDo: 'I can show you exactly where the payment is, who holds the next step, and the expected release date.',
      wontDo: 'I cannot release the payment myself — that requires LIIF\'s Controller and, above $15,000, the CFO.',
    },
  },
  {
    id: 'card-maria-alameda',
    icon: '🌱',
    title: 'You may qualify for the Alameda expansion',
    context:
      'A new Alameda County facilities program is opening. Based on your provider type and standing, your profile already meets the draft eligibility — most of your application could carry over.',
    priority: 'opportunity',
    priorityLabel: 'Opportunity',
    ctaLabel: 'See eligibility',
    sources: [
      { label: 'Alameda County (new program)', kind: 'Program', id: 'program-alameda' },
      { label: 'New-program event', kind: 'Event', id: 'event-new-program' },
    ],
    explain: {
      whySurfaced:
        'A new Alameda County facilities program is being stood up. Your provider record (type, license standing, two closed grants) already satisfies the draft eligibility criteria. Because both programs sit on the same ontology, most of your CCFF application could be reused.',
      whatLooked: [
        { kind: 'Provider', id: 'provider-sunrise-fcc', label: 'Provider: Sunrise FCC (good standing)' },
        { kind: 'Program', id: 'program-alameda', label: 'Program: Alameda County (draft)' },
        { kind: 'Event', id: 'event-new-program', label: 'Event: new RFP awarded' },
      ],
      confidence: 74,
      confidenceNote: 'Medium · The Alameda program design is still in draft; final eligibility could shift before launch.',
      willDo: 'I can show the draft criteria and which parts of your CCFF application would carry over.',
      wontDo: 'I will not pre-register you for a program that has not formally opened.',
    },
  },
  {
    id: 'card-maria-report',
    icon: '🧾',
    title: 'Use-of-Funds report due in 30 days',
    context:
      'For your FY25 grant, the Use-of-Funds report (receipts + reconciliation) is due 11/30. I can pre-fill it from the receipts already on file and flag what\'s missing.',
    priority: 'storm',
    priorityLabel: 'Deadline · Nov 30',
    ctaLabel: 'Start report',
    sources: [
      { label: 'Use-of-Funds report', kind: 'Report', id: 'rep-sunrise-uof' },
      { label: 'Monitoring cadence', kind: 'Policy', id: 'policy-monitoring-cadence' },
    ],
    explain: {
      whySurfaced:
        'Your FY25 grant\'s Use-of-Funds report is due six months after execution — November 30. Invoices are not accepted as proof of payment; receipts and cancelled checks are. I can assemble what you\'ve already uploaded and tell you exactly what is still needed.',
      whatLooked: [
        { kind: 'Report', id: 'rep-sunrise-uof', label: 'Report: Use-of-Funds (due 11/30)' },
        { kind: 'Provider', id: 'provider-sunrise-fcc', label: 'Provider: Sunrise FCC' },
        { kind: 'Policy', id: 'policy-monitoring-cadence', label: 'Policy: reporting requirements' },
      ],
      confidence: 83,
      confidenceNote: 'Medium-high · Deadline is fixed; the gap analysis depends on which receipts you upload.',
      willDo: 'I can pre-fill the report from receipts on file and list the missing proof of payment.',
      wontDo: 'I will not submit the report until you confirm the receipts are complete and correct.',
    },
  },
]

export const mariaQuickActions: QuickAction[] = [
  { id: 'qa-new-app', label: 'Start a new application', icon: '📝' },
  { id: 'qa-upload', label: 'Upload a document', icon: '📎' },
  { id: 'qa-payment', label: 'Check payment status', icon: '💰' },
  { id: 'qa-grants', label: 'View my grants', icon: '📁' },
  { id: 'qa-message', label: 'Message my Program Officer', icon: '✉️' },
]

export const mariaInProgress: InProgressItem[] = [
  {
    id: 'ip-application',
    label: 'CCFF FY26 application',
    detail: 'Compliance-complete: 5 of 6 items verified. Remaining: payee approval (Payoneer penny-drop), which your Program Officer confirms.',
    status: 'in-progress',
    ctaLabel: 'Continue',
    ctaHref: '/flows/grant-application',
  },
  {
    id: 'ip-onboarding',
    label: 'Payoneer onboarding',
    detail: 'Started in parallel with your application so funds can move the moment your award is approved.',
    status: 'in-progress',
    ctaLabel: 'Check status',
  },
]

// ── Tasha Brooks — Program Officer surface (CCFF) ────────────────────────────

export const tashaCards: BriefingCardDef[] = [
  {
    id: 'card-tasha-handoff',
    icon: '📦',
    title: 'Sunrise FCC is ready for payment',
    context:
      'All six compliance items are verified. I\'ve assembled a compliance-complete package so Finance can rely on it and release, instead of re-checking documents you already vetted.',
    priority: 'high',
    priorityLabel: 'Ready To Hand Off',
    ctaLabel: 'Review & send to Finance',
    ctaHref: '/flows/payment-readiness',
    sources: [
      { label: 'PR-CCFF-0461', kind: 'PaymentRequest', id: 'pr-sunrise-ccff-0461' },
      { label: 'Executed agreement', kind: 'Agreement', id: 'agr-sunrise-ccff-fy26' },
    ],
    explain: {
      whySurfaced:
        'Sunrise FCC\'s payment request is complete: the agreement is executed via RightSignature, the cost center is confirmed, and all six compliance items are verified at source with timestamps. The one open item — payee approval — is the Program team\'s to confirm (penny-drop). Once you do, Finance gets a package it can rely on.',
      whatLooked: [
        { kind: 'Application', id: 'app-sunrise-ccff-fy26', label: 'Application: compliance-complete' },
        { kind: 'Agreement', id: 'agr-sunrise-ccff-fy26', label: 'Agreement: RS-CCFF-26-0418' },
        { kind: 'PaymentRequest', id: 'pr-sunrise-ccff-0461', label: 'PaymentRequest: PR-CCFF-0461' },
        { kind: 'Policy', id: 'doa-payment-release', label: 'Policy: Delegation of Authority' },
      ],
      confidence: 93,
      confidenceNote: 'High · Every item carries a source and date. The handoff removes the duplicate review, not the controls Finance owns.',
      willDo: 'I can run the payee penny-drop, confirm cost centers, and send Finance a source-verified package for release authorization.',
      wontDo: 'I will not initiate the payment without your supervisor confirmation, and I cannot perform Finance\'s release approval.',
    },
  },
  {
    id: 'card-tasha-queue',
    icon: '⏱️',
    title: '14 CCFF payments aging past 30 days',
    context:
      'Median time-to-payment in your portfolio is 7.2 weeks, with no shared target. Most are stuck in routing or a duplicate review — not missing anything.',
    priority: 'process',
    priorityLabel: 'In Process',
    ctaLabel: 'See queue',
    ctaHref: '/flows/payment-release',
    sources: [
      { label: 'Aged-payment cohort', kind: 'PaymentRequest', id: 'pr-sunrise-ccff-0461' },
      { label: 'CCFF FY26', kind: 'Program', id: 'program-ccff' },
    ],
    explain: {
      whySurfaced:
        'Fourteen CCFF payments have been pending longer than 30 days. The agent traced root causes: six from Submittable moving submissions backward, four re-queued for duplicate review, and a handful awaiting a second signer. Eleven are releasable now; three genuinely need a CFO co-signature.',
      whatLooked: [
        { kind: 'Program', id: 'program-ccff', label: 'Program: CCFF FY26' },
        { kind: 'PaymentRequest', id: 'pr-sunrise-ccff-0461', label: 'PaymentRequest: PR-CCFF-0461 (sample)' },
        { kind: 'System', id: 'system-submittable', label: 'System: Submittable stage history' },
      ],
      confidence: 89,
      confidenceNote: 'High · Backlog and ages are factual; root-cause attribution is reconstructed from stage history and is auditable.',
      willDo: 'I can show the full queue by root cause and hand the releasable ones to Finance with their packages attached.',
      wontDo: 'I will not release payments — that is Finance\'s authority.',
    },
  },
  {
    id: 'card-tasha-monitoring',
    icon: '🔔',
    title: '3 Use-of-Funds reports overdue',
    context:
      'Three grantees are past the 6-month deadline; one hasn\'t responded past the reminder window. I can run the reminder cadence and draft a default notice for your review.',
    priority: 'storm',
    priorityLabel: 'Deadline · Escalation Due',
    ctaLabel: 'Review monitoring',
    ctaHref: '/flows/payment-readiness',
    sources: [
      { label: '3 overdue reports', kind: 'Report', id: 'rep-overdue-cohort' },
      { label: 'Non-compliance event', kind: 'Event', id: 'event-noncompliance' },
    ],
    explain: {
      whySurfaced:
        'Three Use-of-Funds reports are past their 6-month deadline. The documented cadence is a reminder at one week, another at two weeks, and PO escalation at three weeks; one grantee is now past that window and needs a default/late notice by certified mail.',
      whatLooked: [
        { kind: 'Report', id: 'rep-overdue-cohort', label: 'Report: 3 overdue Use-of-Funds' },
        { kind: 'Event', id: 'event-noncompliance', label: 'Event: non-compliance cohort' },
        { kind: 'Policy', id: 'policy-monitoring-cadence', label: 'Policy: reminder & default cadence' },
      ],
      confidence: 86,
      confidenceNote: 'Medium-high · Deadlines are factual; the default notice is drafted for your review, never auto-sent.',
      willDo: 'I can queue the reminders, escalate the 3-week case to you, and draft the default notice.',
      wontDo: 'I will not send a default or termination notice without your explicit approval.',
    },
  },
  {
    id: 'card-tasha-alameda',
    icon: '🧩',
    title: 'Compose the Alameda program from template',
    context:
      'A new Alameda RFP needs a program. Instead of rebuilding guidelines, Submittable steps, cost codes, and signing thresholds from scratch, I can compose them from the ontology.',
    priority: 'opportunity',
    priorityLabel: 'Opportunity',
    ctaLabel: 'Open template',
    sources: [
      { label: 'Alameda County (new)', kind: 'Program', id: 'program-alameda' },
      { label: 'Program design template', kind: 'Policy', id: 'policy-program-template' },
    ],
    explain: {
      whySurfaced:
        'The Alameda award is signed and a program must be stood up. Today every program is rebuilt per RFP because there is no single definition of "what a LIIF grant requires." The ontology already encodes those decisions — eligibility, payment structure, cost codes, delegation thresholds — so a new program can be composed and reviewed rather than authored from a blank page.',
      whatLooked: [
        { kind: 'Program', id: 'program-alameda', label: 'Program: Alameda County (draft)' },
        { kind: 'Program', id: 'program-ccff', label: 'Program: CCFF (reference template)' },
        { kind: 'Policy', id: 'policy-program-template', label: 'Policy: program design template' },
      ],
      confidence: 78,
      confidenceNote: 'Medium · Structure carries over cleanly; funder-specific terms (advance handling, appeals) still need Finance and Legal sign-off.',
      willDo: 'I can draft the Alameda program config from CCFF and flag the decisions Finance and Legal must confirm.',
      wontDo: 'I will not launch a program without Finance, Legal, and PAC approval.',
    },
  },
]

export const tashaQuickActions: QuickAction[] = [
  { id: 'qa-review-app', label: 'Review an application', icon: '🔍' },
  { id: 'qa-confirm-payee', label: 'Confirm a payee', icon: '✅' },
  { id: 'qa-initiate-pr', label: 'Initiate a payment request', icon: '💸' },
  { id: 'qa-monitoring', label: 'Open monitoring queue', icon: '🔔' },
  { id: 'qa-compose', label: 'Compose a new program', icon: '🧩' },
]

export const tashaInProgress: InProgressItem[] = [
  {
    id: 'ip-handoff',
    label: 'Sunrise FCC — ready to hand off',
    detail: 'Compliance-complete (6 of 6 once payee confirmed). Package assembled for Finance release authorization.',
    status: 'action-needed',
    ctaLabel: 'Review handoff',
    ctaHref: '/flows/payment-readiness',
  },
  {
    id: 'ip-alameda',
    label: 'Alameda program design (draft)',
    detail: 'Composed from CCFF template. 4 funder-specific decisions flagged for Finance & Legal.',
    status: 'in-progress',
    ctaLabel: 'Continue',
  },
]

// ── David Okafor — Finance / Controller surface ──────────────────────────────

export const davidCards: BriefingCardDef[] = [
  {
    id: 'card-david-queue',
    icon: '🏦',
    title: 'Aged-payment queue — 14 payments, $612K held',
    context:
      'Eleven are releasable now with controls intact; three need a CFO co-signature. I\'ll preview every release, enforce segregation of duties, and write the audit trail.',
    priority: 'high',
    priorityLabel: 'High Priority',
    ctaLabel: 'Clear the queue',
    ctaHref: '/flows/payment-release',
    sources: [
      { label: 'CCFF FY26 aged cohort', kind: 'Program', id: 'program-ccff' },
      { label: 'Delegation of Authority', kind: 'Policy', id: 'doa-payment-release' },
    ],
    explain: {
      whySurfaced:
        'Fourteen CCFF payments totaling $612,400 have aged past 30 days, with a median age of 51 days. The agent scored each against its compliance handoff and the $15,000 threshold: 11 are releasable now and 3 require the second approver. The point is not speed at the expense of control — it is removing the manual routing that lets payments age silently while preserving every control you own.',
      whatLooked: [
        { kind: 'Program', id: 'program-ccff', label: 'Program: CCFF FY26' },
        { kind: 'PaymentRequest', id: 'pr-sunrise-ccff-0461', label: 'PaymentRequest: PR-CCFF-0461 (incl.)' },
        { kind: 'Policy', id: 'doa-payment-release', label: 'Policy: Delegation of Authority' },
        { kind: 'System', id: 'system-submittable', label: 'System: Submittable stage history' },
      ],
      confidence: 91,
      confidenceNote: 'High · Ages and amounts are factual. Each release is individually governed; the 3 exceptions are held for the CFO.',
      willDo: 'I can preview the full queue, release the 11 within your authority, and route the 3 over $15,000 to the CFO with their packages.',
      wontDo: 'I will not release any payment over $15,000 without the CFO\'s second approval, and I will never let an initiator approve their own request.',
    },
  },
  {
    id: 'card-david-slo',
    icon: '📊',
    title: 'No shared time-to-payment target exists',
    context:
      'Time-to-payment runs one to two months with no owner. A published target — fenced around your controls — would let us see where payments stall.',
    priority: 'process',
    priorityLabel: 'In Process',
    ctaLabel: 'Define the SLO',
    sources: [
      { label: 'Disbursement metrics', kind: 'System', id: 'system-metrics' },
      { label: 'CCFF FY26', kind: 'Program', id: 'program-ccff' },
    ],
    explain: {
      whySurfaced:
        'There is no agreed definition of a "good, compliant disbursement" and no published target, so timelines vary widely and no one owns end-to-end performance. A shared service-level objective — first-pass approval rate, compliance-complete-at-handoff, time-to-payment — would make stalls visible. It must be explicitly balanced against the controls you will never trade away.',
      whatLooked: [
        { kind: 'System', id: 'system-metrics', label: 'System: disbursement metrics (none today)' },
        { kind: 'Program', id: 'program-ccff', label: 'Program: CCFF FY26' },
        { kind: 'Policy', id: 'doa-payment-release', label: 'Policy: controls to protect' },
      ],
      confidence: 72,
      confidenceNote: 'Medium · This is a proposal, not a finding. The right target is a decision for you to set, not the agent.',
      willDo: 'I can instrument time-to-payment and first-pass approval and surface where stalls happen — read-only until you approve a target.',
      wontDo: 'I will not impose a speed target that pressures a control, and I will not define "good" without your sign-off.',
    },
  },
  {
    id: 'card-david-deployment',
    icon: '⏳',
    title: 'FY26 deployment at 32% with 75% of the year elapsed',
    context:
      '$30.5M of a $94.4M target is out the door across 233 grantees. Slow compliant disbursement — not demand — is the binding constraint on dollars reaching providers.',
    priority: 'storm',
    priorityLabel: 'Deadline · Fiscal Year',
    ctaLabel: 'See dashboard',
    sources: [
      { label: 'ECE deployment vs. target', kind: 'Program', id: 'program-ccff' },
      { label: 'Portfolio metrics', kind: 'System', id: 'system-metrics' },
    ],
    explain: {
      whySurfaced:
        'The FY26 ECE portfolio has deployed about $30.5M against a $94.4M target, while roughly 75% of the fiscal year has elapsed. With demand and awards in place, the gap is downstream — in how fast compliant payments clear. Faster, governed disbursement is the most direct lever on dollars reaching children.',
      whatLooked: [
        { kind: 'Program', id: 'program-ccff', label: 'Program: CCFF (29% of target)' },
        { kind: 'Program', id: 'program-shine', label: 'Program: SHINE (over target)' },
        { kind: 'System', id: 'system-metrics', label: 'System: deployment vs. target' },
      ],
      confidence: 85,
      confidenceNote: 'High on the figures (from the ECE monthly report). The causal claim — disbursement as the binding constraint — is supported but not the only factor.',
      willDo: 'I can break deployment down by program and show how much of the gap is attributable to disbursement lag.',
      wontDo: 'I will not overstate a single cause; program design and demand also vary by funder.',
    },
  },
  {
    id: 'card-david-consolidation',
    icon: '🧰',
    title: 'Retire 4 of 7 point tools onto the ontology',
    context:
      'Submittable, Salesforce, RightSignature, Payoneer, MIP, Concur, and Asana are stitched by manual re-keying. The ontology can absorb routing, records, and reconciliation.',
    priority: 'opportunity',
    priorityLabel: 'Opportunity',
    ctaLabel: 'See consolidation plan',
    sources: [
      { label: 'Legacy tool stack', kind: 'System', id: 'system-submittable' },
      { label: 'Grant ontology', kind: 'Program', id: 'program-ccff' },
    ],
    explain: {
      whySurfaced:
        'Grant operations run on seven point tools connected by manual handoffs and re-keying — the source of the routing fragility, duplicate review, and silent stalls. Moving routing, the system of record, and reconciliation onto one ontology retires several licenses and the integration glue between them, lowering both software cost and operational risk.',
      whatLooked: [
        { kind: 'System', id: 'system-submittable', label: 'System: Submittable / Salesforce / MIP / …' },
        { kind: 'Program', id: 'program-ccff', label: 'Program: CCFF (worked example)' },
        { kind: 'Policy', id: 'policy-program-template', label: 'Policy: ontology as system of record' },
      ],
      confidence: 70,
      confidenceNote: 'Medium · The direction is sound; sequencing and which tools to retire first need a real migration plan with IT and Finance.',
      willDo: 'I can map each tool to the ontology objects it currently owns and propose a staged retirement order.',
      wontDo: 'I will not recommend cutting over a system of record without a tested migration and parallel-run period.',
    },
  },
]

export const davidQuickActions: QuickAction[] = [
  { id: 'qa-approve', label: 'Approve a release', icon: '✅' },
  { id: 'qa-queue', label: 'Review the aged queue', icon: '🗂️' },
  { id: 'qa-funds', label: 'Run a fund-availability check', icon: '💰' },
  { id: 'qa-mip', label: 'Generate a Batch MIP upload', icon: '📤' },
  { id: 'qa-audit', label: 'Open the audit log', icon: '🧾' },
]

export const davidInProgress: InProgressItem[] = [
  {
    id: 'ip-queue',
    label: 'Aged-payment queue — 14 flagged',
    detail: '11 releasable now within your authority; 3 over $15,000 awaiting CFO co-signature. Packages attached to each.',
    status: 'action-needed',
    ctaLabel: 'Open queue',
    ctaHref: '/flows/payment-release',
  },
  {
    id: 'ip-audit',
    label: 'FY26 audit preparation',
    detail: 'Every release now writes its own timestamped audit entry with the package it relied on — stronger than the manual trail it replaces.',
    status: 'in-progress',
    ctaLabel: 'Review trail',
  },
]
