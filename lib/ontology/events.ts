import type { Event } from './types'

// Events are typed objects in the graph. Each one carries its own provenance and
// the set of objects it affects — which is how the agent can reason about it and
// how a reviewer can audit it.

export const applicationSubmitted: Event = {
  id: 'event-sunrise-application',
  kind: 'application-submitted',
  title: 'CCFF FY26 application started — Sunrise Family Child Care',
  occurredAt: '2026-06-09T09:20:00-07:00',
  status: 'active',
  description:
    'Maria Delgado started a CCFF FY26 Family Child Care application for safety and facilities improvements. Eligibility auto-screen passed (license-number format valid). The agent can assemble a compliance-complete package so nothing bounces back at review.',
  affects: [
    { kind: 'Provider', id: 'provider-sunrise-fcc', label: 'Sunrise Family Child Care' },
    { kind: 'Program', id: 'program-ccff', label: 'CCFF FY26' },
    { kind: 'Application', id: 'app-sunrise-ccff-fy26', label: 'Application (in progress)' },
  ],
  provenance:
    'Submittable New Submissions auto-staging — license format check passed; Salesforce Opportunity created automatically.',
}

export const agreementExecuted: Event = {
  id: 'event-sunrise-agreement',
  kind: 'agreement-executed',
  title: 'Grant agreement executed — Sunrise FCC ($48,500)',
  occurredAt: '2026-05-30T16:05:00-07:00',
  status: 'resolved',
  description:
    'The CCFF grant agreement was signed by Sunrise FCC and countersigned by the appropriate LIIF delegate (≤ $500K tier) via RightSignature. The executed agreement is the artifact Finance validates before release.',
  affects: [
    { kind: 'Agreement', id: 'agr-sunrise-ccff-fy26', label: 'Grant Agreement (executed)' },
    { kind: 'System', id: 'system-rightsignature', label: 'RightSignature RS-CCFF-26-0418' },
    { kind: 'Policy', id: 'doa-payment-release', label: 'Delegation of Authority' },
  ],
  provenance: 'RightSignature envelope RS-CCFF-26-0418, executed 2026-05-30; PDF saved to grant folder + Salesforce.',
}

export const paymentStalled: Event = {
  id: 'event-payment-stalled',
  kind: 'payment-stalled',
  title: 'Payment PR-CCFF-0461 stalled 78 days — Sunrise FCC ($48,500)',
  occurredAt: '2026-04-02T11:00:00-07:00',
  status: 'active',
  description:
    'A single CCFF payment request has been sitting in "Payment Pending" for 78 days. Root cause: a reviewer was reassigned in Submittable, which silently moved the submission backward and erased the prior review; on the re-run it was mis-routed to the wrong release queue and bounced between reviewers. No one owned the end-to-end timeline, so it simply aged.',
  affects: [
    { kind: 'PaymentRequest', id: 'pr-sunrise-ccff-0461', label: 'PR-CCFF-0461 ($48,500)' },
    { kind: 'Provider', id: 'provider-sunrise-fcc', label: 'Sunrise Family Child Care' },
    { kind: 'System', id: 'system-submittable', label: 'Submittable routing (backward move)' },
    { kind: 'Policy', id: 'doa-payment-release', label: 'Delegation of Authority (mis-applied)' },
  ],
  provenance:
    'Reconstructed from Submittable stage history + Salesforce timestamps: reviewer reassignment 2026-04-18 reverted stage; mis-route to CFO queue 2026-04-19.',
}

export const portfolioNoncompliance: Event = {
  id: 'event-noncompliance',
  kind: 'noncompliance',
  title: '3 Use-of-Funds reports overdue · 1 grantee unresponsive',
  occurredAt: '2026-06-15T08:00:00-07:00',
  status: 'active',
  description:
    'Across Tasha\'s CCFF portfolio, three Use-of-Funds reports are past the 6-month deadline and one grantee has not responded past the reminder window. The reminder cadence (1 week, 2 weeks, escalate to PO at 3 weeks) and the default/late-notice path are defined but currently run by hand.',
  affects: [
    { kind: 'Program', id: 'program-ccff', label: 'CCFF FY26 portfolio' },
    { kind: 'Report', id: 'rep-overdue-cohort', label: '3 overdue Use-of-Funds reports' },
    { kind: 'Policy', id: 'policy-monitoring-cadence', label: 'Reminder & default cadence' },
  ],
  provenance: 'Salesforce compliance items where status = due and dueDate < today; cross-checked against Submittable report submissions.',
}

export const alamedaProgram: Event = {
  id: 'event-new-program',
  kind: 'new-program',
  title: 'New RFP awarded — Alameda County expansion ($17.9M)',
  occurredAt: '2026-06-01T08:00:00-07:00',
  status: 'pending',
  description:
    'A new Alameda County facilities program needs to stand up. Historically each program is rebuilt from scratch per RFP — guidelines, Submittable steps, cost codes, signing thresholds, payment structure — because there is no single template for "what a LIIF grant requires." The ontology already encodes those decisions and can compose a program in an afternoon.',
  affects: [
    { kind: 'Program', id: 'program-alameda', label: 'Alameda County (new)' },
    { kind: 'Funder', id: 'funder-alameda', label: 'Alameda County' },
    { kind: 'Policy', id: 'policy-program-template', label: 'Program design template (ontology)' },
  ],
  provenance: 'Award letter executed 2026-06-01; finance & legal pipeline meeting flagged for program-setup review.',
}
