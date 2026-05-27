import Button from "./ui/Button"
import Modal from "./ui/Modal"

type ConfirmDialogProps = {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	title?: string
	message?: string
}

const ConfirmDialog = ({
	isOpen,
	onClose,
	onConfirm,
	title = "Are you sure?",
	message = "This action cannot be undone.",
}: ConfirmDialogProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} title={title}>
			<div className="flex flex-col gap-4">
				<p className="text-content-secondary">{message}</p>
				<div className="flex gap-2 justify-end">
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button
						variant="danger"
						onClick={() => {
							onConfirm()
							onClose()
						}}
					>
						Confirm
					</Button>
				</div>
			</div>
		</Modal>
	)
}

export default ConfirmDialog
