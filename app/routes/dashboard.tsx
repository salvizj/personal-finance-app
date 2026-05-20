import type { Route } from "./+types/dashboard"

export function meta({}: Route.MetaArgs) {
	return [{ title: "Personal Finance App" }, { name: "", content: "" }]
}

export default function Home() {
	return <></>
}
