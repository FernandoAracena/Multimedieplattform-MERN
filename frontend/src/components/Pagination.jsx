const Pagination = ({ page, total, limit, setPage }) => {
    const totalPages = Math.ceil(total / limit);

    const onClick = (newPage) => {
        setPage(newPage + 1);
    };

    return (
        <div className="flex justify-center mt-4">
            {totalPages > 0 &&
                [...Array(totalPages)].map((val, index) => (
                    <button
                        onClick={() => onClick(index)}
                        className={`px-4 py-2 mx-1 rounded-lg focus:outline-none ${
                            page === index + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-800"
                        }`}
                        key={index}
                    >
                        {index + 1}
                    </button>
                ))}
        </div>
    );
};

export default Pagination;
