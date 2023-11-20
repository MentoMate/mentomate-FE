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
			className="flex items-center mt-2 lg:mt-0 lg:mx-2 w-full lg:w-[25rem] border border-black-200 rounded-sm"
		>
			<div className="ml-4">
				<SearchIcon width={25} height={25} fill="#8A8A8A" />
			</div>
			<input
				type="text"
				className="grow p-3 w-full outline-none placeholder:text-sm"
				placeholder="키워드를 입력하세요."
				onChange={onChangeKeywordHandler}
			/>
		</form>
	);
};

export default Keyword;
