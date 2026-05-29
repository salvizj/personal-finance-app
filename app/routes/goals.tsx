import type { Route } from "./+types/goals"
import ConfirmDialog from "~/components/ConfirmDialog"
import Table from "~/components/ui/Table"
import Actions from "~/components/Actions"
import SearchInput from "~/components/SearchInput"
import { useState } from "react"
import { useLocalStorage } from "~/hooks/useLocalStorage"
import type { GoalSchema } from "~/schemas/goalSchema"
import { GOAL_TABLE_COLUMNS } from "~/constants/constants"
import type { GoalFilter } from "~/types/types"
import { useFilter } from "~/hooks/useFilter"
import GoalForm from "~/features/goals/components/GoalForm"
import GoalFilterForm from "~/features/goals/components/GoalFilterForm"

export function meta({}: Route.MetaArgs) {
	return [{ title: "Personal Finance App" }, { name: "", content: "" }]
}

export default function Goals() {
	const [iSGoalFormOpen, setIsGoalFormOpen] = useState(false)
	const [IsFilterFormIsOpen, setIsFilterFormIsOpen] = useState(false)
	const [IsConfirmOpen, setIsConfirmOpen] = useState(false)

	const [editingGoal, setEdittingGoal] = useState<GoalSchema | null>(null)
	const [deletingGoal, setDeletingGoal] = useState<GoalSchema | null>(null)

	const { storedValue, setValue, deleteValue, updateValue } =
		useLocalStorage<GoalSchema>("goals")

	const { filteredData, setFilters, setSearch, search } = useFilter({
		data: storedValue,
		filter: [
			{ param: "name", match: (t, v) => t.name === v },
			{ param: "target-amount", match: (t, v) => t.targetAmount >= Number(v) },
			{
				param: "search",
				match: (t, v) => t.name.toLowerCase().includes(v.toLowerCase()),
			},
		],
	})

	const handleGoalFormSubmit = (data: GoalSchema) => {
		if (editingGoal != null) {
			updateValue(data, editingGoal)
		} else {
			setValue(data)
		}

		setIsGoalFormOpen(false)
	}

	const handleGoalDeletion = () => {
		if (IsConfirmOpen && editingGoal != null) {
			deleteValue(editingGoal)
		}
	}

	const handleFilterFormSubmit = (data: GoalFilter) => {
		setIsFilterFormIsOpen(false)
		setFilters(data)
	}

	const initiateDeleteGoal = (row: GoalSchema) => {
		setIsConfirmOpen(true)
		setDeletingGoal(row)
	}

	const initiateEditGoal = (row: GoalSchema) => {
		setIsGoalFormOpen(true)
		setEdittingGoal(row)
	}

	return (
		<>
			<div className="flex justify-between mb-8 flex-col md:flex-row gap-4">
				<h1 className="text-xl font-semibold">Goals</h1>
				<Actions
					actions={[
						{
							label: "Filter",
							variant: "outline",
							onClick: () => setIsFilterFormIsOpen(true),
						},
						{
							label: "Clear Filters",
							variant: "outline",
							onClick: () => setFilters(null),
						},
						{
							label: "Add Goals",
							onClick: () => setIsGoalFormOpen(true),
						},
					]}
				/>
				<SearchInput search={search} setSearch={setSearch} />
			</div>
			<GoalForm
				isOpen={iSGoalFormOpen}
				onClose={() => setIsGoalFormOpen(false)}
				onSubmit={handleGoalFormSubmit}
				editGoalData={editingGoal}
			/>
			<GoalFilterForm
				isOpen={IsFilterFormIsOpen}
				onClose={() => setIsFilterFormIsOpen(false)}
				onSubmit={handleFilterFormSubmit}
			/>
			<ConfirmDialog
				isOpen={IsConfirmOpen}
				onClose={() => setIsConfirmOpen(false)}
				onConfirm={handleGoalDeletion}
				message="This transaction will be permanently deleted."
			/>
			<Table
				data={filteredData ?? []}
				columns={GOAL_TABLE_COLUMNS}
				actions={[
					{ label: "Edit", onClick: (row) => initiateEditGoal(row) },
					{
						label: "Delete",
						onClick: (row) => initiateDeleteGoal(row),
						variant: "danger",
					},
				]}
				noDataText="No goals set yet."
			/>
		</>
	)
}
