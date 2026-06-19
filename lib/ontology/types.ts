// ─────────────────────────────────────────────────────────────────────────────
// LIIF grant ontology — the typed object graph the agent reasons against.
// The graph is the noun. Every surface and every flow is a view over these
// objects. Nothing here is flattened into spreadsheet rows.
// ─────────────────────────────────────────────────────────────────────────────

// ── People & personas ────────────────────────────────────────────────────────

export type Person = {
  id: string
  legalName: string
  preferredName: string
  photo: string
  pronouns?: string
  title: string
  organization: string
  email?: string
}

// ── Funders & programs ────────────────────────────────────────────────────────

export type FunderKind = 'government' | 'philanthropy'

export type Funder = {
  id: string
  name: string
  kind: FunderKind
  programIds: string[]
}

export type PaymentStructure = 'single' | 'tranche' | 'milestone'

export type Program = {
  id: string
  name: string
  shortName: string
  funderId: string
  providerFocus: string
  paymentStructure: PaymentStructure
  costCenter: string
  fund: string
  deployedToDate: number
  deploymentTarget: number
  fiscalYear: string
}

// ── Providers (applicants / grantees) ─────────────────────────────────────────

export type ProviderType = 'Family Child Care' | 'Child Care Center'

export type Provider = {
  id: string
  orgName: string
  contactName: string
  type: ProviderType
  city: string
  state: string
  licenseNumber: string
  ein: string
  relationshipSince: string
  priorGrantsClosed: number
}

// ── Compliance, agreements, payments ──────────────────────────────────────────

export type ComplianceKind =
  | 'license'
  | 'sam'
  | 'ofac'
  | 'w9'
  | 'budget'
  | 'insurance'
  | 'agreement'
  | 'payee'

export type ComplianceStatus = 'verified' | 'pending' | 'missing'

export type ComplianceItem = {
  id: string
  kind: ComplianceKind
  label: string
  status: ComplianceStatus
  source: string
  verifiedAt?: string
}

export type Application = {
  id: string
  providerId: string
  programId: string
  status: string
  requestedAmount: number
  complianceItemIds: string[]
}

export type GrantAgreement = {
  id: string
  applicationId: string
  amount: number
  termMonths: number
  signedByDelegate?: string
  rightSignatureRef?: string
  executedAt?: string
}

export type PaymentChannel = 'payoneer' | 'wire'

export type PaymentRequestStatus =
  | 'initiated'
  | 'compliance-complete'
  | 'pending-release'
  | 'stalled'
  | 'released'
  | 'disbursed'

export type PaymentRequest = {
  id: string
  agreementId: string
  amount: number
  costCenter: string
  channel: PaymentChannel
  status: PaymentRequestStatus
  initiatedAt?: string
  ageDays?: number
}

export type ReportKind = 'use-of-funds' | 'annual'

export type GrantReport = {
  id: string
  agreementId: string
  kind: ReportKind
  dueDate: string
  status: 'not-due' | 'due' | 'overdue' | 'submitted' | 'approved'
}

// ── Governance ────────────────────────────────────────────────────────────────

export type DelegationOfAuthority = {
  id: string
  label: string
  releaseFirstApprover: string
  releaseSecondApproverThreshold: number
  releaseSecondApprover: string
  segregationRule: string
}

// ── Events ────────────────────────────────────────────────────────────────────

export type EventKind =
  | 'application-submitted'
  | 'agreement-executed'
  | 'payment-stalled'
  | 'misroute'
  | 'noncompliance'
  | 'new-program'
  | 'disbursed'

export type Event = {
  id: string
  kind: EventKind
  title: string
  occurredAt: string
  affects: OntologyRef[]
  provenance: string
  status: 'active' | 'pending' | 'resolved'
  description: string
}

// ── Reference chips (rendered in Explain → "What I looked at") ─────────────────

export type OntologyRefKind =
  | 'Funder'
  | 'Program'
  | 'Provider'
  | 'Application'
  | 'Agreement'
  | 'Award'
  | 'PaymentRequest'
  | 'Disbursement'
  | 'ComplianceItem'
  | 'Report'
  | 'Event'
  | 'Policy'
  | 'System'

export type OntologyRef = {
  kind: OntologyRefKind
  id: string
  label: string
}

// ── Actions (typed, scoped, previewable, reversible) ──────────────────────────

export type ActionScope = {
  label: string
  count?: number
  countUnit?: string
  description: string
}

export type DryRunLine = {
  field: string
  before: string
  after: string
}

export type DryRunTable = {
  columns: string[]
  rows: string[][]
  summary?: string
}

export type DryRunData = {
  lines?: DryRunLine[]
  table?: DryRunTable
  impact?: string
  note?: string
}

export type Action = {
  id: string
  kind: string
  label: string
  scope: ActionScope
  preview: string
  confidence: number
  confidenceNote: string
  requiredApprovals: string[]
  // policy / program-rule / compliance references rendered as chips on the card
  policyRefs: OntologyRef[]
  dryRun?: DryRunData
}

// ── Home-surface card types ───────────────────────────────────────────────────

export type PriorityKind = 'high' | 'process' | 'opportunity' | 'storm'

export type CardSource = {
  label: string
  kind: OntologyRefKind
  id: string
}

export type ExplainContent = {
  whySurfaced: string
  whatLooked: OntologyRef[]
  confidence: number
  confidenceNote: string
  willDo: string
  wontDo: string
}

export type BriefingCardDef = {
  id: string
  icon: string
  title: string
  context: string
  priority: PriorityKind
  priorityLabel: string
  ctaLabel: string
  ctaHref?: string
  secondaryAction?: { label: string; href?: string }
  sources: CardSource[]
  explain: ExplainContent
}

export type QuickAction = {
  id: string
  label: string
  icon: string
  href?: string
}

export type InProgressItem = {
  id: string
  label: string
  detail: string
  status: string
  ctaLabel: string
  ctaHref?: string
}

export type SurfaceKind = 'grantee' | 'program' | 'finance'

export type PersonaSurface = {
  persona: Person
  metaLines: string[]
  badges: string[]
  cards: BriefingCardDef[]
  quickActions: QuickAction[]
  inProgress: InProgressItem[]
  surfaceKind: SurfaceKind
  accentColor: string
}
