import type { Theme } from "~/types/types"
import { ThemeToggler } from "./ThemeToggler"
import {
	ArrowLeft,
	ArrowRight,
	House,
	PiggyBank,
	ReceiptEuro,
	Wallet,
} from "lucide-react"
import { NavLink } from "react-router"
import { useState } from "react"

type SidebarProps = {
	themeToggle: () => void
	theme: Theme
}

const ROUTES = [
	{ path: "/", label: "Dashboard", icon: <House /> },
	{ path: "/transactions", label: "Transactions", icon: <ReceiptEuro /> },
	{ path: "/goals", label: "Budget Goals", icon: <PiggyBank /> },
	{ path: "/reports", label: "Reports", icon: <Wallet /> },
]

export const Sidebar = ({ themeToggle }: SidebarProps) => {
	const [isMinimalToggle, setisMinimalToggle] = useState(false)

	return (
		<>
			<aside
				className={`hidden md:flex flex-col justify-between sticky top-0 h-screen bg-surface-secondary border-r border-border p-6 transition-all duration-300 ${
					isMinimalToggle ? "w-64" : "w-20"
				}`}
			>
				<div>
					<div className="flex flew-row justify-between items-center gap-10">
						{isMinimalToggle && (
							<h2 className="text-lg font-bold text-content text-nowrap overflow-hidden">
								Finance App
							</h2>
						)}
						{isMinimalToggle ? (
							<ArrowLeft
								onClick={() => setisMinimalToggle((prev) => !prev)}
								className="cursor-pointer"
							/>
						) : (
							<ArrowRight
								onClick={() => setisMinimalToggle((prev) => !prev)}
								className="cursor-pointer"
							/>
						)}
					</div>
					<nav className="mt-8">
						<ul className="flex flex-col gap-4 text-nowrap overflow-hidden">
							{ROUTES.map((route) => (
								<li key={route.path}>
									<NavLink
										to={route.path}
										className={({ isActive }) =>
											`flex  gap-4 transition-colors ${
												isActive ? "text-primary" : "text-content-muted"
											}`
										}
									>
										{route.icon}
										{isMinimalToggle && <span>{route.label}</span>}
									</NavLink>
								</li>
							))}
						</ul>
					</nav>
				</div>
				<ThemeToggler themeToggle={themeToggle} />
			</aside>

			<nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around md:hidden bg-surface-secondary border-t border-border py-2">
				{ROUTES.map((route) => (
					<NavLink
						key={route.path}
						to={route.path}
						className={({ isActive }) =>
							`flex flex-col items-center gap-1 px-3 py-1 text-xs ${
								isActive ? "text-primary" : "text-content-muted"
							}`
						}
					>
						{route.icon}
						<span>{route.label}</span>
					</NavLink>
				))}
				<ThemeToggler themeToggle={themeToggle} />
			</nav>
		</>
	)
}
