import type { Word } from '../interfaces/Word'

export default function StatsBar({ words }: { words: Word[] }) {
  const total = words.length
  const learned = words.filter((w) => w.learned).length
  const percent = total === 0 ? 0 : Math.round((learned / total) * 100)

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-medium text-stone-600">İlerleme</p>
        <p className="text-sm text-stone-600">
          <span data-testid="learned-count" className="font-semibold text-stone-900">{learned}</span> / {total} kelime öğrenildi
        </p>
      </div>
      <div
        className="mt-3 h-2.5 overflow-hidden rounded-full bg-stone-200"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-2 text-right text-xs font-semibold text-emerald-800">%{percent}</p>
    </div>
  )
}
