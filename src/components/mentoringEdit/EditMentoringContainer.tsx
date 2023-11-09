import { mentoringEditForm } from "@/data/mentoringEditForm";
import useAxios from "@/hooks/useAxios";
import { Suspense, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Loading from "../common/spinner/Loading";
import EditMentoringTitle from "./EditMentoringTitle";
import EditSaveAndBackButton from "./EditSaveAndBackButton";
import EditEssentialInfoContainer from "./essentialInfo/EditEssentialInfoContainer";
import { FORMATS } from "@/constants/reactQuill";

const EditMentoringContainer = () => {
	const { fetchDataUseAxios } = useAxios();
	const [form, setForm] = useRecoilState(mentoringEditForm);
	const { mentoringId } = useParams();

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

	const onChangeContentHandler = (content: string) => {
		setForm({
			...form,
			content,
		});
	};

	return (
		<Suspense fallback={<Loading />}>
			<div className="min-h-screen bg-black-100">
				<div className="mx-auto lg:w-[60rem] md:w-[40rem] sm:w-[35rem] w-[20rem] min-h-[55rem] bg-white">
					<div className="sm:mx-16 mx-4 py-20">
						<h1 className="font-bold md:text-xl text-lg">멘토링 수정</h1>
						<EditEssentialInfoContainer />
						<EditMentoringTitle />
						<ReactQuill
							className="py-8 "
							theme="snow"
							modules={modules}
							formats={FORMATS}
							value={form.content}
							onChange={(prev) => onChangeContentHandler(prev)}
						/>
					</div>
				</div>
				<EditSaveAndBackButton />
			</div>
		</Suspense>
	);
};

export default EditMentoringContainer;
