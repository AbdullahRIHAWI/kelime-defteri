import { useState, type FormEvent } from 'react'
import { LEVELS, type Level, type Word, type WordInput } from '../interfaces/Word'

interface WordFormProps {
  editingWord: Word | null // Doluysa form "güncelleme" modundadır
  onSubmit: (input: WordInput) => void
  onCancelEdit: () => void
}

const empty: WordInput = { word: '', meaning: '', example: '', level: 'A1' }

export default function WordForm({ editingWord, onSubmit, onCancelEdit }: WordFormProps) {
  // Düzenleme modunda form, seçilen kelimenin bilgileriyle başlar.
  // (HomePage, form'a key verdiği için düzenlenen kelime değişince form yeniden oluşturulur.)
  const [form, setForm] = useState<WordInput>(() =>
    editingWord
      ? {
          word: editingWord.word,
          meaning: editingWord.meaning,
          example: editingWord.example,
          level: editingWord.level,
        }
      : empty,
  )
  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.word.trim() || !form.meaning.trim()) {
      setError('Kelime ve anlam alanları boş bırakılamaz.')
      return
    }
    onSubmit({
      word: form.word.trim(),
      meaning: form.meaning.trim(),
      example: form.example.trim(),
      level: form.level,
    })
    setForm(empty)
    setError('')
  }

  const isEditing = editingWord !== null
  const inputClass =
    'w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-stone-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20'

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl border bg-white p-5 shadow-sm ${isEditing ? 'border-amber-400 ring-2 ring-amber-200' : 'border-stone-200'}`}
    >
      <h2 className="mb-4 text-lg font-semibold text-stone-900">
        {isEditing ? `“${editingWord.word}” kelimesini güncelle` : 'Yeni kelime ekle'}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-stone-700">Kelime (İngilizce)</span>
          <input
            name="word"
            className={inputClass}
            value={form.word}
            onChange={(e) => setForm({ ...form, word: e.target.value })}
            placeholder="ör. reliable"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-stone-700">Anlamı (Türkçe)</span>
          <input
            name="meaning"
            className={inputClass}
            value={form.meaning}
            onChange={(e) => setForm({ ...form, meaning: e.target.value })}
            placeholder="ör. güvenilir"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-sm font-medium text-stone-700">
            Örnek cümle <span className="font-normal text-stone-500">(isteğe bağlı)</span>
          </span>
          <input
            name="example"
            className={inputClass}
            value={form.example}
            onChange={(e) => setForm({ ...form, example: e.target.value })}
            placeholder="ör. She is a reliable friend."
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-stone-700">Seviye</span>
          <select
            name="level"
            className={inputClass}
            value={form.level}
            onChange={(e) => setForm({ ...form, level: e.target.value as Level })}
          >
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-end gap-2">
          <button
            type="submit"
            className={`flex-1 rounded-lg px-4 py-2 font-semibold text-white transition ${isEditing ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-700 hover:bg-emerald-800'}`}
          >
            {isEditing ? 'Güncelle' : 'Ekle'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-lg border border-stone-300 px-4 py-2 font-medium text-stone-700 hover:bg-stone-100"
            >
              Vazgeç
            </button>
          )}
        </div>
      </div>

      {error && <p className="mt-3 text-sm font-medium text-rose-700">{error}</p>}
    </form>
  )
}
