import { useState } from "react"
import Form from "~/components/ui/Form"
import type { FieldConfig } from "~/types/types"
import Modal from "~/components/ui/Modal"
import { isSafeString } from "~/schemas/utils"
import { removeNonDigit } from "~/utils/utils"

type GoalsFormProps = {
	isOpen: boolean
	onClose: () => void
	onSubmit: (amount: number) => void
}

const AddToSavedAmount = ({ isOpen, onClose, onSubmit }: GoalsFormProps) => {
	const [addToSavedAmount, setAddToSavedAmount] = useState("")
	const [validationErrors, setValidationErrors] = useState<
		Record<string, string>
	>({})

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!isSafeString(addToSavedAmount)) {
			setValidationErrors({ addToSavedAmount: "Invalid input detected" })
			return
		}

		const parsed = parseFloat(addToSavedAmount)

		if (isNaN(parsed) || parsed <= 0) {
			setValidationErrors({
				addToSavedAmount: "Please enter a valid amount greater than 0",
			})
			return
		}

		setValidationErrors({})
		onSubmit(parsed)
	}

	const fields: FieldConfig[] = [
		{
			name: "Custom Amount",
			label: "Custom Amount",
			type: "text",
			placeholder: "Custom Amount",
			value: addToSavedAmount,
			onChange: (v) => setAddToSavedAmount(removeNonDigit(v)),
			error: validationErrors.title,
		},
	]

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Add Custom Amount">
			<Form
				fields={fields}
				onSubmit={handleSubmit}
				submitLabel={"Add To Saved total"}
			/>
		</Modal>
	)
}
export default AddToSavedAmount
