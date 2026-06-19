'use client'

import { useState } from 'react'
import { FlowShell } from '@/components/flow/FlowShell'
import { AgentMessage } from '@/components/flow/AgentMessage'
import { ScopeBadge } from '@/components/flow/ScopeBadge'
import { ActionCard } from '@/components/flow/ActionCard'
import { DryRunPreview } from '@/components/flow/DryRunPreview'
import { AuditTrail, type AuditEntry } from '@/components/flow/AuditTrail'
import { UndoBar } from '@/components/flow/UndoBar'
import { grantApplicationSteps } from '@/lib/flows/grantApplication'
import { assembleApplication, submitApplication } from '@/lib/ontology/actions'

const requirements = [
  { item: 'Child care license — active & in good standing', who: 'Agent verifies (CCLD)', status: 'Can verify now' },
  { item: 'SAM.gov exclusions search', who: 'Agent verifies', status: 'Can verify now' },
  { item: 'OFAC sanctions screen', who: 'Agent verifies', status: 'Can verify now' },
  { item: 'W-9 — name & TIN match', who: 'On file', status: 'Already matched' },
  { item: 'Use-of-funds budget table', who: 'Agent pre-fills from your line items', status: 'Needs your review' },
  { item: 'Payee approval (Payoneer = W-9)', who: 'Program Officer confirms (penny-drop)', status: 'After submit' },
]

const submitAudit: AuditEntry[] = [
  { timestamp: '2026-06-19 10:14:02', actor: 'Maria Delgado', action: 'Application approved & e-signed', detail: 'Compliance-complete: 5 of 6 verified at source. Payee approval to follow.' },
  { timestamp: '2026-06-19 10:14:03', actor: 'LIIF Grant Agent', action: 'Submitted to CCFF FY26 review', detail: 'Salesforce Opportunity updated; routed to Program Officer Tasha Brooks.' },
  { timestamp: '2026-06-19 10:14:05', actor: 'LIIF Grant Agent', action: 'Payoneer onboarding started (parallel)', detail: 'Payee registration opened so funds can move on award — no waiting later.' },
  { timestamp: '2026-06-19 10:14:05', actor: 'LIIF Grant Agent', action: 'Reporting timeline scheduled', detail: 'Use-of-Funds due 6 months after execution; Annual report due 4/30.' },
]

export default function GrantApplicationPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <FlowShell
        title="Grant Application Concierge"
        persona="Maria Delgado · Sunrise Family Child Care"
        backHref="/grantee/maria-delgado"
        tabs={[
          {
            id: 'apply',
            label: 'CCFF FY26 application',
            steps: grantApplicationSteps,
            renderStep: (stepId, next) => {
              switch (stepId) {
                case 'step-signal':
                  return (
                    <div className="space-y-4">
                      <AgentMessage>
                        <p>
                          <strong>I saw you started a CCFF FY26 application.</strong> Let&apos;s
                          finish it so it clears review on the first pass — no bouncing back.
                        </p>
                        <p className="mt-2 text-sm text-ink-muted">
                          Four of the six required items I can verify for you right now from
                          authoritative sources. Two need a moment of your input. Nothing is
                          submitted until you approve and e-sign.
                        </p>
                      </AgentMessage>
                      <div className="bg-surface border border-border rounded-xl p-5">
                        <p className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-3">Application</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                          <Field label="Program" value="CCFF FY26 · City & County of SF" />
                          <Field label="Provider" value="Sunrise Family Child Care" />
                          <Field label="Requested" value="$48,500 · facilities & safety" />
                        </div>
                      </div>
                    </div>
                  )

                case 'step-scope':
                  return (
                    <div className="space-y-4">
                      <ScopeBadge label="Sunrise Family Child Care only" />
                      <AgentMessage>
                        <p>Here is exactly what CCFF requires — and who handles each item.</p>
                      </AgentMessage>
                      <div className="bg-surface border border-border rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50 border-b border-border">
                            <tr>
                              {['Requirement', 'Who', 'Status'].map((h) => (
                                <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider text-ink-muted">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {requirements.map((r) => (
                              <tr key={r.item} className="hover:bg-bg transition-colors">
                                <td className="px-4 py-2.5 text-ink">{r.item}</td>
                                <td className="px-4 py-2.5 text-ink-muted">{r.who}</td>
                                <td className="px-4 py-2.5 text-ink-muted">{r.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-[12px] text-ink-muted">
                        These are the same items Finance re-checks before payment today. Verifying
                        them once, at the source, is what lets the rest of the process trust them.
                      </p>
                    </div>
                  )

                case 'step-assemble':
                  return (
                    <div className="space-y-4">
                      <AgentMessage>
                        <p>I&apos;ll verify, pull, and pre-fill everything I can. Review the dry-run before anything is saved.</p>
                      </AgentMessage>
                      <ActionCard action={assembleApplication} onExecute={next} />
                      {assembleApplication.dryRun && <DryRunPreview data={assembleApplication.dryRun} />}
                    </div>
                  )

                case 'step-submit':
                  return (
                    <div className="space-y-4">
                      <AgentMessage>
                        <p>Your application is compliance-complete. Submit it and I&apos;ll start payment onboarding in parallel.</p>
                      </AgentMessage>
                      <ActionCard action={submitApplication} onExecute={() => { setSubmitted(true); next() }} />
                    </div>
                  )

                case 'step-next':
                  return (
                    <div className="space-y-4">
                      <AgentMessage>
                        <p>Submitted. Here&apos;s what happens next — and what I&apos;ll handle for you.</p>
                      </AgentMessage>
                      <AuditTrail entries={submitAudit} />
                      <div className="bg-surface border border-border rounded-xl p-5 space-y-2 text-sm text-ink">
                        <p className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-1">On your radar</p>
                        <p>· Your Program Officer confirms the payee (Payoneer matches your W-9) — the only remaining item.</p>
                        <p>· Funds move to your Payoneer account on award; onboarding is already underway.</p>
                        <p>· I&apos;ll remind you before your Use-of-Funds report is due and pre-fill it from your receipts.</p>
                      </div>
                    </div>
                  )

                default:
                  return null
              }
            },
          },
        ]}
      />
      {submitted && <UndoBar actionLabel="CCFF FY26 application submitted" />}
    </>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">{label}</p>
      <p className="font-semibold text-ink">{value}</p>
    </div>
  )
}
