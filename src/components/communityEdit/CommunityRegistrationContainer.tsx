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

const CommunityRegistrationContainer = () => {
	const quillRef = useRef(null);
	const [isImgUploading, setIsImgUploading] = useState<boolean>(false);
	const [form, setForm] = useRecoilState(communityRegistrationForm);

	const uploadImageHandler = () => {
		const characters =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let randomKey = "";

		for (let i = 0; i < 12; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			randomKey += characters.charAt(randomIndex);
		}

		setForm({ ...form, uploadFolder: randomKey });
	};

	const imageHandler = async () => {
		const inputDOM = document.createElement("input");
		inputDOM.setAttribute("type", "file");
		inputDOM.setAttribute("accept", "image/*");
		inputDOM.click();
		inputDOM.addEventListener("change", async () => {
			//이미지를 담아 전송할 file을 만든다
			const file = inputDOM.files?.[0];
			try {
				setIsImgUploading(true);
				lockScroll();
				//업로드할 파일의 이름으로 Date 사용
			} catch (error) {
				console.log(error);
			} finally {
				setIsImgUploading(false);
				cancelLockScroll();
			}
		});
	};

	// 사용하고 싶은 옵션, 나열 되었으면 하는 순서대로 나열
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
					[{ align: [] }, { color: [] }], // dropdown with defaults from theme
				],
				handlers: {
					image: imageHandler,
				},
			},
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

	useEffect(() => {
		uploadImageHandler();
		setForm({
			category: "",
			title: "",
			content: "",
			uploadFolder: "",
			uploadImg: null,
			thumbNailImg: null,
		});
	}, []);

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
								ref={quillRef}
								className="py-8 rounded-md"
								theme="snow"
								modules={modules}
								formats={formats}
								// onChange={(prev) => onChangeContentHandler(prev)}
							/>
						</form>
					</div>
				</div>
				<SaveAndBackButton />
			</div>
			{isImgUploading && <Loading />}
		</>
	);
};

export default CommunityRegistrationContainer;
