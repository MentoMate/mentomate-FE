import { searchCriteria } from "@/state/searchCriteria";
import { ReactComponent as SearchIcon } from "@assets/svg/search.svg";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRecoilState } from "recoil";

const Keyword = () => {
	const [selectedSearchCriteria, setSelectedSearchCriteria] =
		useRecoilState(searchCriteria);
	const [searchKeyword, setSearchKeyword] = useState<string>("");

	const onChangeKeywordHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchKeyword(e.target.value);
	};

	const onSubmitHandler = (e: FormEvent) => {
		e.preventDefault();

		setSelectedSearchCriteria({
			...selectedSearchCriteria,
			keyword: searchKeyword,
		});
	};

	console.log("asd");

	return (
		<form
			onSubmit={onSubmitHandler}
			className="flex items-center mt-2 md:mt-0 lg:mx-2 lg:w-[20rem] md:w-[15rem] border border-black-200 rounded-[0.3rem]"
		>
			<div className="ml-4">
				<SearchIcon width={17} height={17} fill="#8A8A8A" />
			</div>
			<input
				type="text"
				className="grow px-3 md:py-1 py-2 w-full outline-none rounded-[0.3rem] placeholder:text-[0.75rem] text-[0.75rem] text-black-600"
				placeholder="키워드로 검색"
				onChange={onChangeKeywordHandler}
			/>
		</form>
	);
};

export default Keyword;
