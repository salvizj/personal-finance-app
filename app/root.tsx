import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from "react-router"

import type { Route } from "./+types/root"
import "./app.css"
import { Sidebar } from "./components/Sidebar"
import { Footer } from "./components/Footer"
import { useTheme } from "./hooks/useTheme"
import { getTheme } from "./lib/theme.server"

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
]

export function loader({ request }: Route.LoaderArgs) {
	const theme = getTheme(request)
	return { theme }
}

export function Layout({ children }: { children: React.ReactNode }) {
	const theme = useLoaderData<typeof loader>()?.theme ?? "light"

	return (
		<html lang="en" className={theme === "dark" ? "dark" : ""}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export default function App() {
	const initialTheme = useLoaderData<typeof loader>()?.theme ?? "light"
	const { theme, themeToggle } = useTheme(initialTheme)

	return (
		<div className="min-h-screen bg-surface text-content flex flex-col">
			<div className="flex grow">
				<Sidebar theme={theme} themeToggle={themeToggle} />
				<main className="grow px-6 pt-10">
					<Outlet />
				</main>
			</div>
			<Footer />
		</div>
	)
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!"
	let details = "An unexpected error occurred."
	let stack: string | undefined

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error"
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message
		stack = error.stack
	}

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	)
}
