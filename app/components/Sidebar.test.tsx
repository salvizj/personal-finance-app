import { describe, expect, test, vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router"
import { Sidebar } from "./Sidebar"
import type { Theme } from "~/types/types"

type SidebarProps = {
	themeToggle: () => void
	theme: Theme
}

const defaultProps = (over: Partial<SidebarProps> = {}): SidebarProps => ({
	themeToggle: vi.fn(),
	theme: "light",
	...over,
})

describe("Sidebar", () => {
	test("starts expanded: shows title and route labels", () => {
		const props = defaultProps()
		render(
			<MemoryRouter>
				<Sidebar {...props} />
			</MemoryRouter>,
		)

		expect(screen.getAllByText("Dashboard").length).toBeGreaterThan(0)
		expect(screen.getAllByText("Transactions").length).toBeGreaterThan(0)
		expect(screen.getAllByText("Budget Goals").length).toBeGreaterThan(0)
		expect(screen.getAllByText("Reports").length).toBeGreaterThan(0)
		expect(screen.getAllByText("Finance App").length).toBeGreaterThan(0)
	})

	test("toggles between collapsed and expanded", async () => {
		const props = defaultProps()
		render(
			<MemoryRouter>
				<Sidebar {...props} />
			</MemoryRouter>,
		)

		expect(screen.getAllByText("Finance App").length).toBeGreaterThan(0)

		await userEvent.click(
			screen.getByRole("button", { name: /collapse-sidebar/i }),
		)
		expect(screen.queryAllByText("Finance App").length).not.toBeGreaterThan(0)

		await userEvent.click(
			screen.getByRole("button", { name: /expand-sidebar/i }),
		)
		expect(screen.getAllByText("Finance App").length).toBeGreaterThan(0)
	})
})
