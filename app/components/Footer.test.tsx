import { render, screen } from "@testing-library/react"
import { Footer } from "./Footer"
import { describe, expect, it } from "vitest"

describe("Footer", () => {
	it("renders the copyright with the current year", () => {
		render(<Footer />)

		const footer = screen.getByRole("contentinfo")

		expect(footer).toHaveTextContent(
			"Personal Finance App. All rights reserved.",
		)
		expect(footer).toHaveTextContent(String(new Date().getFullYear()))
	})
})
