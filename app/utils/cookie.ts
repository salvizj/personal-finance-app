export const setCookie = (name: string, value: string, days: number) => {
	const expires = new Date(
		Date.now() + days * 24 * 60 * 60 * 1000,
	).toUTCString()
	document.cookie = `${name}=${value}; expires=${expires}; path=/`
}

export const getCookie = (name: string): string | null => {
	const cookies = document.cookie.split("; ")
	for (const cookie of cookies) {
		const [cookieName, cookieValue] = cookie.split("=")
		if (cookieName === name) {
			return cookieValue
		}
	}
	return null
}
