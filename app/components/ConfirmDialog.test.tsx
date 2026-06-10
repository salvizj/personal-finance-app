import { describe, expect, test, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import ConfirmDialog from "./ConfirmDialog"
import userEvent from "@testing-library/user-event"

type ConfirmDialogProps = {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	title?: string
	message?: string
}

const defaultProps = (
	over: Partial<ConfirmDialogProps> = {},
): ConfirmDialogProps => ({
	isOpen: true,
	onClose: vi.fn(),
	onConfirm: vi.fn(),
	...over,
})

describe("Confirm dialog", () => {
	test("shows title and message", () => {
		const props = defaultProps()
		render(<ConfirmDialog {...props} />)
		expect(screen.getByText("Are you sure?")).toBeInTheDocument()
		expect(
			screen.getByText("This action cannot be undone."),
		).toBeInTheDocument()
	})

	test("cancel calls onClose only", async () => {
		const props = defaultProps()
		render(<ConfirmDialog {...props} />)
		await userEvent.click(screen.getByRole("button", { name: /cancel/i }))
		expect(props.onClose).toHaveBeenCalledTimes(1)
		expect(props.onConfirm).not.toHaveBeenCalled()
	})

	test("confirm calls both onConfirm and onClose", async () => {
		const props = defaultProps()
		render(<ConfirmDialog {...props} />)
		await userEvent.click(screen.getByRole("button", { name: /confirm/i }))
		expect(props.onConfirm).toHaveBeenCalledTimes(1)
		expect(props.onClose).toHaveBeenCalledTimes(1)
	})
})
