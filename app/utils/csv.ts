import Papa from "papaparse"

export const toCsv = <T extends object>(
	data: T[],
	columns?: (keyof T)[],
): string => {
	return Papa.unparse(
		data,
		columns ? { columns: columns as string[] } : undefined,
	)
}
export const downloadCsv = (csv: string, filename: string) => {
	const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
	const link = document.createElement("a")
	const url = URL.createObjectURL(blob)
	link.setAttribute("href", url)
	link.setAttribute("download", filename)
	link.style.visibility = "hidden"
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}

export const handleCSVDownload = <T extends object>(
	data: T[],
	filename: string,
	columns?: (keyof T)[],
) => {
	const csv = toCsv(data, columns)
	downloadCsv(csv, filename)
}
export const isCsv = (file: File) => {
	if (!file) return false
	const validTypes = [
		"text/csv",
		"application/vnd.ms-excel",
		"application/csv",
		"",
	]
	const hasValidType = validTypes.includes(file.type)
	const hasValidExtension = file.name.toLowerCase().endsWith(".csv")
	return hasValidType && hasValidExtension
}
