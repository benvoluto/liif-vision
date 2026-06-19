import type {
  Person,
  Funder,
  Program,
  Provider,
  ComplianceItem,
  Application,
  GrantAgreement,
  PaymentRequest,
  GrantReport,
  DelegationOfAuthority,
} from './types'

// ─────────────────────────────────────────────────────────────────────────────
// Mock instance of the LIIF grant ontology.
//
// Institutions, programs, and systems are real (CCFF / City & County of San
// Francisco, SHINE / Harris County, Alameda, Sonoma, CDSS; Submittable,
// Salesforce, RightSignature, Payoneer, MIP). People are fictional, grounded in
// LIIF's documented roles and delegation of authority so the flows ring true.
// All figures are illustrative for a prototype — no live data.
// ─────────────────────────────────────────────────────────────────────────────

// ── Personas ──────────────────────────────────────────────────────────────────

export const maria: Person = {
  id: 'person-maria-delgado',
  legalName: 'Maria Delgado',
  preferredName: 'Maria',
  photo: '/avatars/maria.svg',
  pronouns: 'she/her',
  title: 'Owner & Director',
  organization: 'Sunrise Family Child Care',
  email: 'maria@sunrisefcc.org',
}

export const tasha: Person = {
  id: 'person-tasha-brooks',
  legalName: 'Tasha Brooks',
  preferredName: 'Tasha',
  photo: '/avatars/tasha.svg',
  pronouns: 'she/her',
  title: 'Program Officer',
  organization: 'Child Care Facilities Fund · LIIF',
  email: 'tbrooks@liifund.org',
}

export const david: Person = {
  id: 'person-david-okafor',
  legalName: 'David Okafor',
  preferredName: 'David',
  photo: '/avatars/david.svg',
  pronouns: 'he/him',
  title: 'Controller · Grants Finance',
  organization: 'Low Income Investment Fund',
  email: 'dokafor@liifund.org',
}

// ── Funders ─────────────────────────────────────────────────────────────────

export const ccsf: Funder = {
  id: 'funder-ccsf',
  name: 'City & County of San Francisco (Dept. of Early Childhood)',
  kind: 'government',
  programIds: ['program-ccff'],
}

export const harrisCounty: Funder = {
  id: 'funder-harris',
  name: 'Harris County / LiftFund',
  kind: 'government',
  programIds: ['program-shine'],
}

// ── Programs ──────────────────────────────────────────────────────────────────

export const ccff: Program = {
  id: 'program-ccff',
  name: 'Child Care Facilities Fund',
  shortName: 'CCFF',
  funderId: 'funder-ccsf',
  providerFocus: 'Family Child Care & Centers, San Francisco',
  paymentStructure: 'single',
  costCenter: 'CCFF-SF-FY26',
  fund: 'Fund 21 · SF DEC passthrough',
  deployedToDate: 3_517_891,
  deploymentTarget: 12_000_000,
  fiscalYear: 'FY26',
}

export const shine: Program = {
  id: 'program-shine',
  name: 'SHINE (Harris County child care facilities)',
  shortName: 'SHINE',
  funderId: 'funder-harris',
  providerFocus: 'Family Child Care & Centers, Harris County TX',
  paymentStructure: 'milestone',
  costCenter: 'SHINE-HC-FY26',
  fund: 'Fund 44 · Federal advance',
  deployedToDate: 6_518_976,
  deploymentTarget: 4_265_000,
  fiscalYear: 'FY26',
}

// ── Providers ──────────────────────────────────────────────────────────────────

export const sunriseFCC: Provider = {
  id: 'provider-sunrise-fcc',
  orgName: 'Sunrise Family Child Care',
  contactName: 'Maria Delgado',
  type: 'Family Child Care',
  city: 'San Francisco',
  state: 'CA',
  licenseNumber: '384012345',
  ein: '87-1029384',
  relationshipSince: 'FY24',
  priorGrantsClosed: 2,
}

// ── Delegation of Authority (the controls the CFO will not give up) ────────────

export const releaseDelegation: DelegationOfAuthority = {
  id: 'doa-payment-release',
  label: 'LIIF Delegation of Authority — payment release',
  releaseFirstApprover: 'Controller / Assistant Controller (all payments)',
  releaseSecondApproverThreshold: 15_000,
  releaseSecondApprover: 'CFO (CEO or General Counsel as backup)',
  segregationRule:
    'The reviewer who initiates a payment request may never be an approver of its release. Two distinct approvers are required for any payment over $15,000.',
}

// ── Compliance items (for Sunrise FCC's CCFF FY26 application) ─────────────────

export const sunriseCompliance: ComplianceItem[] = [
  {
    id: 'ci-license',
    kind: 'license',
    label: 'Child care license — active & in good standing',
    status: 'verified',
    source: 'CA Community Care Licensing (CCLD) lookup',
    verifiedAt: '2026-06-12',
  },
  {
    id: 'ci-sam',
    kind: 'sam',
    label: 'SAM.gov entity — not excluded',
    status: 'verified',
    source: 'SAM.gov exclusions search (PDF saved)',
    verifiedAt: '2026-06-12',
  },
  {
    id: 'ci-ofac',
    kind: 'ofac',
    label: 'OFAC sanctions screen — clear',
    status: 'verified',
    source: 'OFAC SDN search (PDF saved)',
    verifiedAt: '2026-06-12',
  },
  {
    id: 'ci-w9',
    kind: 'w9',
    label: 'W-9 on file — name & TIN match',
    status: 'verified',
    source: 'Submittable upload · IRS TIN match',
    verifiedAt: '2026-06-10',
  },
  {
    id: 'ci-budget',
    kind: 'budget',
    label: 'Use-of-funds budget table — complete',
    status: 'verified',
    source: 'Project Proposal template (auto-filled)',
    verifiedAt: '2026-06-13',
  },
  {
    id: 'ci-payee',
    kind: 'payee',
    label: 'Payee approval — Payoneer name matches W-9 (penny-drop)',
    status: 'pending',
    source: 'Payoneer registration · $7 penny-drop scheduled',
  },
]

// ── Application, agreement, payment request, reports ───────────────────────────

export const sunriseApplication: Application = {
  id: 'app-sunrise-ccff-fy26',
  providerId: 'provider-sunrise-fcc',
  programId: 'program-ccff',
  status: 'compliance-complete',
  requestedAmount: 48_500,
  complianceItemIds: sunriseCompliance.map((c) => c.id),
}

export const sunriseAgreement: GrantAgreement = {
  id: 'agr-sunrise-ccff-fy26',
  applicationId: 'app-sunrise-ccff-fy26',
  amount: 48_500,
  termMonths: 12,
  signedByDelegate: 'Deputy Director (delegate per DoA, ≤ $500K)',
  rightSignatureRef: 'RS-CCFF-26-0418',
  executedAt: '2026-05-30',
}

export const sunrisePayment: PaymentRequest = {
  id: 'pr-sunrise-ccff-0461',
  agreementId: 'agr-sunrise-ccff-fy26',
  amount: 48_500,
  costCenter: 'CCFF-SF-FY26',
  channel: 'payoneer',
  status: 'stalled',
  initiatedAt: '2026-04-02',
  ageDays: 78,
}

export const sunriseReports: GrantReport[] = [
  {
    id: 'rep-sunrise-uof',
    agreementId: 'agr-sunrise-ccff-fy26',
    kind: 'use-of-funds',
    dueDate: '2026-11-30',
    status: 'not-due',
  },
  {
    id: 'rep-sunrise-annual',
    agreementId: 'agr-sunrise-ccff-fy26',
    kind: 'annual',
    dueDate: '2027-04-30',
    status: 'not-due',
  },
]

// The legacy point-tool stack the ontology replaces.
export const legacyStack = [
  { name: 'Submittable', role: 'Application intake & review routing' },
  { name: 'Salesforce', role: 'Opportunity, compliance items, lifecycle' },
  { name: 'RightSignature', role: 'Grant-agreement e-signature' },
  { name: 'Payoneer', role: 'Grantee disbursement' },
  { name: 'MIP (Sage)', role: 'Fund accounting & GL' },
  { name: 'Concur', role: 'Legacy invoicing (being retired)' },
  { name: 'Asana', role: 'Pipeline tracking' },
]
