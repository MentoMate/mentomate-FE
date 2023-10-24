import { ReactComponent as SearchIcon } from "../../../assets/svg/search.svg";

const Keyword = () => {
	return (
		<form className="flex items-center mx-2 w-[25rem] border border-black-200 rounded-sm">
			<div className="ml-4">
				<SearchIcon width={25} height={25} fill="#8A8A8A" />
			</div>
			<input
				type="text"
				className="grow p-3 outline-none"
				placeholder="키워드를 입력하세요."
			/>
		</form>
	);
};

export default Keyword;
