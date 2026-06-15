import { renderHook, act } from "@testing-library/react"
import { describe, it, expect, beforeEach, vi } from "vitest"
import { useTheme } from "./useTheme"
import { setCookie } from "~/utils/cookie"

vi.mock("~/utils/cookie", () => ({
	setCookie: vi.fn(),
}))

describe("useTheme", () => {
	beforeEach(() => {
		document.documentElement.classList.remove("dark")
		vi.clearAllMocks()
	})

	it("applies the initial theme on mount", () => {
		renderHook(() => useTheme("dark"))
		expect(document.documentElement.classList.contains("dark")).toBe(true)
		expect(setCookie).toHaveBeenCalledWith("theme", "dark", 365)
	})

	it("toggles the theme, updates the class and sets the cookie accordingly", () => {
		const { result } = renderHook(() => useTheme("light"))

		act(() => {
			result.current.themeToggle()
		})

		expect(result.current.theme).toBe("dark")
		expect(document.documentElement.classList.contains("dark")).toBe(true)
		expect(setCookie).toHaveBeenCalledWith("theme", "dark", 365)

		act(() => {
			result.current.themeToggle()
		})

		expect(result.current.theme).toBe("light")
		expect(document.documentElement.classList.contains("dark")).toBe(false)
		expect(setCookie).toHaveBeenCalledWith("theme", "light", 365)
	})
})
