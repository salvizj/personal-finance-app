import Input from "~/components/ui/Input"
type SearchInputProps = {
	search: string | null
	setSearch: (search: string) => void
}

const SearchInput = ({ search, setSearch }: SearchInputProps) => {
	return (
		<Input
			type={"text"}
			placeholder={"Search"}
			value={search ? search : ""}
			onChange={(e) => setSearch(e.target.value)}
		/>
	)
}
export default SearchInput
