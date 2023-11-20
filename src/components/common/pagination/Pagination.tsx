import usePagination from "@/hooks/usePagination";

interface IProps {
	readonly totalPages: number;
}

const Pagination = ({ totalPages }: IProps) => {
	const {
		pageArray,
		currentPage,
		onClickPageHandler,
		onClickNextOrPrevBtnHandler,
	} = usePagination(totalPages);
	console.log("asd");
	return (
		<div className="py-20 h-20 flex justify-center items-center">
			<button
				type="button"
				onClick={() => onClickNextOrPrevBtnHandler("start")}
				disabled={currentPage === 1 ? true : false}
				className="mr-3 px-2 py-1.5 bg-black-500 hover:bg-black-400 disabled:bg-black-300 rounded-md text-white"
			>
				맨처음
			</button>
			<button
				type="button"
				onClick={() => onClickNextOrPrevBtnHandler("prev")}
				disabled={currentPage === 1 ? true : false}
				className="mr-3 px-2 py-1.5 bg-black-500 hover:bg-black-400 disabled:bg-black-300 rounded-md text-white"
			>
				이전
			</button>
			{pageArray.map((page: number) => (
				<div
					key={page}
					className={`mx-1 text-lg ${
						currentPage === page
							? "text-main-color font-semibold"
							: "text-black"
					} cursor-pointer`}
					onClick={() => onClickPageHandler(page)}
				>
					{page}
				</div>
			))}
			<button
				type="button"
				onClick={() => onClickNextOrPrevBtnHandler("next")}
				disabled={currentPage === totalPages ? true : false}
				className="ml-3 px-2 py-1.5 bg-black-500 hover:bg-black-400 disabled:bg-black-300 rounded-md text-white "
			>
				다음
			</button>
			<button
				type="button"
				onClick={() => onClickNextOrPrevBtnHandler("end")}
				disabled={currentPage === totalPages ? true : false}
				className="ml-3 px-2 py-1.5 bg-black-500 hover:bg-black-400 disabled:bg-black-300 rounded-md text-white "
			>
				맨 끝
			</button>
		</div>
	);
};

export default Pagination;
