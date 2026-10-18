import { LEVELS, type Level, type StatusFilter } from '../interfaces/Word'

interface FilterBarProps {
  search: string
  level: Level | 'all'
  status: StatusFilter
  onSearch: (v: string) => void
  onLevel: (v: Level | 'all') => void
  onStatus: (v: StatusFilter) => void
}

const selectClass =
  'rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 outline-none focus:border-emerald-600'

export default function FilterBar({ search, level, status, onSearch, onLevel, onStatus }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <input
        type="search"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Kelime veya anlam ara…"
        className={`${selectClass} flex-1`}
      />
      <select value={level} onChange={(e) => onLevel(e.target.value as Level | 'all')} className={selectClass}>
        <option value="all">Tüm seviyeler</option>
        {LEVELS.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>
      <select value={status} onChange={(e) => onStatus(e.target.value as StatusFilter)} className={selectClass}>
        <option value="all">Tümü</option>
        <option value="learning">Öğreniliyor</option>
        <option value="learned">Öğrenildi</option>
      </select>
    </div>
  )
}
