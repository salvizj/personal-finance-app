export function getTheme(request: Request): "light" | "dark" {
	const cookieHeader = request.headers.get("Cookie") || ""
	const match = cookieHeader.match(/(?:^|; )theme=([^;]*)/)
	return match?.[1] === "dark" ? "dark" : "light"
}
