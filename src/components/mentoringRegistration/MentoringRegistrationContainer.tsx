import { mentoringRegistrationForm } from "@/data/mentoringRegistrationForm";
import { useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRecoilState } from "recoil";
import MentoringTitle from "./MentoringTitle";
import SaveAndBackButton from "./SaveAndBackButton";
import EssentialInfoContainer from "./essentialInfo/EssentialInfoContainer";
import AWS from "aws-sdk";
import Loading from "../common/spinner/Loading";

const MentoringRegistrationContainer = () => {
	const [form, setForm] = useRecoilState(mentoringRegistrationForm);
	const [isImgUploading, setIsImgUploading] = useState<boolean>(false);
	const quillRef = useRef(null);

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
				//업로드할 파일의 이름으로 Date 사용
				const name = Date.now();
				//생성한 s3 관련 설정들
				AWS.config.update({
					region: import.meta.env.VITE_REGION,
					accessKeyId: import.meta.env.VITE_ACCESS_KEY,
					secretAccessKey: import.meta.env.VITE_SECRET_KEY,
				});
				//앞서 생성한 file을 담아 s3에 업로드하는 객체를 만든다
				const upload = new AWS.S3.ManagedUpload({
					params: {
						ACL: "public-read",
						Bucket: "mentomate", //버킷 이름
						Key: `upload/${name}`,
						Body: file,
					},
				});
				//이미지 업로드 후
				//곧바로 업로드 된 이미지 url을 가져오기
				const IMG_URL = await upload.promise().then((res) => res.Location);
				//useRef를 사용해 에디터에 접근한 후
				//에디터의 현재 커서 위치에 이미지 삽입
				const editor = quillRef.current.getEditor();
				const range = editor.getSelection();
				// 가져온 위치에 이미지를 삽입한다
				editor.insertEmbed(range.index, "image", IMG_URL);
			} catch (error) {
				console.log(error);
			} finally {
				setIsImgUploading(false);
			}
		});
	};

	const onChangeContentHandler = (value: string) => {
		setForm({
			...form,
			content: value,
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

	return (
		<>
			<div className="min-h-screen bg-black-100">
				<div className="mx-auto lg:w-[60rem] md:w-[40rem] sm:w-[35rem] w-[20rem] h-full bg-white">
					<div className="sm:mx-16 mx-4 pt-16">
						<h1 className="font-bold md:text-xl text-lg">멘토링 등록</h1>
						<EssentialInfoContainer />
						<MentoringTitle />
						<ReactQuill
							ref={quillRef}
							className="py-8 rounded-md"
							theme="snow"
							modules={modules}
							formats={formats}
							onChange={(prev) => onChangeContentHandler(prev)}
						/>
					</div>
				</div>
				<SaveAndBackButton />
			</div>
			{isImgUploading && <Loading />}
		</>
	);
};

export default MentoringRegistrationContainer;
