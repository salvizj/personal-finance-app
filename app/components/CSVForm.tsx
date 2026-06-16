import Modal from "~/components/ui/Modal"
import Form from "~/components/ui/Form"
import type { FieldConfig } from "~/types/types"
import { useState } from "react"

type CSVFormProps = {
	isOpen: boolean
	onClose: () => void
	onSubmit: (data: File) => void
}

const CSVForm = ({ isOpen, onClose, onSubmit }: CSVFormProps) => {
	const [file, setFile] = useState<File | null>(null)

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (file != null) {
			onSubmit(file)
		}
	}

	const fields: FieldConfig[] = [
		{
			name: "file",
			label: "CSV",
			type: "file",
			onChange: setFile,
		},
	]

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Import transaction from CSV"
		>
			<Form fields={fields} onSubmit={handleSubmit} submitLabel={"Import"} />
		</Modal>
	)
}
export default CSVForm
