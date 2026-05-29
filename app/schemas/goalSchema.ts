import { z } from "zod"
import { isSafeString } from "./utils"

const safeString = (message = "Invalid characters detected") =>
	z.string().refine(isSafeString, { message })

export const goalSchema = z.object({
	name: safeString().min(2, "Name must be at least 2 characters"),

	targetAmount: z.coerce.number().min(1, "Target amount must be at least 1"),

	date: safeString()
		.min(1, "Date is required")
		.refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
	savedAmount: z.coerce.number(),
})

export type GoalSchema = z.infer<typeof goalSchema>
