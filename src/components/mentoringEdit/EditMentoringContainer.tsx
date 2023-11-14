import { categories } from "@/constants/categories";
import { FORMATS } from "@/constants/reactQuill";
import { mentoringEditForm } from "@/data/mentoringEditForm";
import useAxios from "@/hooks/useAxios";
import { selectedCategoryState } from "@/state/selectedCategory";
import { alertHandler } from "@/utils/alert";
import { cancelLockScroll, lockScroll } from "@/utils/controlBodyScroll";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import Loading from "../common/spinner/Loading";
import EditMentoringTitle from "./EditMentoringTitle";
import EditSaveAndBackButton from "./EditSaveAndBackButton";
import EditEssentialInfoContainer from "./essentialInfo/EditEssentialInfoContainer";

const EditMentoringContainer = () => {
	const { fetchDataUseAxios } = useAxios();
	const [form, setForm] = useRecoilState(mentoringEditForm);
	const setCategory = useSetRecoilState(selectedCategoryState);
	const [isImgUploading, setIsImgUploading] = useState<boolean>(false);
	const { mentoringId } = useParams();
	const reactQuillRef = useRef<any>(null);
	const divRef = useRef<HTMLDivElement>(null);

	const findCategoryByKey = (formCategory: string) => {
		for (let categoryType in categories) {
			const categoryList = categories[categoryType];
			categoryList.forEach((category) => {
				if (category.key === formCategory) {
					setCategory({
						selectedCategoryType: categoryType,
						selectedCategory: category.key,
						selectedCategoryName: category.categoryName,
					});
				}
			});
		}
	};

	const convertURLtoFile = async (url: string) => {
		const response = await fetch(url);
		const data = await response.blob();
		const ext = url.split(".").pop();
		const filename = url.split("/").pop();
		const metadata = { type: `image/${ext}` };
		return new File([data], filename!, metadata);
	};

	const { data } = useQuery(
		["mentoringInfo"],
		async () => {
			const response = await fetchDataUseAxios("useTokenAxios", {
				method: "GET",
				url: `/mentoring/${mentoringId}`,
			});

			if (response && response.status === 200) {
				return response.data;
			}
		},
		{
			onSuccess: async (data) => {
				const thumbNailImgFile = await convertURLtoFile(data.uploadUrl);
				findCategoryByKey(data.category);

				setForm({
					mentoringId: data.mentoringId,
					title: data.title,
					content: data.content,
					startDate: new Date(data.startDate),
					endDate: new Date(data.endDate),
					numberOfPeople: data.numberOfPeople,
					amount: data.amount,
					category: data.category,
					thumbNailImgUrl: data.uploadUrl,
					thumbNailImg: thumbNailImgFile,
					uploadFolder: data.uploadFolder,
				});
			},
		},
	);

	const uploadImageHandler = async (file: File) => {
		if (file.size >= 500000) {
			alertHandler(
				"error",
				"크기가 500KB 이상인 이미지는 업로드가 불가능합니다.",
			);
			return;
		}

		const formData = new FormData();
		formData.append("img", file);
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "POST",
			url: `/upload?key=${data.uploadFolder}`,
			data: formData,
		});

		if (response && response.status === 200) {
			return response.data;
		} else {
			alertHandler(
				"error",
				"이미지 업로드에 실패하였습니다. 잠시 후에 다시 시도해주세요.",
			);
		}
	};

	const reactQuillImageHandler = async () => {
		const inputDOM = document.createElement("input");
		inputDOM.setAttribute("type", "file");
		inputDOM.setAttribute("accept", "image/*");
		inputDOM.click();
		inputDOM.addEventListener("change", async () => {
			if (inputDOM.files !== null) {
				try {
					setIsImgUploading(true);
					lockScroll();

					const file = inputDOM.files[0];
					const imageUrl = await uploadImageHandler(file);
					const editor = reactQuillRef.current.getEditor();
					const range = editor.getSelection();
					editor.insertEmbed(range.index, "image", imageUrl);
				} catch (error) {
					alertHandler(
						"error",
						"이미지 업로드가 실패하였습니다. 다시 시도해주세요.",
					);
				} finally {
					setIsImgUploading(false);
					cancelLockScroll();
				}
			}
		});
	};

	const modules = useMemo(() => {
		return {
			toolbar: {
				container: [
					[{ header: [1, 2, false] }],
					["bold", "italic", "underline"],
					[
						{ list: "ordered" },
						{ list: "bullet" },
						{ indent: "-1" },
						{ indent: "+1" },
					],
					["image"],
					[{ align: [] }, { color: [] }],
				],
				handlers: {
					image: reactQuillImageHandler,
				},
			},
		};
	}, []);

	const onChangeContentHandler = (content: string) => {
		setForm({
			...form,
			content,
		});
	};

	useEffect(() => {
		if (divRef.current) {
			divRef.current.scrollIntoView({
				behavior: "instant",
				block: "start",
				inline: "end",
			});
		}
	}, [form.content]);

	return (
		<Suspense fallback={<Loading />}>
			<div className="min-h-screen bg-black-100">
				<div className="mx-auto lg:w-[60rem] md:w-[40rem] sm:w-[35rem] w-[20rem] min-h-[55rem] bg-white">
					<div className="sm:mx-16 mx-4 py-20">
						<h1 className="font-bold md:text-xl text-lg">멘토링 수정</h1>
						<EditEssentialInfoContainer />
						<EditMentoringTitle />
						<div ref={divRef}>
							<ReactQuill
								ref={reactQuillRef}
								className="py-8 rounded-md"
								theme="snow"
								modules={modules}
								formats={FORMATS}
								value={form.content}
								onChange={onChangeContentHandler}
							/>
						</div>
					</div>
				</div>
				<EditSaveAndBackButton reactQuillRef={reactQuillRef} />
			</div>
			{isImgUploading && <Loading />}
		</Suspense>
	);
};

export default EditMentoringContainer;
