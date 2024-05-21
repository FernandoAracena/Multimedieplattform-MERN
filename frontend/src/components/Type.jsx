
const Type = ({ types, filterType, setFilterType }) => {
	const onChange = ({ currentTarget: input }) => {
		if (input.checked) {
			const state = [...filterType, input.value];
			setFilterType(state);
		} else {
			const state = filterType.filter((val) => val !== input.value);
			setFilterType(state);
		}
	};

	return (
		<div>
			<div className="space-y-2">
				<div className="flex flex-wrap gap-4">
				{types.map((type) => (
				<div key={type} className="flex items-center">
					<input
                    className="form-checkbox text-sky-500 border-sky-300 rounded focus:ring-sky-500"
                    type="checkbox"
                    value={type}
                    onChange={onChange}
                	/>
                <p className="text-sky-800 p-1 capitalize">{type}</p>
				</div>
			))}
				</div>
			</div>
		</div>
	);
};

export default Type;