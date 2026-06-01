import { SunMoon } from "lucide-react"
import Button from "./ui/Button"

type ThemeTogglerProps = {
	themeToggle: () => void
}

export const ThemeToggler = ({ themeToggle }: ThemeTogglerProps) => {
	return (
		<Button
			onClick={themeToggle}
			variant="ghost"
			noPadding={true}
			noFocus={true}
			className="text-content-muted"
		>
			<SunMoon />
		</Button>
	)
}
