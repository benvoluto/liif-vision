import type { Action } from './types'

// ── Flow 1 — Grantee Concierge (Maria / Sunrise FCC) ─────────────────────────

export const assembleApplication: Action = {
  id: 'action-assemble-application',
  kind: 'application-assembly',
  label: 'Assemble a compliance-complete application',
  scope: {
    label: 'Sunrise Family Child Care only',
    description:
      'Applies only to Sunrise FCC\'s CCFF FY26 application. Pulls verifications from public sources and pre-fills the Project Proposal — nothing is submitted yet.',
  },
  preview:
    'Verify eligibility, pull SAM.gov / OFAC / license checks, and pre-fill the use-of-funds budget from the ontology — so the application clears review on the first pass.',
  confidence: 92,
  confidenceNote:
    'High · License, SAM.gov, OFAC, and W-9 are verifiable from authoritative sources. Budget figures are pre-filled from Maria\'s line items and remain editable.',
  requiredApprovals: ['Maria Delgado (review & e-sign)'],
  policyRefs: [
    { kind: 'Program', id: 'program-ccff', label: 'CCFF FY26 eligibility rules' },
    { kind: 'ComplianceItem', id: 'ci-license', label: 'CCLD license verification' },
  ],
  dryRun: {
    lines: [
      { field: 'Child care license', before: 'Not checked', after: 'Active · CCLD #384012345 (verified)' },
      { field: 'SAM.gov exclusions', before: 'Not checked', after: 'Not excluded (PDF saved)' },
      { field: 'OFAC screen', before: 'Not checked', after: 'Clear (PDF saved)' },
      { field: 'W-9 name / TIN match', before: 'Uploaded', after: 'Matched to IRS records' },
      { field: 'Use-of-funds budget', before: 'Blank template', after: '6 line items pre-filled · totals $48,500' },
      { field: 'Project Proposal', before: '—', after: 'Drafted from template + 3 site photos' },
    ],
    impact: 'Application reaches "compliance-complete" before submission. Nothing is sent until Maria approves and e-signs.',
    note: 'These are the exact items that get re-checked downstream today. Verifying them once, at the source, is what lets the rest of the process rely on them.',
  },
}

export const submitApplication: Action = {
  id: 'action-submit-application',
  kind: 'workflow-submission',
  label: 'Submit & begin payment onboarding',
  scope: {
    label: 'Sunrise Family Child Care only',
    description:
      'Submits the compliance-complete application and starts Payoneer onboarding so funds can move the moment the award is approved.',
  },
  preview: 'Submit to CCFF review and start Payoneer payment onboarding in parallel.',
  confidence: 95,
  confidenceNote: 'High · All required items verified. Payee onboarding can run in parallel with review, removing a later wait.',
  requiredApprovals: ['Maria Delgado (self)'],
  policyRefs: [
    { kind: 'Program', id: 'program-ccff', label: 'CCFF FY26' },
    { kind: 'System', id: 'system-payoneer', label: 'Payoneer onboarding' },
  ],
}

// ── Flow 2 — Program Officer (Tasha) ─────────────────────────────────────────

export const confirmPayee: Action = {
  id: 'action-confirm-payee',
  kind: 'payee-approval',
  label: 'Confirm payee — Payoneer matches W-9 (penny-drop)',
  scope: {
    label: 'Sunrise FCC payee record',
    description:
      'Payee Approval is owned by the Program team: confirm the Payoneer registration name matches the W-9, with a $7 penny-drop for the new payee.',
  },
  preview: 'Run the $7 penny-drop and confirm the Payoneer registration matches the W-9 on file.',
  confidence: 90,
  confidenceNote: 'High · Name and TIN already matched; penny-drop confirms the bank account is live and correctly registered.',
  requiredApprovals: ['Tasha Brooks (Program Officer)'],
  policyRefs: [
    { kind: 'ComplianceItem', id: 'ci-payee', label: 'Payee Approval (penny-drop)' },
    { kind: 'System', id: 'system-payoneer', label: 'Payoneer registration' },
  ],
}

export const complianceHandoff: Action = {
  id: 'action-compliance-handoff',
  kind: 'compliance-complete-handoff',
  label: 'Send compliance-complete package to Finance',
  scope: {
    label: 'PR-CCFF-0461 · Sunrise FCC · $48,500',
    description:
      'Hands Finance a signed, source-verified package: every item Finance re-checks today is already verified, dated, and attributed. Finance\'s job becomes release authorization, not re-verification.',
  },
  preview:
    'Package the executed agreement, cost center, and all six verified compliance items so Finance can rely on the handoff instead of repeating the review.',
  confidence: 93,
  confidenceNote:
    'High · Each item carries a source and timestamp. The non-delegable controls (release authorization, segregation of duties) are preserved for Finance — only the duplicate document review is removed.',
  requiredApprovals: ['Tasha Brooks (supervisor confirmation of cost centers)'],
  policyRefs: [
    { kind: 'Agreement', id: 'agr-sunrise-ccff-fy26', label: 'Executed agreement · RS-CCFF-26-0418' },
    { kind: 'Policy', id: 'doa-payment-release', label: 'Delegation of Authority' },
  ],
  dryRun: {
    lines: [
      { field: 'Cost center', before: 'Unconfirmed', after: 'CCFF-SF-FY26 (confirmed by PO)' },
      { field: 'Executed agreement', before: 'Referenced', after: 'RightSignature URL valid · signed by delegate' },
      { field: 'Compliance items', before: 'To re-verify', after: '6 of 6 verified at source · dated · attributed' },
      { field: 'Payee approval', before: 'Pending', after: 'Penny-drop confirmed · Payoneer = W-9' },
      { field: 'Finance step', before: 'Re-verify documents', after: 'Release authorization only' },
    ],
    impact: 'Finance review reduces from full re-verification to the release decision it cannot delegate. First-pass approval becomes the norm, not the exception.',
    note: 'This is the documented friction point: today Finance re-checks what the Program team already vetted. The fix is a trustworthy handoff, not removing the control.',
  },
}

export const monitoringCadence: Action = {
  id: 'action-monitoring-cadence',
  kind: 'monitoring-cadence',
  label: 'Send reminders + draft default notices',
  scope: {
    label: 'CCFF portfolio · 3 grantees',
    count: 3,
    countUnit: 'grantees',
    description:
      'Runs the documented cadence (1-week and 2-week reminders) for overdue Use-of-Funds reports and drafts a default/late notice for the unresponsive grantee. Nothing sends without Tasha\'s review.',
  },
  preview: 'Queue reminders for the cadence, escalate the 3-week case to the PO, and draft a certified-mail default notice for review.',
  confidence: 86,
  confidenceNote: 'Medium-high · Deadlines and cadence are factual from the monitoring policy; the default notice is drafted for human review, never auto-sent.',
  requiredApprovals: ['Tasha Brooks (review before any notice sends)'],
  policyRefs: [
    { kind: 'Report', id: 'rep-overdue-cohort', label: '3 overdue Use-of-Funds reports' },
    { kind: 'Policy', id: 'policy-monitoring-cadence', label: 'Reminder & default cadence' },
  ],
}

// ── Flow 3 — Finance / Controller (David) ───────────────────

export const releaseSinglePayment: Action = {
  id: 'action-release-single',
  kind: 'payment-release',
  label: 'Authorize release — PR-CCFF-0461 ($48,500)',
  scope: {
    label: '1 payment · $48,500 · CCFF · Sunrise FCC',
    description:
      'Releases the stalled payment. Because it is over $15,000, the Delegation of Authority requires a second approver (CFO). Segregation of duties is enforced: the initiator cannot approve.',
  },
  preview: 'Validate the compliance-complete handoff, confirm fund availability, and route for two-tier release per the Delegation of Authority.',
  confidence: 94,
  confidenceNote: 'High · Handoff is source-verified; cost center and fund availability confirmed. Two-tier approval and segregation of duties are enforced by the action, not by convention.',
  requiredApprovals: ['David Okafor (Controller · first approver)', 'CFO (second approver · > $15,000)'],
  policyRefs: [
    { kind: 'Policy', id: 'doa-payment-release', label: 'Delegation of Authority' },
    { kind: 'PaymentRequest', id: 'pr-sunrise-ccff-0461', label: 'PR-CCFF-0461' },
  ],
  dryRun: {
    lines: [
      { field: 'Compliance handoff', before: 'Re-verify (today)', after: 'Relied upon · 6/6 verified at source' },
      { field: 'Cost center', before: 'CCFF-SF-FY26', after: 'Confirmed · funds available' },
      { field: 'Release tier', before: 'Mis-routed to CFO only', after: 'Controller (1st) + CFO (2nd, > $15K)' },
      { field: 'Segregation of duties', before: 'Not enforced', after: 'Initiator ≠ approver (enforced)' },
      { field: 'Channel', before: 'Payment Pending', after: 'Wire → Payoneer · "Funded" label on confirm' },
    ],
    impact: 'Payment moves the same day. Controls are preserved, not bypassed — the difference is governance in the action instead of manual routing.',
    note: 'The audit trail is generated automatically and is stronger than the manual one it replaces.',
  },
}

export const previewAgedQueue: Action = {
  id: 'action-preview-aged-queue',
  kind: 'calculation',
  label: 'Calculate the aged-payment queue',
  scope: {
    label: '14 payments · CCFF FY26 · aging > 30 days',
    count: 14,
    countUnit: 'payments',
    description:
      'Dry-run across every CCFF payment aging past 30 days. No funds move until each is approved under the Delegation of Authority.',
  },
  preview: 'Compute the backlog by root cause and release tier — what is releasable now vs. what truly needs a second signer.',
  confidence: 91,
  confidenceNote: 'High · Each payment is scored against its compliance handoff and the $15,000 threshold. Three genuinely need exceptions and are held for human review.',
  requiredApprovals: ['David Okafor (Controller)', 'CFO (for payments > $15,000)'],
  policyRefs: [
    { kind: 'Policy', id: 'doa-payment-release', label: 'Delegation of Authority' },
    { kind: 'Program', id: 'program-ccff', label: 'CCFF FY26' },
  ],
  dryRun: {
    table: {
      columns: ['Root cause', 'Count', 'Value', 'Median age', 'Disposition'],
      rows: [
        ['Submittable backward move / re-route', '6', '$214,800', '61 days', 'Release now (handoff intact)'],
        ['Duplicate review re-queue', '4', '$163,500', '44 days', 'Release now (handoff intact)'],
        ['Under $15K · single approver', '1', '$9,200', '33 days', 'Release now (Controller only)'],
        ['Over $15K · second signer due', '3', '$224,900', '52 days', 'Route to CFO co-sign'],
        ['**Total**', '**14**', '**$612,400**', '**51 days**', '**11 now · 3 to CFO**'],
      ],
      summary: 'Fund availability and segregation of duties confirmed for all 14. Three exceptions are held, not forced through.',
    },
    impact: 'Median time-to-payment for this cohort: 51 days. With governed release, 11 of 14 clear immediately and 3 route correctly for the second signature.',
    note: 'No payment is forced through. The agent clears the ones the controls already permit and surfaces the ones that genuinely need a human decision.',
  },
}

export const executeQueueRelease: Action = {
  id: 'action-execute-queue',
  kind: 'batch-release',
  label: 'Release the cleared queue (11 of 14)',
  scope: {
    label: '11 payments · $387,500 · CCFF FY26',
    count: 11,
    countUnit: 'payments',
    description:
      'Releases the 11 payments whose controls already permit it; the 3 over-$15K exceptions route to the CFO with the full package attached. Each release writes its own audit entry.',
  },
  preview: 'Authorize the 11 releasable payments and route the 3 exceptions to the CFO with one click each.',
  confidence: 92,
  confidenceNote: 'High · Every release is individually governed and individually logged. The 3 exceptions are surfaced with their second-signer requirement intact.',
  requiredApprovals: ['David Okafor (Controller)', 'CFO (for the 3 exceptions)'],
  policyRefs: [
    { kind: 'Policy', id: 'doa-payment-release', label: 'Delegation of Authority' },
    { kind: 'Program', id: 'program-ccff', label: 'CCFF FY26' },
  ],
}
