import type { FlowStepDef } from './types'

export type { FlowStepDef }

export const grantApplicationSteps: FlowStepDef[] = [
  {
    id: 'step-signal',
    label: 'Application in progress detected',
    shortLabel: 'Detected',
    description: 'The agent saw your started CCFF application',
  },
  {
    id: 'step-scope',
    label: 'What CCFF requires',
    shortLabel: 'Requirements',
    description: 'The six items that must be complete before review',
  },
  {
    id: 'step-assemble',
    label: 'Assemble a compliance-complete application',
    shortLabel: 'Assemble',
    description: 'Verify, pull, and pre-fill from authoritative sources',
  },
  {
    id: 'step-submit',
    label: 'Submit & begin payment onboarding',
    shortLabel: 'Submit',
    description: 'Submit for review and start Payoneer onboarding in parallel',
  },
  {
    id: 'step-next',
    label: 'What happens next',
    shortLabel: 'Next steps',
    description: 'Review, payee approval, and your reporting timeline',
  },
]
