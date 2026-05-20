import type { Route } from "./+types/goals"

export function meta({}: Route.MetaArgs) {
	return [{ title: "Personal Finance App" }, { name: "", content: "" }]
}

export default function Goals() {
	return <></>
}
