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

	return (
		<form
			onSubmit={onSubmitHandler}
			className="flex items-center mt-2 lg:mt-0 lg:mx-2 w-full lg:w-[20rem] border border-black-200 rounded-[0.3rem]"
		>
			<div className="ml-4">
				<SearchIcon width={17} height={17} fill="#8A8A8A" />
			</div>
			<input
				type="text"
				className="grow px-3 py-1 w-full outline-none rounded-[0.3rem] placeholder:text-[0.75rem] text-[0.75rem] text-black-600"
				placeholder="키워드로 검색"
				onChange={onChangeKeywordHandler}
			/>
		</form>
	);
};

export default Keyword;
