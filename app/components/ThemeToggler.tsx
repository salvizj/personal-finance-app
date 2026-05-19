import { SunMoon } from "lucide-react"
import type { Theme } from "~/types/types"

type ThemeTogglerProps = {
	themeToggle: () => void
}

export const ThemeToggler = ({ themeToggle }: ThemeTogglerProps) => {
	return (
		<button
			onClick={themeToggle}
			className="rounded cursor-pointer hover:underline"
		>
			<SunMoon />
		</button>
	)
}
