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

type BaseField = {
	name: string
	label: string
	placeholder?: string
	error?: string
}

type TextFieldConfig = BaseField & {
	type: "text" | "email" | "date" | "number"
	value: string
	onChange: (value: string) => void
}

type SelectFieldConfig = BaseField & {
	type: "select"
	options: string[]
	value: string
	onChange: (value: string) => void
}

type FileFieldConfig = BaseField & {
	type: "file"
	onChange: (file: File | null) => void
}

export type FieldConfig = TextFieldConfig | SelectFieldConfig | FileFieldConfig

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
