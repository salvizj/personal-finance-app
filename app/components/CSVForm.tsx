import Modal from "~/components/ui/Modal"
import Form from "~/components/ui/Form"
import type { FieldConfig } from "~/types/types"
import { useState } from "react"
import { isCsv } from "~/utils/csv"

type CSVFormProps = {
	isOpen: boolean
	onClose: () => void
	onSubmit: (data: File) => void
}

const CSVForm = ({ isOpen, onClose, onSubmit }: CSVFormProps) => {
	const [file, setFile] = useState<File | null>(null)
	const [error, setError] = useState<string>("")

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (file === null) return
    if (!isCsv(file)) {
      setError("File must be with csv file type.")
      return
    }
    setError("")
    onSubmit(file)
  }

		const fields: FieldConfig[] = [
			{
				name: "file",
				label: "CSV",
				type: "file",
				onChange: setFile,
				error: error,
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
