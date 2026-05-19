import type { Theme } from "~/types/types"
import { ThemeToggler } from "./themeToggler"

type SidebarProps = {
	themeToggle: () => void
	theme: Theme
}

const ROUTES = [
	{ path: "/", label: "Dashboard" },
	{ path: "/transactions", label: "Transactions" },
	{ path: "/goals", label: "Budget Goals" },
	{ path: "/reports", label: "Reports" },
]

export const Sidebar = ({ themeToggle, theme }: SidebarProps) => {
	return (
		<div className="w-64  p-4">
			<h2 className="text-xl font-bold mb-4">Personal Finance App</h2>
			<ThemeToggler theme={theme} themeToggle={themeToggle} />
			<nav>
				<ul className="mt-4 space-y-2">
					{ROUTES.map((route) => (
						<li key={route.path}>
							<a href={route.path} className="">
								{route.label}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</div>
	)
}
