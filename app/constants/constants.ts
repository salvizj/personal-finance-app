export const TRANSACTION_CATEGORIES = [
	// Income
	"salary",
	"freelance",
	"investment",
	// Essentials
	"groceries",
	"housing",
	"utilities",
	"transportation",
	"health",
	// Lifestyle
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
