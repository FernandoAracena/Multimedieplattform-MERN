
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
				<div key={type} className={`flex items-center ${filterType.includes(type) ? 'text-white bg-sky-300 rounded pr-2 pl-2' : 'text-sky-800 bg-white'}`}>
					<input
                    className="form-checkbox"
                    type="checkbox"
                    value={type}
                    onChange={onChange}
					checked={filterType.includes(type)}
                	/>
                <p className=" p-1 capitalize">{type}</p>
				</div>
			))}
				</div>
			</div>
		</div>
	);
};

export default Type;