import { useState } from 'react'
import type { Word } from '../interfaces/Word'
import LevelBadge from './LevelBadge'

interface WordCardProps {
  item: Word
  isEditing: boolean
  onEdit: (item: Word) => void
  onDelete: (id: string) => void
  onToggleLearned: (id: string) => void
}

export default function WordCard({ item, isEditing, onEdit, onDelete, onToggleLearned }: WordCardProps) {
  // Silmeden önce kartın içinde onay sorulur
  const [confirming, setConfirming] = useState(false)

  return (
    <li
      data-testid="word-card"
      className={`rounded-xl border bg-white p-4 shadow-sm transition ${isEditing ? 'border-amber-400' : 'border-stone-200'} ${item.learned ? 'opacity-75' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className={`text-lg font-semibold text-stone-900 ${item.learned ? 'line-through decoration-emerald-600' : ''}`}>
              {item.word}
            </h3>
            <LevelBadge level={item.level} />
            {item.learned && (
              <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                Öğrenildi
              </span>
            )}
          </div>
          <p className="mt-1 text-stone-700">{item.meaning}</p>
          {item.example && <p className="mt-2 text-sm italic text-stone-500">“{item.example}”</p>}
        </div>

        <label className="flex shrink-0 cursor-pointer items-center gap-2 text-sm text-stone-600">
          <input
            type="checkbox"
            checked={item.learned}
            onChange={() => onToggleLearned(item.id)}
            className="h-4 w-4 accent-emerald-700"
          />
          Öğrendim
        </label>
      </div>

      <div className="mt-4 flex justify-end gap-2 border-t border-stone-100 pt-3">
        {confirming ? (
          <>
            <span className="mr-auto self-center text-sm text-rose-700">Silinsin mi?</span>
            <button
              onClick={() => onDelete(item.id)}
              className="rounded-lg bg-rose-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-rose-800"
            >
              Evet, sil
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm text-stone-700 hover:bg-stone-100"
            >
              Vazgeç
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onEdit(item)}
              className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm font-medium text-stone-700 hover:bg-stone-100"
            >
              Düzenle
            </button>
            <button
              onClick={() => setConfirming(true)}
              className="rounded-lg border border-rose-200 px-3 py-1.5 text-sm font-medium text-rose-700 hover:bg-rose-50"
            >
              Sil
            </button>
          </>
        )}
      </div>
    </li>
  )
}
