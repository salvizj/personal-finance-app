import type { ReactNode } from "react"
import type { Variant } from "~/types/types"

type ButtonProps = {
	variant?: Variant
	children?: ReactNode
	type?: "button" | "submit"
	onClick?: () => void
	noPadding?: boolean
	noFocus?: boolean
}

const variantClasses = {
	primary:
		"bg-[var(--color-primary)] text-white border border-[var(--color-primary)] hover:bg-[var(--color-primary-light)] hover:border-[var(--color-primary-light)] ",
	secondary:
		"bg-[var(--color-secondary)] text-white border border-[var(--color-secondary)] hover:opacity-90",
	accent:
		"bg-[var(--color-accent)] text-[var(--color-content)] border border-[var(--color-accent)] hover:opacity-90",
	outline:
		"bg-transparent text-[var(--color-content)] border border-[var(--color-border)] hover:bg-[var(--color-surface-secondary)]",
	ghost:
		"bg-transparent text-[var(--color-content)] border border-transparent hover:bg-[var(--color-surface-secondary)]",
	danger:
		"bg-[var(--color-error)] text-white border border-[var(--color-error)] hover:opacity-90",
}

const Button = ({
	variant = "primary",
	children,
	type = "button",
	onClick,
	noPadding = false,
	noFocus = false,
}: ButtonProps) => {
	const base =
		"inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"

	const spacing = noPadding ? "" : "gap-2 px-4 py-2"
	const focus = noFocus
		? ""
		: "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] focus:ring-offset-2 "
	return (
		<button
			type={type}
			onClick={onClick}
			className={`${base} ${spacing} ${focus} ${variantClasses[variant]}`}
		>
			{children}
		</button>
	)
}
export default Button
