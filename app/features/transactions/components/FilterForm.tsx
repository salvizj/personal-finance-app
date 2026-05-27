import { useState } from "react"
import Input from "~/components/ui/Input"
import Select from "~/components/ui/Select"
import { CATEGORIES, TYPES } from "../constants/constants"
import { removeNonDigit } from "~/utils/utils"
import Modal from "~/components/ui/Modal"
import type { FilterData } from "~/types/types"
import Button from "~/components/ui/Button"

type FilterFormProps = {
	isOpen: boolean
	onClose: () => void
	onSubmit: (data: FilterData) => void
}

const FilterForm = ({ isOpen, onClose, onSubmit }: FilterFormProps) => {
	const [type, setType] = useState("")
	const [category, setCategory] = useState("")
	const [minAmount, setMinAmount] = useState("")
	const [maxAmount, setMaxAmount] = useState("")

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} title="Filter">
				<form
					className="flex flex-col gap-4"
					onSubmit={(e) => {
						e.preventDefault()
						onSubmit({ type, category, minAmount, maxAmount })
					}}
				>
					<Select
						placeholder="Type"
						options={TYPES}
						label={"Type"}
						value={type}
						onChange={(e) => setType(e.target.value)}
					/>

					<Select
						placeholder="Category"
						options={CATEGORIES}
						label={"Category"}
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					/>

					<Input
						label={"minAmount"}
						type={"text"}
						placeholder={"amount"}
						value={minAmount}
						onChange={(e) => setMinAmount(removeNonDigit(e.target.value))}
					/>

					<Input
						label={"maxAmount"}
						type={"text"}
						placeholder={"amount"}
						value={maxAmount}
						onChange={(e) => setMaxAmount(removeNonDigit(e.target.value))}
					/>
					<Button type="submit">Filter</Button>
				</form>
			</Modal>
		</>
	)
}
export default FilterForm
