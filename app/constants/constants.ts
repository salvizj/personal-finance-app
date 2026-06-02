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
