import { removeNonDigit } from "~/utils/utils"
import Modal from "~/components/ui/Modal"
import Form from "~/components/ui/Form"
import type { FieldConfig, GoalFilter } from "~/types/types"
import { useState } from "react"

type GoalFilterFormProps = {
	isOpen: boolean
	onClose: () => void
	onSubmit: (data: GoalFilter) => void
}

const GoalFilterForm = ({ isOpen, onClose, onSubmit }: GoalFilterFormProps) => {
	const [name, setName] = useState("")
	const [minTargetAmount, setMinTargetAmount] = useState("")
	const [maxTargetAmount, setMaxTargetAmount] = useState("")
	const [minSavedAmount, setMinSavedAmount] = useState("")
	const [maxSavedAmount, setMaxSavedAmount] = useState("")
	const [dateFrom, setDeadlineFrom] = useState("")
	const [dateTill, setDeadlineTill] = useState("")

	const fields: FieldConfig[] = [
		{
			name: "name",
			label: "Name",
			type: "text",
			placeholder: "Name",
			value: name,
			onChange: setName,
		},
		{
			name: "minTargetAmount",
			label: "Min Target Amount",
			type: "text",
			placeholder: "Amount",
			value: minTargetAmount,
			onChange: (v) => setMinTargetAmount(removeNonDigit(v)),
		},
		{
			name: "maxTargetAmount",
			label: "Max Target Amount",
			type: "text",
			placeholder: "Amount",
			value: maxTargetAmount,
			onChange: (v) => setMaxTargetAmount(removeNonDigit(v)),
		},
		{
			name: "minSavedAmount",
			label: "Min Saved Amount",
			type: "text",
			placeholder: "Amount",
			value: minSavedAmount,
			onChange: (v) => setMinSavedAmount(removeNonDigit(v)),
		},
		{
			name: "maxSavedAmount",
			label: "Max SAVED Amount",
			type: "text",
			placeholder: "Amount",
			value: maxSavedAmount,
			onChange: (v) => setMaxSavedAmount(removeNonDigit(v)),
		},
		{
			name: "dateFrom",
			label: "Date From",
			type: "date",
			value: dateFrom,
			onChange: setDeadlineFrom,
		},
		{
			name: "dateTill",
			label: "Date Till",
			type: "date",
			value: dateTill,
			onChange: setDeadlineTill,
		},
	]
	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Filter">
			<Form
				fields={fields}
				onSubmit={() =>
					onSubmit({
						name,
						minTargetAmount,
						maxTargetAmount,
						minSavedAmount,
						maxSavedAmount,
						dateFrom,
						dateTill,
					})
				}
				submitLabel="Filter"
			/>
		</Modal>
	)
}

export default GoalFilterForm
