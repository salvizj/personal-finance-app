import { useState } from "react"
import { removeNonDigit } from "~/utils/utils"
import Modal from "~/components/ui/Modal"
import Form from "~/components/ui/Form"
import type { FieldConfig, TransactionFilter } from "~/types/types"
import {
	TRANSACTION_EXPENSE_CATEGORIES,
	TRANSACTION_INCOME_CATEGORIES,
	TRANSACTION_TYPES,
} from "~/constants/constants"

type TransactionFilterForm = {
	isOpen: boolean
	onClose: () => void
	onSubmit: (data: TransactionFilter) => void
}

const TransactionFilterForm = ({
	isOpen,
	onClose,
	onSubmit,
}: TransactionFilterForm) => {
	const [type, setType] = useState("")
	const [category, setCategory] = useState("")
	const [minAmount, setMinAmount] = useState("")
	const [maxAmount, setMaxAmount] = useState("")
	const [dateFrom, setDateFrom] = useState("")
	const [dateTill, setDateTill] = useState("")

	const fields: FieldConfig[] = [
		{
			name: "type",
			label: "Type",
			type: "select",
			options: TRANSACTION_TYPES,
			value: type,
			onChange: setType,
		},
		{
			name: "category",
			label: "Category",
			type: "select",
			options: TRANSACTION_INCOME_CATEGORIES.concat(
				TRANSACTION_EXPENSE_CATEGORIES,
			),
			value: category,
			onChange: setCategory,
		},
		{
			name: "minAmount",
			label: "Min Amount",
			type: "text",
			placeholder: "Amount",
			value: minAmount,
			onChange: (v) => setMinAmount(removeNonDigit(v)),
		},
		{
			name: "maxAmount",
			label: "Max Amount",
			type: "text",
			placeholder: "Amount",
			value: maxAmount,
			onChange: (v) => setMaxAmount(removeNonDigit(v)),
		},
		{
			name: "dateFrom",
			label: "Date From",
			type: "date",
			value: dateFrom,
			onChange: setDateFrom,
		},
		{
			name: "dateTo",
			label: "Date To",
			type: "date",
			value: dateTill,
			onChange: setDateTill,
		},
	]

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Filter">
			<Form
				fields={fields}
				onSubmit={() =>
					onSubmit({ type, category, minAmount, maxAmount, dateFrom, dateTill })
				}
				submitLabel="Filter"
			/>
		</Modal>
	)
}

export default TransactionFilterForm
