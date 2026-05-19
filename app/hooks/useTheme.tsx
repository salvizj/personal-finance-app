import { useEffect, useState } from "react"
import { getCookie, setCookie } from "~/utils/cookie"

type Theme = "light" | "dark"

const toggleDocumentClass = (theme: Theme) => {
	if (theme === "dark") {
		document.documentElement.classList.add("dark")
	} else {
		document.documentElement.classList.remove("dark")
	}
}

export const useTheme = (initialTheme: Theme) => {
	const [theme, setTheme] = useState<Theme>(initialTheme)

	useEffect(() => {
		toggleDocumentClass(theme)
		setCookie("theme", theme, 365)
	}, [theme])

	const themeToggle = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"))
	}

	return { theme, themeToggle }
}
