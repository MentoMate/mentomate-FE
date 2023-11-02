import { useMemo } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../common/spinner/Loading";
import MentoringTitle from "./MentoringTitle";
import SaveAndBackButton from "./SaveAndBackButton";
import EssentialInfoContainer from "./essentialInfo/EssentialInfoContainer";
import useAxios from "@/hooks/useAxios";
import ReactQuill from "react-quill";

const MentoringEditContainer = () => {
	const { fetchDataUseAxios } = useAxios();
	const { mentoringId } = useParams();
	const { isLoading, error, data } = useQuery("mentoringInfo", async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			url: `/mentoring/${mentoringId}`,
			method: "GET",
		});
		if (response) return response.data;
	});

	// 사용하고 싶은 옵션, 나열 되었으면 하는 순서대로 나열
	const modules = useMemo(() => {
		return {
			toolbar: [
				[{ header: [1, 2, false] }],
				["bold", "italic", "underline"],
				[
					{ list: "ordered" },
					{ list: "bullet" },
					{ indent: "-1" },
					{ indent: "+1" },
				],
				["image"],
				[{ align: [] }, { color: [] }], // dropdown with defaults from theme
			],
		};
	}, []);

	//옵션에 상응하는 포맷, 추가해주지 않으면 text editor에 적용된 스타일을 볼 수 없음
	const formats = useMemo(() => {
		return [
			"header",
			"bold",
			"italic",
			"list",
			"indent",
			"image",
			"align",
			"color",
		];
	}, []);

	// const onChangeContentHandler = (content: string) => {};
	if (isLoading) return <Loading />;
	if (error) return <></>;

	return (
		<div className="min-h-screen bg-black-100">
			<div className="mx-auto lg:w-[60rem] md:w-[40rem] sm:w-[35rem] w-[20rem] min-h-[55rem] bg-white">
				<div className="sm:mx-16 mx-4 py-20">
					<h1 className="font-bold md:text-xl text-lg">멘토링 등록</h1>
					<EssentialInfoContainer data={data} />
					<MentoringTitle />
					<ReactQuill
						className="py-8 "
						theme="snow"
						modules={modules}
						formats={formats}
						value={data.introduceContent}
						// onChange={(prev) => onChangeHandler(prev)}
					/>
				</div>
			</div>
			<SaveAndBackButton />
		</div>
	);
};

export default MentoringEditContainer;
