import type { Theme } from "~/types/types"
import { ThemeToggler } from "./ThemeToggler"
import { useEffect, useState } from "react"
import { House, PiggyBank, ReceiptEuro, Wallet } from "lucide-react"
import { NavLink } from "react-router"

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

export const Sidebar = ({ themeToggle, theme }: SidebarProps) => {
	return (
		<>
			<aside className="hidden md:flex flex-col justify-between w-64 h-screen fixed bg-surface-secondary border-r border-border p-6">
				<div>
					<h2 className="text-lg font-bold text-content">Finance App</h2>
					<nav className="mt-8">
						<ul className="space-y-2">
							{ROUTES.map((route) => (
								<li key={route.path}>
									<NavLink
										to={route.path}
										className={({ isActive }) =>
											`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
												isActive ? "bg-primary" : " hover:bg-surface-elevated"
											}`
										}
									>
										{route.icon}
										<span>{route.label}</span>
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
			</nav>
		</>
	)
}
