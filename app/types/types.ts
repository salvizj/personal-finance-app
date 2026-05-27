import {
	CATEGORIES,
	TYPES,
} from "./../features/transactions/constants/constants"

export type Theme = "light" | "dark"
export type Column<T> = {
	header: string
	key: keyof T
}
export type Category = (typeof CATEGORIES)[number]
export type Type = (typeof TYPES)[number]

export type FilterData = {
	type?: Type | ""
	category?: Category | ""
	minAmount?: string
	maxAmount?: string
	search?: string
}
export type Variant =
	| "primary"
	| "secondary"
	| "accent"
	| "outline"
	| "ghost"
	| "danger"
