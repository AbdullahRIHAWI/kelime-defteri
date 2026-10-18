import { useEffect, useState } from 'react'

// State'i tarayıcının LocalStorage alanında saklayan küçük bir hook.
// Sayfa yenilense de veriler kaybolmaz.
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? (JSON.parse(saved) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Gizli sekme vb. durumlarda yazma başarısız olabilir; uygulama çalışmaya devam eder.
    }
  }, [key, value])

  return [value, setValue] as const
}
