
const Search = ({ setSearch }) => {
	return (
		<input
			type="text"
			placeholder="Search Title"
			onChange={({ currentTarget: input }) => setSearch(input.value)}
		/>
	);
};

export default Search;