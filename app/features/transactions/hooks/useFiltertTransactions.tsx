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
	const search = searchParams.get("search")

	const setFilters = (data: FilterData | null) => {
		if (data === null) {
			setSearchParams({})
			return
		}

		const params = new URLSearchParams(searchParams)

		if (data.type) params.set("type", data.type)
		else params.delete("type")

		if (data.category) params.set("category", data.category)
		else params.delete("category")

		if (data.minAmount) params.set("minAmount", data.minAmount)
		else params.delete("minAmount")

		if (data.maxAmount) params.set("maxAmount", data.maxAmount)
		else params.delete("maxAmount")
		setSearchParams(params)
	}

	const setSearch = (value: string) => {
		const params = new URLSearchParams(searchParams)
		if (value) params.set("search", value)
		else params.delete("search")
		setSearchParams(params)
	}

	const filteredData =
		transactions?.filter((t) => {
			if (type && t.type !== type) return false
			if (category && t.category !== category) return false
			if (minAmount && t.amount < Number(minAmount)) return false
			if (maxAmount && t.amount > Number(maxAmount)) return false
			if (search && !t.title.toLowerCase().includes(search.toLowerCase()))
				return false
			return true
		}) ?? null

	return { filteredData, setFilters, setSearch, search }
}
