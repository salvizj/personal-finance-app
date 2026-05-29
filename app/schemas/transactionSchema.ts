import { z } from "zod"
import { isSafeString } from "./utils"

const safeString = (message = "Invalid characters detected") =>
	z.string().refine(isSafeString, { message })

export const transactionSchema = z.object({
	title: safeString().min(2, "Title must be at least 2 characters"),

	amount: z.coerce.number().min(1, "Amount must be at least 1"),

	type: z.enum(["income", "expense"], {
		message: "Type must be income or expense",
	}),

	category: safeString().min(1, "Category is required"),

	date: safeString()
		.min(1, "Date is required")
		.refine((val) => !isNaN(Date.parse(val)), "Invalid date"),

	note: safeString().optional(),
})

export type TransactionSchema = z.infer<typeof transactionSchema>
