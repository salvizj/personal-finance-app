import { z } from "zod"
import { isSafeString } from "./utils"

const safeString = (message = "Invalid characters detected") =>
	z.string().refine(isSafeString, { message })

export const goalFilterSchema = z.object({
	name: safeString().min(2, "Name must be at least 2 characters").optional(),

	minTargetAmount: z.coerce
		.number()
		.min(1, "Minimum target amount must be at least 1")
		.optional(),
	maxTargetAmount: z.coerce
		.number()
		.min(1, "Maximum target amount must be at least 1")
		.optional(),

	minSavedAmount: z.coerce
		.number()
		.min(1, "Minimum saved amount must be at least 1")
		.optional(),
	maxSavedAmount: z.coerce
		.number()
		.min(1, "Maximum saved amount must be at least 1")
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

export type GoalFilterSchema = z.infer<typeof goalFilterSchema>
