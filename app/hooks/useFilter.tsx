import { useSearchParams } from "react-router"

type Filter<T> = {
	param: string
	match: (item: T, value: string) => boolean
}

type UseFilterProps<T> = {
	filter: Filter<T>[]
	data: T[] | null
}

export const useFilter = <T,>({ data, filter }: UseFilterProps<T>) => {
	const [searchParams, setSearchParams] = useSearchParams()

	const search = searchParams.get("search") ?? ""
	const setFilters = (
		filterData: Record<string, string | number | undefined> | null,
	) => {
		if (filterData === null) {
			setSearchParams({})
			return
		}
		const params = new URLSearchParams(searchParams)
		filter.forEach(({ param }) => {
			const value = filterData[param]
			if (value !== undefined && value !== "") params.set(param, String(value))
			else params.delete(param)
		})
		setSearchParams(params)
	}

	const setSearch = (value: string) => {
		const params = new URLSearchParams(searchParams)
		if (value) params.set("search", value)
		else params.delete("search")
		setSearchParams(params)
	}

	const filteredData = data?.filter((item) =>
		filter.every(({ param, match }): boolean => {
			const value = searchParams.get(param)
			if (!value) return true
			return match(item, value)
		}),
	)

	return { filteredData, setFilters, setSearch, search }
}
