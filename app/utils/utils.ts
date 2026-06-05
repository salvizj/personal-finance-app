export const removeNonDigit = (input: string) => {
	return input.replace(/[^\d.]/g, "")
}
