import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
	index("routes/dashboard.tsx"),
	route("transactions", "routes/transactions.tsx"),
	route("reports", "routes/reports.tsx"),
	route("goals", "routes/goals.tsx"),
] satisfies RouteConfig
