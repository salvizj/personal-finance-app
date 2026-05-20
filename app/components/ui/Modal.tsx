import type { ReactNode } from "react"

type ModalProps = {
	isOpen: boolean
	onClose: () => void
	title?: string
	children: ReactNode
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
	if (!isOpen) return null

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
			onClick={onClose}
		>
			<div
				className="w-full rounded-lg bg-surface-elevated border border-border shadow-xl"
				onClick={(e) => e.stopPropagation()}
			>
				{title && (
					<div className="flex items-center justify-between px-6 py-4 border-b border-border">
						<h2 className="text-lg font-semibold text-content">{title}</h2>
						<button
							onClick={onClose}
							className="text-content-muted hover:text-content transition-colors"
							aria-label="Close"
						>
							✕
						</button>
					</div>
				)}
				<div className="p-6">{children}</div>
			</div>
		</div>
	)
}
export default Modal
