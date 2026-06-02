import Input from "~/components/ui/Input"
import Select from "~/components/ui/Select"
import Button from "~/components/ui/Button"
import type { FieldConfig } from "~/types/types"

type FormProps = {
	fields: FieldConfig[]
	onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
	submitLabel?: string
}

const Form = ({ fields, onSubmit, submitLabel = "Submit" }: FormProps) => {
	return (
		<form
			className="flex flex-col gap-4"
			onSubmit={(e) => {
				e.preventDefault()
				onSubmit(e)
			}}
		>
			{fields.map((field) => {
				if (field.type === "select") {
					return (
						<Select
							key={field.name}
							label={field.label}
							placeholder={field.placeholder ?? ""}
							options={field.options ?? []}
							value={field.value}
							onChange={(e) => field.onChange(e.target.value)}
							error={field.error}
						/>
					)
				}
				return (
					<Input
						key={field.name}
						label={field.label}
						type={field.type}
						placeholder={field.placeholder ?? ""}
						value={field.value}
						onChange={(e) => field.onChange(e.target.value)}
						error={field.error}
					/>
				)
			})}
			<Button type="submit">{submitLabel}</Button>
		</form>
	)
}

export default Form
