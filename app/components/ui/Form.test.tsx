import { describe, expect, test, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Form from "./Form"
import type { FieldConfig } from "~/types/types"

const textField = (over: Partial<FieldConfig> = {}): FieldConfig => ({
	name: "name",
	label: "Name",
	type: "text",
	placeholder: "Name",
	value: "",
	onChange: vi.fn(),
	error: undefined,
	...over,
})

describe("Form", () => {
	test("renders all provided fields", () => {
		const fields = [
			textField({ name: "name", placeholder: "Name" }),
			textField({ name: "email", type: "email", placeholder: "Email" }),
		]
		render(<Form fields={fields} onSubmit={vi.fn()} />)
		expect(screen.getByPlaceholderText("Name")).toBeInTheDocument()
		expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()
	})

	test("calls onChange with the typed value", async () => {
		const onChange = vi.fn()
		render(<Form fields={[textField({ onChange })]} onSubmit={vi.fn()} />)
		await userEvent.type(screen.getByPlaceholderText("Name"), "A")
		expect(onChange).toHaveBeenCalledWith("A")
	})

	test("only the matching field's onChange fires", async () => {
		const onName = vi.fn()
		const onEmail = vi.fn()
		const fields = [
			textField({ name: "name", placeholder: "Name", onChange: onName }),
			textField({ name: "email", placeholder: "Email", onChange: onEmail }),
		]
		render(<Form fields={fields} onSubmit={vi.fn()} />)
		await userEvent.type(screen.getByPlaceholderText("Name"), "A")
		expect(onName).toHaveBeenCalled()
		expect(onEmail).not.toHaveBeenCalled()
	})

	test("submits when the submit button is clicked", async () => {
		const onSubmit = vi.fn()
		render(<Form fields={[textField()]} onSubmit={onSubmit} />)
		await userEvent.click(screen.getByRole("button", { name: /submit/i }))
		expect(onSubmit).toHaveBeenCalledTimes(1)
	})

	test("uses a custom submit label", () => {
		render(
			<Form fields={[textField()]} onSubmit={vi.fn()} submitLabel="Save" />,
		)
		expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument()
		expect(
			screen.queryByRole("button", { name: /submit/i }),
		).not.toBeInTheDocument()
	})

	test("shows an error when provided", () => {
		render(
			<Form
				fields={[textField({ error: "Name is required" })]}
				onSubmit={vi.fn()}
			/>,
		)
		expect(screen.getByText("Name is required")).toBeInTheDocument()
	})

	test("shows no error when error is undefined", () => {
		render(
			<Form fields={[textField({ error: undefined })]} onSubmit={vi.fn()} />,
		)
		expect(screen.queryByText("Name is required")).not.toBeInTheDocument()
	})

	test("renders a select field for type 'select'", () => {
		const fields = [
			textField({
				name: "role",
				label: "Role",
				type: "select",
				placeholder: "Pick one",
				options: ["admin", "user"],
			}),
		]
		render(<Form fields={fields} onSubmit={vi.fn()} />)
		expect(screen.getByText("admin")).toBeInTheDocument()
	})
})
