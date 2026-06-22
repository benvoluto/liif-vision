import type { BriefingCardDef, PriorityKind } from '../ontology/types'

// Importance ordering for suggested-action cards (lower rank = more important).
// Urgent work (delays + deadlines) sorts above in-progress work, which sorts
// above opportunities.
export const priorityRank: Record<PriorityKind, number> = {
  high: 0,
  storm: 1,
  process: 2,
  opportunity: 3,
}

// Stable sort by importance — equal priorities keep their authored order.
export function sortByPriority(cards: BriefingCardDef[]): BriefingCardDef[] {
  return [...cards].sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority])
}
