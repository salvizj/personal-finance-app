import { useSearchParams } from "react-router"
import type { transactionSchema } from "~/schemas/transactionSchema"
import type { FilterData } from "~/types/types"

export const useFilterTransactions = (
	transactions: transactionSchema[] | null,
) => {
	const [searchParams, setSearchParams] = useSearchParams()

	const type = searchParams.get("type")
	const category = searchParams.get("category")
	const minAmount = searchParams.get("minAmount")
	const maxAmount = searchParams.get("maxAmount")

	const setFilters = (data: FilterData | null) => {
		const params = new URLSearchParams()
		if (data != null) {
			if (data.type) params.set("type", data.type)
			if (data.category) params.set("category", data.category)
			if (data.minAmount) params.set("minAmount", data.minAmount)
			if (data.maxAmount) params.set("maxAmount", data.maxAmount)
			setSearchParams(params)
		} else {
			setSearchParams({})
		}
	}

	const filteredData =
		transactions?.filter((t) => {
			if (type && t.type !== type) return false
			if (category && t.category !== category) return false
			if (minAmount && t.amount < Number(minAmount)) return false
			if (maxAmount && t.amount > Number(maxAmount)) return false
			return true
		}) ?? null

	return { filteredData, setFilters }
}
