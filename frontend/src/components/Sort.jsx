
const Sort = ({ sort, setSort }) => {
	const onSelectChange = ({ currentTarget: input }) => {
		setSort({ sort: input.value, order: sort.order });
	};

	const onArrowChange = () => {
		if (sort.order === "asc") {
			setSort({ sort: sort.sort, order: "desc" });
		} else {
			setSort({ sort: sort.sort, order: "asc" });
		}
	};

	return (
		<div className="flex items-center">
			<label>Sorter etter :</label>
			<select onChange={onSelectChange}>
				<option value="views">Views</option>
				<option value="likes">Likes</option>
				<option value="comments">Comments</option>
			</select>
    		<button onClick={onArrowChange} className="ml-2">
        		<p>&uarr;</p>
    		</button>
    		<button onClick={onArrowChange} className="ml-2">
        		<p>&darr;</p>
    		</button>
		</div>
	);
};

export default Sort;