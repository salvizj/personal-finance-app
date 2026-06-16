type InputProps = {
	label?: string
	error?: string
	type: string
	placeholder: string
	required?: boolean
	value?: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({
	label,
	error,
	type,
	placeholder,
	required = false,
	value,
	onChange,
}: InputProps) => {
	const id = `input-${label}`
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
			<input
				id={id}
				type={type}
				className={`
          px-3 py-2 rounded-md border bg-surface-elevated text-content
          placeholder:text-content-muted
          focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors
          ${error ? "border-error" : "border-border"}
        `}
				placeholder={placeholder}
				required={required}
				value={value}
				onChange={onChange}
			/>
			{error && <span className="text-xs text-error">{error}</span>}
		</div>
	)
}
export default Input
