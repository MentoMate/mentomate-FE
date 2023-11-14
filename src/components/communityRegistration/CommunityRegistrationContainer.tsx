import { communityRegistrationForm } from "@/data/communityRegistrationForm";
import { cancelLockScroll, lockScroll } from "@/utils/controlBodyScroll";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRecoilState } from "recoil";
import Loading from "../common/spinner/Loading";
import CommunityTitle from "./CommunityTitle";
import SaveAndBackButton from "./SaveAndBackButton";
import EssentialInfoContainer from "./essentialInfo/EssentialInfoContainer";
import { alertHandler } from "@/utils/alert";
import useAxios from "@/hooks/useAxios";
import { FORMATS } from "@/constants/reactQuill";

const CommunityRegistrationContainer = () => {
	const reactQuillRef = useRef<any>(null);
	const [isImgUploading, setIsImgUploading] = useState<boolean>(false);
	const [form, setForm] = useRecoilState(communityRegistrationForm);
	const { fetchDataUseAxios } = useAxios();

	const makeRandomKeyHandler = async () => {
		const characters =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let randomKey = "";

		for (let i = 0; i < 12; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			randomKey += characters.charAt(randomIndex);
		}

		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: `/upload?key=community/${randomKey}`,
		});

		if (response && response.status !== 200) {
			makeRandomKeyHandler();
			return;
		}

		setForm({ ...form, category: "communication", uploadFolder: randomKey });
	};

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
			url: `/upload?key=community/${form.uploadFolder}`,
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

	const onChangeContentHandler = (content: string) => {
		setForm({
			...form,
			content,
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

	useEffect(() => {
		makeRandomKeyHandler();
	}, []);

	useEffect(() => {});

	return (
		<>
			<div className="min-h-screen bg-black-100">
				<div className="mx-auto lg:w-[60rem] md:w-[40rem] sm:w-[35rem] w-[20rem] h-full bg-white">
					<div className="sm:mx-16 mx-4 pt-16">
						<h1 className="font-bold md:text-xl text-lg">게시글쓰기</h1>
						<form>
							<EssentialInfoContainer />
							<CommunityTitle />
							<ReactQuill
								style={{ minHeight: "500px" }}
								ref={reactQuillRef}
								className="py-8 rounded-md"
								theme="snow"
								modules={modules}
								formats={FORMATS}
								onChange={onChangeContentHandler}
							/>
						</form>
					</div>
				</div>
				<SaveAndBackButton reactQuillRef={reactQuillRef} />
			</div>
			{isImgUploading && <Loading />}
		</>
	);
};

export default CommunityRegistrationContainer;
