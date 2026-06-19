import type { FlowStepDef } from './types'

export type { FlowStepDef }

export const paymentReleaseSteps: FlowStepDef[] = [
  {
    id: 'step-ingest',
    label: 'Stalled payment detected',
    shortLabel: 'Detected',
    description: 'PR-CCFF-0461 stuck 78 days — root cause traced',
  },
  {
    id: 'step-scope',
    label: 'Scope the aged-payment queue',
    shortLabel: 'Scope',
    description: '14 payments aging > 30 days · $612,400 held',
  },
  {
    id: 'step-reasoning',
    label: 'Controls reasoning',
    shortLabel: 'Reasoning',
    description: 'Delegation of Authority, two-tier release, segregation of duties',
  },
  {
    id: 'step-calculate',
    label: 'Queue calculation',
    shortLabel: 'Calculate',
    description: 'By root cause and release tier — releasable now vs. second signer',
  },
  {
    id: 'step-execute',
    label: 'Authorize & release',
    shortLabel: 'Release',
    description: '11 released now, 3 routed to the CFO — each with an audit entry',
  },
  {
    id: 'step-compare',
    label: 'Before & after',
    shortLabel: 'Compare',
    description: 'Seven tools and a 1–2 month wait → one platform, same week',
  },
]
