'use client'

import { useState } from 'react'
import { CheckIcon as Check, XIcon as X } from '@phosphor-icons/react/dist/ssr'
import { FlowShell } from '@/components/flow/FlowShell'
import { AgentMessage } from '@/components/flow/AgentMessage'
import { ScopeBadge } from '@/components/flow/ScopeBadge'
import { ActionCard } from '@/components/flow/ActionCard'
import { DryRunPreview } from '@/components/flow/DryRunPreview'
import { AuditTrail, type AuditEntry } from '@/components/flow/AuditTrail'
import { UndoBar } from '@/components/flow/UndoBar'
import { ConfidenceChip } from '@/components/trust/ConfidenceChip'
import { paymentReleaseSteps } from '@/lib/flows/paymentRelease'
import { previewAgedQueue, executeQueueRelease } from '@/lib/ontology/actions'

const executionAudit: AuditEntry[] = [
  { timestamp: '2026-06-19 14:08:00', actor: 'David Okafor (Controller)', action: 'Batch release authorized', detail: 'First approver. 11 payments within delegated authority.' },
  { timestamp: '2026-06-19 14:08:02', actor: 'LIIF Grant Agent', action: 'Segregation of duties checked', detail: 'No initiator approving their own request. 0 conflicts.' },
  { timestamp: '2026-06-19 14:08:09', actor: 'LIIF Grant Agent', action: '11 payments released — $387,500', detail: 'Wires queued to Payoneer; "Payoneer Funded" labels confirmed on receipt.' },
  { timestamp: '2026-06-19 14:08:10', actor: 'LIIF Grant Agent', action: '3 exceptions routed to CFO', detail: 'Payments over $15,000 packaged with full handoff for the second signature.' },
  { timestamp: '2026-06-19 14:08:11', actor: 'LIIF Grant Agent', action: 'Salesforce + MIP updated', detail: 'Project/Payment records written; Batch MIP upload generated for the GL.' },
  { timestamp: '2026-06-19 14:08:11', actor: 'LIIF Grant Agent', action: 'Audit trail sealed', detail: 'Each release carries its compliance package, approver, and timestamp.' },
]

export default function PaymentReleasePage() {
  const [executed, setExecuted] = useState(false)

  return (
    <>
      <FlowShell
        title="Payment Release"
        persona="David Okafor · Controller, Grants Finance"
        backHref="/finance/david-okafor"
        tabs={[{
          id: 'release',
          label: 'Aged-payment queue',
          steps: paymentReleaseSteps,
          renderStep: (stepId, next) => {
            switch (stepId) {
              case 'step-ingest':
                return (
                  <div className="space-y-4">
                    <AgentMessage>
                      <p><strong>PR-CCFF-0461 has been stuck for 78 days.</strong> I traced why.</p>
                      <p className="mt-2">
                        A reviewer was reassigned in Submittable, which silently moved the
                        submission backward and erased the prior review. On the re-run it was
                        mis-routed and bounced between reviewers. Nothing was wrong with the
                        payment — no one owned the clock.
                      </p>
                    </AgentMessage>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">Why this is the pattern, not the exception</p>
                      <p className="text-sm text-amber-800 leading-relaxed">
                        Grant operations run on seven point tools — Submittable, Salesforce,
                        RightSignature, Payoneer, MIP, Concur, Asana — stitched together by manual
                        re-keying. Routing can move items backward, reviews get re-queued, and
                        time-to-payment runs one to two months, with no owner.
                        This is one of fourteen payments aging right now.
                      </p>
                    </div>
                    <div className="bg-surface border border-border rounded-xl p-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-3">This payment</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <Field label="Reference" value="PR-CCFF-0461" />
                        <Field label="Grantee / amount" value="Sunrise FCC · $48,500" />
                        <Field label="Age" value="78 days in Payment Pending" />
                      </div>
                    </div>
                  </div>
                )

              case 'step-scope':
                return (
                  <div className="space-y-4">
                    <ScopeBadge label="CCFF FY26 · payments aging > 30 days" count={14} countUnit="payments" />
                    <AgentMessage>
                      <p>I pulled every CCFF payment aging past 30 days, with its root cause. $612,400 is held up.</p>
                    </AgentMessage>
                    <div className="bg-surface border border-border rounded-xl overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-border">
                          <tr>
                            {['Root cause', 'Count', 'Value', 'Median age'].map((h) => (
                              <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider text-ink-muted">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {[
                            ['Submittable backward move / re-route', '6', '$214,800', '61 days'],
                            ['Duplicate review re-queue', '4', '$163,500', '44 days'],
                            ['Under $15K · single approver', '1', '$9,200', '33 days'],
                            ['Over $15K · second signer due', '3', '$224,900', '52 days'],
                          ].map((r) => (
                            <tr key={r[0]} className="hover:bg-bg transition-colors">
                              {r.map((c, i) => <td key={i} className="px-4 py-2.5 text-ink">{c}</td>)}
                            </tr>
                          ))}
                          <tr className="bg-gray-50 font-bold border-t-2 border-border">
                            <td className="px-4 py-2.5 text-ink">Total</td>
                            <td className="px-4 py-2.5 text-ink">14</td>
                            <td className="px-4 py-2.5 text-ink">$612,400</td>
                            <td className="px-4 py-2.5 text-ink">51 days</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )

              case 'step-reasoning':
                return (
                  <div className="space-y-4">
                    <AgentMessage>
                      <p>Before releasing anything, here is the controls reasoning — the part your auditors will read.</p>
                    </AgentMessage>
                    <div className="space-y-3">
                      {[
                        { ref: 'Delegation of Authority', reasoning: 'The Controller (or Assistant Controller) is the first approver on every payment. Payments over $15,000 require a second approver — the CFO, with CEO or General Counsel as backup. This is enforced by the action, not by memory.', color: 'amber' },
                        { ref: 'Segregation of duties', reasoning: 'The reviewer who initiated a payment request can never approve its release. The agent checks initiator ≠ approver on every release and refuses the conflict.', color: 'blue' },
                        { ref: 'Compliance-complete handoff', reasoning: 'Each payment arrives with a source-verified package (license, SAM.gov, OFAC, W-9, executed agreement, payee). Finance relies on it instead of repeating the program team\'s review.', color: 'green' },
                        { ref: 'Fund availability & coding', reasoning: 'Cost center and fund availability are confirmed against the program ledger before release. Federal-advance programs check remaining advance first.', color: 'purple' },
                      ].map((item) => (
                        <div key={item.ref} className={`rounded-xl border p-4 ${
                          item.color === 'amber' ? 'bg-amber-50 border-amber-200' :
                          item.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                          item.color === 'green' ? 'bg-green-50 border-green-200' :
                          'bg-purple-50 border-purple-200'
                        }`}>
                          <p className="text-xs font-bold text-ink mb-1">{item.ref}</p>
                          <p className="text-sm text-ink-muted leading-relaxed">{item.reasoning}</p>
                        </div>
                      ))}
                    </div>
                    <ConfidenceChip confidence={94} note="High · The controls are explicit in the Delegation of Authority. The agent enforces them; it does not interpret them away." />
                  </div>
                )

              case 'step-calculate':
                return (
                  <div className="space-y-4">
                    <AgentMessage>
                      <p>Full queue scored by disposition. Nothing moves yet. Eleven are releasable now; three genuinely need the CFO.</p>
                    </AgentMessage>
                    <ActionCard action={previewAgedQueue} onExecute={next} />
                    {previewAgedQueue.dryRun && <DryRunPreview data={previewAgedQueue.dryRun} />}
                  </div>
                )

              case 'step-execute':
                return (
                  <div className="space-y-4">
                    <AgentMessage>
                      <p>Authorize the 11 within your authority; the 3 exceptions route to the CFO with their packages. Each writes its own audit entry.</p>
                    </AgentMessage>
                    <ActionCard action={executeQueueRelease} onExecute={() => { setExecuted(true); next() }} />
                    {executed && <AuditTrail entries={executionAudit} />}
                    {executed && (
                      <button
                        onClick={next}
                        className="w-full py-3 rounded-xl bg-priority-high text-surface text-sm font-semibold hover:opacity-90 transition-opacity"
                      >
                        See before &amp; after →
                      </button>
                    )}
                  </div>
                )

              case 'step-compare':
                return (
                  <div className="space-y-6">
                    <div className="text-center py-6">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-ink-muted mb-2">The difference</p>
                      <h2 className="text-3xl font-bold text-ink mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                        1–2 months → 1 week
                      </h2>
                      <p className="text-ink-muted text-sm">Same payments. Same controls. Different architecture.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-3">
                          Today — seven point tools, stitched by hand
                        </p>
                        <ul className="space-y-2.5 text-sm text-red-900">
                          {[
                            'Submittable can move a submission backward and erase reviews',
                            'A reassignment mis-routes a payment with no owner of the clock',
                            'Finance re-checks documents the program team already vetted',
                            'Wires batch once a week, adding more delay',
                            'Records re-keyed across Salesforce, MIP, Payoneer by hand',
                            'No shared time-to-payment target; one to two months',
                            'Audit trail reconstructed manually after the fact',
                            'Median age of this cohort: 51 days',
                          ].map((item) => (
                            <li key={item} className="flex gap-2">
                              <X className="text-red-400 flex-shrink-0 mt-0.5" size={18} weight="bold" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-green-600 mb-3">
                          An agentic platform — one graph, mediated action
                        </p>
                        <ul className="space-y-2.5 text-sm text-green-900">
                          {[
                            'Payment is a typed object; routing can\'t silently revert it',
                            'Compliance-complete handoff relied upon, not re-verified',
                            'Two-tier release & segregation of duties enforced in the action',
                            '11 of 14 cleared now; 3 routed to the CFO automatically',
                            'Salesforce, MIP, Payoneer updated from one source — no re-keying',
                            'Time-to-payment instrumented with an owner and a target',
                            'Audit trail generated automatically, package attached',
                            'This cohort: released the same week',
                          ].map((item) => (
                            <li key={item} className="flex gap-2">
                              <Check className="text-green-600 flex-shrink-0 mt-0.5" size={18} weight="bold" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-ink text-surface rounded-2xl p-6">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-surface/60 mb-3">Why the difference</p>
                      <p className="text-sm leading-relaxed text-surface/90">
                        Today the operating model is scattered across seven tools that don&apos;t agree on
                        what a Grant, a Provider, a Payment, or a Compliance Item is — so the work is held
                        together by people re-keying between them, and any handoff can stall silently.
                      </p>
                      <p className="text-sm leading-relaxed text-surface/90 mt-3">
                        This architecture separates the <strong className="text-surface">graph</strong> (the
                        grant ontology) from the <strong className="text-surface">action</strong> (governed agent
                        reasoning over it). The finance and accounting controls — two-tier release,
                        segregation of duties, audit-readiness — live <em>inside</em> the action. Speed comes from
                        removing duplicate work and silent stalls, not from removing controls.
                      </p>
                      <div className="mt-4 pt-4 border-t border-surface/20 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <Stat value="$612K" label="cleared from the aged queue" />
                        <Stat value="11 of 14" label="released within authority" />
                        <Stat value="same week" label="vs. a 51-day median" />
                      </div>
                    </div>

                    <div className="bg-surface border border-border rounded-2xl p-6">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted mb-2">The bigger picture</p>
                      <p className="text-sm text-ink leading-relaxed">
                        LIIF has deployed about <strong>$30.5M of a $94.4M FY26 target</strong> with roughly
                        three-quarters of the year elapsed. Demand and awards are in place; the binding
                        constraint is how fast compliant payments clear. Faster, governed disbursement is the
                        most direct lever LIIF has on dollars reaching children.
                      </p>
                    </div>
                  </div>
                )

              default:
                return null
            }
          },
        }]}
      />
      {executed && <UndoBar actionLabel="11 payments released · 3 routed to CFO" />}
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

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-bold text-surface">{value}</p>
      <p className="text-xs text-surface/60">{label}</p>
    </div>
  )
}
