export const TRANSACTION_INCOME_CATEGORIES = [
	"salary",
	"freelance",
	"investment",
]
export const TRANSACTION_EXPENSE_CATEGORIES = [
	"groceries",
	"housing",
	"utilities",
	"transportation",
	"health",
	"food",
	"entertainment",
	"shopping",
	"subscriptions",
	"travel",
	"education",
	"other",
]

export const TRANSACTION_TYPES = ["income", "expense"]
export const TRANSACTION_TABLE_COLUMNS = [
	"title",
	"type",
	"category",
	"amount",
	"date",
	"note",
] as const
export const GOAL_TABLE_COLUMNS = [
	"name",
	"targetAmount",
	"date",
	"savedAmount",
] as const

export const COLORS = [
	"var(--color-blue-300)",
	"var(--color-orange-300)",
	"var(--color-purple-300)",
	"var(--color-yellow-300)",
	"var(--color-pink-300)",
	"var(--color-teal-300)",
	"var(--color-indigo-300)",
	"var(--color-lime-300)",
	"var(--color-cyan-300)",
	"var(--color-red-300)",
	"var(--color-green-300)",
]
