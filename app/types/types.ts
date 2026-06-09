import type {
	TRANSACTION_INCOME_CATEGORIES,
	TRANSACTION_EXPENSE_CATEGORIES,
	TRANSACTION_TYPES,
} from "~/constants/constants"

export type Theme = "light" | "dark"
export type Column<T> = {
	header: string
	key: keyof T
}
export type TransactionCategory =
	| (typeof TRANSACTION_INCOME_CATEGORIES)[number]
	| (typeof TRANSACTION_EXPENSE_CATEGORIES)[number]
export type TransactionType = (typeof TRANSACTION_TYPES)[number]

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
	error?: string
	onChange: (value: string) => void
}

export type Action = {
	label: string
	onClick: () => void
	variant?: "primary" | "outline" | "danger"
}

export enum ModalType {
	GoalForm = "goalForm",
	FilterForm = "filterForm",
	Confirm = "confirm",
	CustomAmountForm = "customAmountForm",
}
