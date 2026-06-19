import type { FlowStepDef } from './types'

export type { FlowStepDef }

// Tab A — the compliance-complete handoff that ends the duplicate Finance review
export const handoffSteps: FlowStepDef[] = [
  {
    id: 'step-observe',
    label: 'Sunrise FCC is payment-ready',
    shortLabel: 'Ready',
    description: 'Agent observation: the package is complete',
  },
  {
    id: 'step-provenance',
    label: 'Provenance of every item',
    shortLabel: 'Provenance',
    description: 'Each compliance item, its source, and when it was verified',
  },
  {
    id: 'step-payee',
    label: 'Confirm the payee (penny-drop)',
    shortLabel: 'Payee',
    description: 'Program-owned: Payoneer registration matches the W-9',
  },
  {
    id: 'step-handoff',
    label: 'Hand off to Finance',
    shortLabel: 'Hand off',
    description: 'Finance can rely on the package, not repeat the review',
  },
  {
    id: 'step-initiated',
    label: 'Payment request initiated',
    shortLabel: 'Initiated',
    description: 'Audit entry, routing, and the time-to-payment clock',
  },
]

// Tab B — monitoring & the non-compliance cadence
export const monitoringSteps: FlowStepDef[] = [
  {
    id: 'step-mon-observe',
    label: 'Overdue reports detected',
    shortLabel: 'Detected',
    description: '3 Use-of-Funds reports past the 6-month deadline',
  },
  {
    id: 'step-mon-cadence',
    label: 'The reminder & default cadence',
    shortLabel: 'Cadence',
    description: '1 week, 2 weeks, PO escalation at 3 weeks',
  },
  {
    id: 'step-mon-action',
    label: 'Queue reminders + draft notice',
    shortLabel: 'Action',
    description: 'Nothing sends without your review',
  },
]
