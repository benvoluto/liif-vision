'use client'

import { useState } from 'react'
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined'
import { FlowShell } from '@/components/flow/FlowShell'
import { AgentMessage } from '@/components/flow/AgentMessage'
import { ScopeBadge } from '@/components/flow/ScopeBadge'
import { ActionCard } from '@/components/flow/ActionCard'
import { DryRunPreview } from '@/components/flow/DryRunPreview'
import { AuditTrail, type AuditEntry } from '@/components/flow/AuditTrail'
import { UndoBar } from '@/components/flow/UndoBar'
import { ConfidenceChip } from '@/components/trust/ConfidenceChip'
import { handoffSteps, monitoringSteps } from '@/lib/flows/paymentReadiness'
import { confirmPayee, complianceHandoff, monitoringCadence } from '@/lib/ontology/actions'

const complianceItems = [
  { label: 'Child care license — active', source: 'CA Community Care Licensing', when: '2026-06-12' },
  { label: 'SAM.gov — not excluded', source: 'SAM.gov exclusions (PDF saved)', when: '2026-06-12' },
  { label: 'OFAC — clear', source: 'OFAC SDN search (PDF saved)', when: '2026-06-12' },
  { label: 'W-9 — name & TIN match', source: 'IRS TIN match', when: '2026-06-10' },
  { label: 'Use-of-funds budget — complete', source: 'Project Proposal template', when: '2026-06-13' },
  { label: 'Executed grant agreement', source: 'RightSignature RS-CCFF-26-0418', when: '2026-05-30' },
]

const initiatedAudit: AuditEntry[] = [
  { timestamp: '2026-06-19 11:02:10', actor: 'Tasha Brooks (Program Officer)', action: 'Payee approved', detail: 'Penny-drop confirmed; Payoneer registration matches W-9.' },
  { timestamp: '2026-06-19 11:02:14', actor: 'Tasha Brooks (Program Officer)', action: 'Cost centers confirmed', detail: 'CCFF-SF-FY26 · Fund 21 SF DEC passthrough.' },
  { timestamp: '2026-06-19 11:02:15', actor: 'LIIF Grant Agent', action: 'Payment request initiated → Finance', detail: 'Compliance-complete package attached (6/6 verified at source).' },
  { timestamp: '2026-06-19 11:02:15', actor: 'LIIF Grant Agent', action: 'Time-to-payment clock started', detail: 'Owner: Finance release authorization. SLA target surfaced.' },
]

export default function PaymentReadinessPage() {
  const [handedOff, setHandedOff] = useState(false)

  return (
    <>
      <FlowShell
        title="Payment Readiness & Monitoring"
        persona="Tasha Brooks · Program Officer, CCFF"
        backHref="/program/tasha-brooks"
        tabs={[
          {
            id: 'handoff',
            label: 'A · Compliance-complete handoff',
            steps: handoffSteps,
            renderStep: (stepId, next) => {
              switch (stepId) {
                case 'step-observe':
                  return (
                    <div className="space-y-4">
                      <ScopeBadge label="PR-CCFF-0461 · Sunrise FCC · $48,500" />
                      <AgentMessage>
                        <p>
                          <strong>Sunrise FCC is payment-ready.</strong> The agreement is executed,
                          the cost center is confirmed, and every compliance item is verified at
                          source. One item — payee approval — is yours to confirm.
                        </p>
                        <p className="mt-2 text-sm text-ink-muted">
                          Today this package would be re-checked by Finance. The fix isn&apos;t to
                          drop a control — it&apos;s to hand Finance something it can trust.
                        </p>
                      </AgentMessage>
                    </div>
                  )

                case 'step-provenance':
                  return (
                    <div className="space-y-4">
                      <AgentMessage>
                        <p>Here is every item with its source and verification date — the provenance Finance can rely on.</p>
                      </AgentMessage>
                      <div className="bg-surface border border-border rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50 border-b border-border">
                            <tr>
                              {['Compliance item', 'Source', 'Verified'].map((h) => (
                                <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider text-ink-muted">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {complianceItems.map((c) => (
                              <tr key={c.label} className="hover:bg-bg transition-colors">
                                <td className="px-4 py-2.5 text-ink flex items-center gap-2">
                                  <CheckCircleOutlined className="text-green-600" sx={{ fontSize: 16 }} />
                                  {c.label}
                                </td>
                                <td className="px-4 py-2.5 text-ink-muted">{c.source}</td>
                                <td className="px-4 py-2.5 text-ink-muted">{c.when}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <ConfidenceChip confidence={93} note="High · Every item carries a source and timestamp. This is the package Finance receives." />
                    </div>
                  )

                case 'step-payee':
                  return (
                    <div className="space-y-4">
                      <AgentMessage>
                        <p>Payee approval is the Program team&apos;s to own. Run the $7 penny-drop and confirm the Payoneer name matches the W-9.</p>
                      </AgentMessage>
                      <ActionCard action={confirmPayee} onExecute={next} />
                    </div>
                  )

                case 'step-handoff':
                  return (
                    <div className="space-y-4">
                      <AgentMessage>
                        <p>Now hand Finance a package it can rely on. Review what changes about Finance&apos;s job below.</p>
                      </AgentMessage>
                      <ActionCard action={complianceHandoff} onExecute={() => { setHandedOff(true); next() }} />
                      {complianceHandoff.dryRun && <DryRunPreview data={complianceHandoff.dryRun} />}
                    </div>
                  )

                case 'step-initiated':
                  return (
                    <div className="space-y-4">
                      <AgentMessage>
                        <p>Payment request initiated and routed to Finance for release authorization. Audit trail below.</p>
                      </AgentMessage>
                      <AuditTrail entries={initiatedAudit} />
                      <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-sm text-green-900">
                        <p className="font-semibold mb-1">What Finance does now</p>
                        <p>Release authorization only — the decision it cannot delegate — instead of repeating the document review. Segregation of duties and the two-tier release are preserved.</p>
                      </div>
                    </div>
                  )

                default:
                  return null
              }
            },
          },
          {
            id: 'monitoring',
            label: 'B · Monitoring & non-compliance',
            steps: monitoringSteps,
            renderStep: (stepId, next) => {
              switch (stepId) {
                case 'step-mon-observe':
                  return (
                    <div className="space-y-4">
                      <ScopeBadge label="CCFF portfolio · 3 grantees" count={3} countUnit="grantees" />
                      <AgentMessage>
                        <p>
                          <strong>Three Use-of-Funds reports are overdue</strong> and one grantee is
                          past the escalation window. The cadence is defined — it&apos;s just run by
                          hand today.
                        </p>
                      </AgentMessage>
                      <div className="bg-surface border border-border rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50 border-b border-border">
                            <tr>
                              {['Grantee', 'Report', 'Days overdue', 'Next step'].map((h) => (
                                <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider text-ink-muted">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {[
                              ['Little Acorns FCC', 'Use-of-Funds', '18', '2-week reminder'],
                              ['Bayview Kids Center', 'Use-of-Funds', '24', 'PO escalation (3 wk)'],
                              ['Mission Kids Co-op', 'Use-of-Funds', '38', 'Default / late notice'],
                            ].map((r) => (
                              <tr key={r[0]} className="hover:bg-bg transition-colors">
                                {r.map((c, i) => <td key={i} className="px-4 py-2.5 text-ink">{c}</td>)}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )

                case 'step-mon-cadence':
                  return (
                    <div className="space-y-4">
                      <AgentMessage>
                        <p>The documented cadence, applied automatically — with a human in the loop before anything consequential sends.</p>
                      </AgentMessage>
                      <div className="space-y-3">
                        {[
                          { t: 'Week 1', d: 'Friendly reminder via Submittable (auto)', tone: 'bg-blue-50 border-blue-200' },
                          { t: 'Week 2', d: 'Second reminder (auto)', tone: 'bg-blue-50 border-blue-200' },
                          { t: 'Week 3', d: 'Escalate to Program Officer — surfaced here, not auto-sent', tone: 'bg-amber-50 border-amber-200' },
                          { t: 'Past window', d: 'Draft default / late notice (certified mail) for PO approval', tone: 'bg-red-50 border-red-200' },
                        ].map((s) => (
                          <div key={s.t} className={`rounded-xl border p-4 ${s.tone}`}>
                            <p className="text-xs font-bold text-ink mb-1">{s.t}</p>
                            <p className="text-sm text-ink-muted leading-relaxed">{s.d}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )

                case 'step-mon-action':
                  return (
                    <div className="space-y-4">
                      <AgentMessage>
                        <p>I&apos;ll queue the reminders and draft the default notice. You review before anything sends.</p>
                      </AgentMessage>
                      <ActionCard action={monitoringCadence} onExecute={next} />
                    </div>
                  )

                default:
                  return null
              }
            },
          },
        ]}
      />
      {handedOff && <UndoBar actionLabel="Sunrise FCC payment request initiated → Finance" />}
    </>
  )
}
