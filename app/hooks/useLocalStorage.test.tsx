import { renderHook, act } from "@testing-library/react"
import { describe, it, expect, beforeEach } from "vitest"
import { useLocalStorage } from "./useLocalStorage"

type Cat = { color: string; age: number; name: string }

const puss: Cat = { color: "orange", age: 4, name: "puss in boots" }

describe("useLocalStorage", () => {
	beforeEach(() => {
		localStorage.clear()
	})

	it("reads existing data from localStorage on mount", () => {
		localStorage.setItem("cats", JSON.stringify([puss]))

		const { result } = renderHook(() => useLocalStorage<Cat>("cats"))

		expect(result.current.storedValue).toEqual([puss])
	})

	it("setValue", () => {
		const { result } = renderHook(() => useLocalStorage<Cat>("cats"))

		act(() => {
			result.current.setValue(puss)
		})

		expect(result.current.storedValue).toEqual([puss])
		expect(JSON.parse(localStorage.getItem("cats")!)).toEqual([puss])
	})

	it("updateValue", () => {
		localStorage.setItem("cats", JSON.stringify([puss]))
		const { result } = renderHook(() => useLocalStorage<Cat>("cats"))

		const olderPuss: Cat = { ...puss, age: 5 }
		act(() => {
			result.current.updateValue(olderPuss, puss)
		})

		expect(result.current.storedValue).toEqual([olderPuss])
	})

	it("deleteValue", () => {
		localStorage.setItem("cats", JSON.stringify([puss]))
		const { result } = renderHook(() => useLocalStorage<Cat>("cats"))

		act(() => {
			result.current.deleteValue(puss)
		})

		expect(result.current.storedValue).toEqual([])
		expect(localStorage.getItem("cats")).toBe("[]")
	})
})
