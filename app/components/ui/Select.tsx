type Option = {
	value: string
	label: string
}

type SelectProps = {
	label: string
	error?: string
	options: Option[]
	placeholder: string
	value: string | number
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({
	label,
	error,
	options,
	placeholder,
	value,
	onChange,
}: SelectProps) => {
	const id = `select-${label}`
	return (
		<div className="flex flex-col gap-1">
			{label && (
				<label
					htmlFor={id}
					className="text-sm font-medium text-content-secondary"
				>
					{label}
				</label>
			)}
			<select
				id={id}
				className={`
          px-3 py-2 rounded-md border bg-surface-elevated text-content
          focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors cursor-pointer
          ${error ? "border-error" : "border-border"}
        `}
				value={value}
				onChange={onChange}
			>
				{placeholder && (
					<option value="" disabled>
						{placeholder}
					</option>
				)}
				{options.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
			{error && <span className="text-xs text-error">{error}</span>}
		</div>
	)
}
export default Select
