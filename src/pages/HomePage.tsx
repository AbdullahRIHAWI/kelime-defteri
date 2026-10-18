import { useMemo, useState } from 'react'
import FilterBar from '../components/FilterBar'
import StatsBar from '../components/StatsBar'
import WordCard from '../components/WordCard'
import WordForm from '../components/WordForm'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { Level, StatusFilter, Word, WordInput } from '../interfaces/Word'

// İlk açılışta listenin boş görünmemesi için örnek kelimeler
const sampleWords: Word[] = [
  { id: 's1', word: 'reliable', meaning: 'güvenilir', example: 'She is a reliable friend.', level: 'B1', learned: true, createdAt: 1 },
  { id: 's2', word: 'improve', meaning: 'geliştirmek, iyileştirmek', example: 'I want to improve my English.', level: 'A2', learned: false, createdAt: 2 },
  { id: 's3', word: 'thorough', meaning: 'ayrıntılı, titiz', example: 'The report was very thorough.', level: 'C1', learned: false, createdAt: 3 },
]

function newId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const tr = (s: string) => s.toLocaleLowerCase('tr')

export default function HomePage() {
  const [words, setWords] = useLocalStorage<Word[]>('kelime-defteri:words', sampleWords)
  const [editingWord, setEditingWord] = useState<Word | null>(null)
  const [search, setSearch] = useState('')
  const [level, setLevel] = useState<Level | 'all'>('all')
  const [status, setStatus] = useState<StatusFilter>('all')

  // EKLE veya GÜNCELLE
  function handleSubmit(input: WordInput) {
    if (editingWord) {
      setWords(words.map((w) => (w.id === editingWord.id ? { ...w, ...input } : w)))
      setEditingWord(null)
    } else {
      setWords([{ ...input, id: newId(), learned: false, createdAt: Date.now() }, ...words])
    }
  }

  // SİL
  function handleDelete(id: string) {
    setWords(words.filter((w) => w.id !== id))
    if (editingWord?.id === id) setEditingWord(null)
  }

  // GÜNCELLE (öğrendim işareti)
  function handleToggleLearned(id: string) {
    setWords(words.map((w) => (w.id === id ? { ...w, learned: !w.learned } : w)))
  }

  function handleEdit(item: Word) {
    setEditingWord(item)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // LİSTELE: arama + filtre, en yeni kelime en üstte
  const visibleWords = useMemo(() => {
    const q = tr(search.trim())
    return [...words]
      .sort((a, b) => b.createdAt - a.createdAt)
      .filter((w) => (q ? tr(w.word).includes(q) || tr(w.meaning).includes(q) : true))
      .filter((w) => (level === 'all' ? true : w.level === level))
      .filter((w) => (status === 'all' ? true : status === 'learned' ? w.learned : !w.learned))
  }, [words, search, level, status])

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">İngilizce · Türkçe</p>
          <h1 className="mt-1 text-3xl font-bold text-stone-900">Kelime Defteri</h1>
          <p className="mt-1 text-stone-600">Öğrendiğin kelimeleri kaydet, düzenle ve ilerlemeni takip et.</p>
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6">
        <WordForm
          key={editingWord?.id ?? 'yeni'}
          editingWord={editingWord} onSubmit={handleSubmit} onCancelEdit={() => setEditingWord(null)} />
        <StatsBar words={words} />

        <section className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-stone-900">Kelimelerim</h2>
            <p className="text-sm text-stone-600">{visibleWords.length} kayıt gösteriliyor</p>
          </div>
          <FilterBar
            search={search}
            level={level}
            status={status}
            onSearch={setSearch}
            onLevel={setLevel}
            onStatus={setStatus}
          />

          {visibleWords.length === 0 ? (
            <p className="rounded-xl border border-dashed border-stone-300 bg-white p-8 text-center text-stone-600">
              {words.length === 0 ? 'Henüz kelime yok. Yukarıdaki formdan ilk kelimeni ekle.' : 'Aramana uyan kelime bulunamadı.'}
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {visibleWords.map((w) => (
                <WordCard
                  key={w.id}
                  item={w}
                  isEditing={editingWord?.id === w.id}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleLearned={handleToggleLearned}
                />
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="pb-8 text-center text-xs text-stone-500">
        Veriler tarayıcının LocalStorage alanında saklanır · Abdullah Rihawi
      </footer>
    </div>
  )
}
