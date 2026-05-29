import type {
	TRANSACTION_CATEGORIES,
	TRANSACTION_TYPES,
} from "~/constants/constants"

export type Theme = "light" | "dark"
export type Column<T> = {
	header: string
	key: keyof T
}
export type TransactionCategory = (typeof TRANSACTION_CATEGORIES)[number]
export type TransactionType = (typeof TRANSACTION_TYPES)[number]

export type TransactionFilter = {
	type?: TransactionType | ""
	category?: TransactionCategory | ""
	minAmount?: string
	maxAmount?: string
	dateFrom?: string
	dateTill?: string
	search?: string
}

export type Variant =
	| "primary"
	| "secondary"
	| "accent"
	| "outline"
	| "ghost"
	| "danger"

export type FieldConfig = {
	name: string
	label: string
	type: "text" | "number" | "select" | "date"
	placeholder?: string
	options?: string[]
	value: string
	required?: boolean
	error?: string
	onChange: (value: string) => void
}

export type Action = {
	label: string
	onClick: () => void
	variant?: "primary" | "outline" | "danger"
}

export type GoalFilter = {
	name?: string
	minTargetAmount?: string
	maxTargetAmount?: string
	dateFrom?: string
	dateTill?: string
}
