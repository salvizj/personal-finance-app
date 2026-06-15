import { CircleX } from "lucide-react"
import type { ReactNode } from "react"

type ModalProps = {
	isOpen: boolean
	onClose: () => void
	title?: string
	children: ReactNode
	size?: "sm" | "md" | "lg" | "xl"
}

const sizeMap = {
	sm: "max-w-sm",
	md: "max-w-md",
	lg: "max-w-lg",
	xl: "max-w-xl",
}
const Modal = ({
	isOpen,
	onClose,
	title,
	children,
	size = "md",
}: ModalProps) => {
	if (!isOpen) return null

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 "
			onClick={onClose}
		>
			<div
				className={`w-full ${sizeMap[size]} rounded-lg bg-surface-elevated border border-border shadow-xl`}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-center  px-6 py-4 border-b border-border justify-end">
					{title && (
						<h2 className="text-lg font-semibold text-content flex-1">
							{title}
						</h2>
					)}
					<button
						onClick={onClose}
						className="text-content-muted hover:text-content transition-colors cursor-pointer"
						aria-label="Close"
					>
						<CircleX />
					</button>
				</div>
				<div className="p-6">{children}</div>
			</div>
		</div>
	)
}
export default Modal
