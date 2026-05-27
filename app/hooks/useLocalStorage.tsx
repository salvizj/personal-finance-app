import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string) {
	const [storedValue, setStoredValue] = useState<T[] | null>(null)

	useEffect(() => {
		try {
			const item = localStorage.getItem(key)
			setStoredValue(item ? (JSON.parse(item) as T[]) : null)
		} catch (error) {
			console.error(error)
		}
	}, [key])

	const setValue = (value: T) => {
		try {
			const updated = [...(storedValue ?? []), value]
			setStoredValue(updated)
			localStorage.setItem(key, JSON.stringify(updated))
		} catch (error) {
			console.error(error)
		}
	}

	const removeValue = () => {
		localStorage.removeItem(key)
		setStoredValue(null)
	}

	return { storedValue, setValue, removeValue }
}
