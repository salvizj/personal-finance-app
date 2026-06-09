import type { Route } from "./+types/goals"
import ConfirmDialog from "~/components/ConfirmDialog"
import Table from "~/components/ui/Table"
import Actions from "~/components/Actions"
import SearchInput from "~/components/SearchInput"
import { useState } from "react"
import { useLocalStorage } from "~/hooks/useLocalStorage"
import type { GoalSchema } from "~/schemas/goalSchema"
import { GOAL_TABLE_COLUMNS } from "~/constants/constants"
import { ModalType } from "~/types/types"
import { useFilter } from "~/hooks/useFilter"
import GoalForm from "~/features/goals/components/GoalForm"
import GoalFilterForm from "~/features/goals/components/GoalFilterForm"
import CustomAmountForm from "~/features/goals/components/CustomAmountForm"
import Button from "~/components/ui/Button"
import { handleCSVDownload } from "~/utils/csv"
import ProgressBar from "~/components/ProgressBar"
import type { GoalFilterSchema } from "~/schemas/goalFilterSchema"

export function meta({}: Route.MetaArgs) {
	return [{ title: "Personal Finance App" }, { name: "", content: "" }]
}

export default function Goals() {
	const [openModal, setOpenModal] = useState<ModalType | null>(null)

	const [editingGoal, setEdittingGoal] = useState<GoalSchema | null>(null)
	const [deletingGoal, setDeletingGoal] = useState<GoalSchema | null>(null)
	const [customAmountRow, setCustomAmountRow] = useState<GoalSchema | null>(
		null,
	)

	const { storedValue, setValue, deleteValue, updateValue } =
		useLocalStorage<GoalSchema>("goals")

	const { filteredData, setFilters, setSearch, search } = useFilter({
		data: storedValue,
		filter: [
			{ param: "name", match: (t, v) => t.name === v },
			{
				param: "minTargetAmount",
				match: (t, v) => t.targetAmount >= Number(v),
			},
			{
				param: "maxTargetAmount",
				match: (t, v) => t.targetAmount <= Number(v),
			},
			{
				param: "minSavedAmount",
				match: (t, v) => t.savedAmount >= Number(v),
			},
			{
				param: "maxSavedAmount",
				match: (t, v) => t.savedAmount <= Number(v),
			},
			{ param: "dateFrom", match: (t, v) => new Date(t.date) >= new Date(v) },
			{ param: "dateTill", match: (t, v) => new Date(t.date) <= new Date(v) },
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

		setOpenModal(null)
	}

	const handleGoalDeletion = () => {
		if (openModal === ModalType.Confirm && deletingGoal != null) {
			deleteValue(deletingGoal)
		}
	}

	const handleFilterFormSubmit = (data: GoalFilterSchema) => {
		setOpenModal(null)
		setFilters(data)
	}

	const initiateDeleteGoal = (row: GoalSchema) => {
		setOpenModal(ModalType.Confirm)
		setDeletingGoal(row)
	}

	const initiateEditGoal = (row: GoalSchema) => {
		setOpenModal(ModalType.GoalForm)
		setEdittingGoal(row)
	}

	const handleAddSavings = (row: GoalSchema, amount: number) => {
		updateValue({ ...row, savedAmount: row.savedAmount + amount }, row)
	}

	const initiateCustomAmount = (row: GoalSchema) => {
		setCustomAmountRow(row)
		setOpenModal(ModalType.CustomAmountForm)
	}

	const handleCustomAmountSubmit = (amount: number) => {
		if (customAmountRow) {
			handleAddSavings(customAmountRow, amount)
		}
		setCustomAmountRow(null)
		setOpenModal(null)
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
							onClick: () => setOpenModal(ModalType.FilterForm),
						},
						{
							label: "Clear Filters",
							variant: "outline",
							onClick: () => setFilters(null),
						},
						{
							label: "Add Goals",
							onClick: () => setOpenModal(ModalType.GoalForm),
						},
					]}
				/>
				<SearchInput search={search} setSearch={setSearch} />
			</div>
			<div className="flex justify-end mb-4">
				<Button
					variant="outline"
					onClick={() => handleCSVDownload(filteredData ?? [], "goals.csv")}
				>
					Export CSV
				</Button>
			</div>
			<GoalForm
				isOpen={openModal === ModalType.GoalForm}
				onClose={() => {
					;(setOpenModal(null), setEdittingGoal(null))
				}}
				onSubmit={handleGoalFormSubmit}
				editGoalData={editingGoal}
			/>
			<GoalFilterForm
				isOpen={openModal === ModalType.FilterForm}
				onClose={() => setOpenModal(null)}
				onSubmit={handleFilterFormSubmit}
			/>
			<CustomAmountForm
				isOpen={openModal === ModalType.CustomAmountForm}
				onClose={() => setOpenModal(null)}
				onSubmit={handleCustomAmountSubmit}
			/>
			<ConfirmDialog
				isOpen={openModal === ModalType.Confirm}
				onClose={() => setOpenModal(null)}
				onConfirm={handleGoalDeletion}
				message="This transaction will be permanently deleted."
			/>
			<Table
				data={filteredData ?? []}
				columns={GOAL_TABLE_COLUMNS}
				customColumns={[
					{
						key: "progress",
						label: "Progress",
						render: (row) => (
							<div style={{ width: 67, height: 67 }}>
								<ProgressBar
									value={row.savedAmount}
									maxValue={row.targetAmount}
								/>
							</div>
						),
					},
				]}
				actions={[
					{
						label: "+5€",
						onClick: (row) => handleAddSavings(row, 5),
						variant: "outline",
					},
					{
						label: "+10€",
						onClick: (row) => handleAddSavings(row, 10),
						variant: "outline",
					},
					{
						label: "+100€",
						onClick: (row) => handleAddSavings(row, 100),
						variant: "outline",
					},
					{
						label: "+custom",
						onClick: (row) => initiateCustomAmount(row),
						variant: "outline",
					},
					{
						label: "Edit",
						onClick: (row) => initiateEditGoal(row),
					},
					{
						label: "Delete",
						onClick: (row) => initiateDeleteGoal(row),
						variant: "danger",
					},
				]}
				noDataText="No goals set yet. Start by creating a new goal!"
			/>
		</>
	)
}
