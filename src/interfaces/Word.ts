// Kelime defterindeki bir kaydın veri yapısı

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

export const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1']

export interface Word {
  id: string
  word: string // İngilizce kelime
  meaning: string // Türkçe anlamı
  example: string // Örnek cümle (isteğe bağlı)
  level: Level
  learned: boolean // "Öğrendim" işareti
  createdAt: number // Eklenme zamanı (ms)
}

// Formdan gelen veri: id, learned ve createdAt uygulama tarafından atanır
export type WordInput = Pick<Word, 'word' | 'meaning' | 'example' | 'level'>

export type StatusFilter = 'all' | 'learning' | 'learned'
