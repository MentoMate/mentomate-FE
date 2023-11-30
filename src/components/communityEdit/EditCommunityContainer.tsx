import { FORMATS } from "@/constants/reactQuill";
import { communityRegistrationForm } from "@/data/communityRegistrationForm";
import useAxios from "@/hooks/useAxios";
import { alertHandler } from "@/utils/alert";
import { cancelLockScroll, lockScroll } from "@/utils/controlBodyScroll";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Loading from "../common/spinner/Loading";
import EditCommunitySaveAndBackButton from "./EditCommunitySaveAndBackButton";
import EditCommunityTitle from "./EditCommunityTitle";
import EditEssentialInfoContainer from "./essentialInfo/EditEssentialInfoContainer";

const EditCommunityContainer = () => {
	const reactQuillRef = useRef<any>(null);
	const [isImgUploading, setIsImgUploading] = useState<boolean>(false);
	const [form, setForm] = useRecoilState(communityRegistrationForm);
	const { fetchDataUseAxios } = useAxios();
	const { communityId } = useParams();
	const [isInit, setIsInit] = useState<boolean>(true);

	const getCommunityInfo = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: `/posts/${communityId}/info`,
		});

		if (response && response.status === 200) {
			return response.data;
		}
	};

	const convertURLtoFile = async (url: string) => {
		const response = await fetch(url, {
			method: "POST",
			mode: "cors",
		});
		const data = await response.blob();
		const ext = url.split(".").pop();
		const filename = url.split("/").pop();
		const metadata = { type: `image/${ext}` };
		return new File([data], filename!, metadata);
	};

	const { data } = useQuery(["communityInfo"], getCommunityInfo);

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
		if (!isInit) {
			setForm({
				...form,
				content,
			});
		}
	};

	const initSetFormHandler = async () => {
		const thumbNailImgFile = await convertURLtoFile(data.uploadUrl);
		setForm({
			category: data.category,
			title: data.title,
			content: data.content,
			uploadFolder: data.uploadFolder,
			thumbNailImgUrl: data.uploadUrl,
			thumbNailImg: thumbNailImgFile,
		});
		setIsInit(false);
	};

	useEffect(() => {
		if (data) {
			initSetFormHandler();
		}
	}, [data]);

	return (
		<>
			<div className="min-h-screen bg-black-100">
				<div className="mx-auto lg:w-[60rem] md:w-[40rem] sm:w-[35rem] w-[20rem] h-full bg-white">
					<div className="sm:mx-16 mx-4 pt-16">
						<h1 className="font-bold md:text-xl text-lg">게시글 수정</h1>
						<form>
							<EditEssentialInfoContainer />
							<EditCommunityTitle />
							<ReactQuill
								style={{ minHeight: "500px" }}
								ref={reactQuillRef}
								className="py-8 rounded-md"
								theme="snow"
								modules={modules}
								formats={FORMATS}
								value={form.content}
								onChange={onChangeContentHandler}
							/>
						</form>
					</div>
				</div>
				<EditCommunitySaveAndBackButton reactQuillRef={reactQuillRef} />
			</div>
			{isImgUploading && <Loading />}
		</>
	);
};

export default EditCommunityContainer;
