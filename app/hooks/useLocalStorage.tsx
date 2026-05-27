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
	const updateValue = (value: T, oldValue: T) => {
		try {
			const updated = (storedValue ?? []).map((item) =>
				JSON.stringify(item) === JSON.stringify(oldValue) ? value : item,
			)
			setStoredValue(updated)
			localStorage.setItem(key, JSON.stringify(updated))
		} catch (error) {
			console.error(error)
		}
	}

	const deleteValue = (value: T) => {
		try {
			const deleted = (storedValue ?? []).filter(
				(item) => JSON.stringify(item) !== JSON.stringify(value),
			)
			setStoredValue(deleted)
			localStorage.setItem(key, JSON.stringify(deleted))
		} catch (error) {
			console.error(error)
		}
	}

	return { storedValue, setValue, deleteValue, updateValue }
}
