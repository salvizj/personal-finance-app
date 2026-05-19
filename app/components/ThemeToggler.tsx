import type { Theme } from "~/types/types"

type ThemeTogglerProps = {
	theme: Theme
	themeToggle: () => void
}

export const ThemeToggler = ({ theme, themeToggle }: ThemeTogglerProps) => {
	return (
		<div>
			<button onClick={themeToggle} className="px-4 py-2  rounded">
				{theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
			</button>
		</div>
	)
}
