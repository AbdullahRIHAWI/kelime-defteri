import type { Level } from '../interfaces/Word'

const styles: Record<Level, string> = {
  A1: 'bg-sky-100 text-sky-800',
  A2: 'bg-teal-100 text-teal-800',
  B1: 'bg-amber-100 text-amber-800',
  B2: 'bg-orange-100 text-orange-800',
  C1: 'bg-rose-100 text-rose-800',
}

export default function LevelBadge({ level }: { level: Level }) {
  return (
    <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${styles[level]}`}>
      {level}
    </span>
  )
}
