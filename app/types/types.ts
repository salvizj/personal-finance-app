export type Theme = "light" | "dark"
export type Column<T> = {
	header: string
	key: keyof T
}
