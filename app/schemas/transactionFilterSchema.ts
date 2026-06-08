import { z } from "zod"
import { isSafeString } from "./utils"

const safeString = (message = "Invalid characters detected") =>
	z.string().refine(isSafeString, { message })

export const transactionFilterSchema = z.object({
	type: z
		.enum(["income", "expense"], {
			message: "Type must be income or expense",
		})
		.optional(),

	category: safeString().min(1, "Category is required").optional(),

	minAmount: z.coerce
		.number()
		.min(1, "Minimum transaction amount must be at least 1")
		.optional(),
	maxAmount: z.coerce
		.number()
		.min(1, "Maximum transaction amount must be at least 1")
		.optional(),

	dateFrom: safeString()
		.min(1, "Date is required")
		.refine((val) => !isNaN(Date.parse(val)), "Invalid date")
		.optional(),

	dateTill: safeString()
		.min(1, "Date is required")
		.refine((val) => !isNaN(Date.parse(val)), "Invalid date")
		.optional(),
})

export type TransactionFilterSchema = z.infer<typeof transactionFilterSchema>
