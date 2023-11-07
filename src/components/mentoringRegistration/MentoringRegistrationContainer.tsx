import { mentoringRegistrationForm } from "@/data/mentoringRegistrationForm";
import { alertHandler } from "@/utils/alert";
import { cancelLockScroll, lockScroll } from "@/utils/controlBodyScroll";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRecoilState } from "recoil";
import Loading from "../common/spinner/Loading";
import MentoringTitle from "./MentoringTitle";
import SaveAndBackButton from "./SaveAndBackButton";
import EssentialInfoContainer from "./essentialInfo/EssentialInfoContainer";
import useAxios from "@/hooks/useAxios";

//옵션에 상응하는 포맷, 추가해주지 않으면 text editor에 적용된 스타일을 볼 수 없음
const formats = [
	"header",
	"bold",
	"italic",
	"list",
	"indent",
	"image",
	"align",
	"color",
];

const MentoringRegistrationContainer = () => {
	const [form, setForm] = useRecoilState(mentoringRegistrationForm);
	const [isImgUploading, setIsImgUploading] = useState<boolean>(false);
	const { fetchDataUseAxios } = useAxios();
	const reactQuillRef = useRef<any>(null);
	const divRef = useRef<HTMLDivElement>(null);

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
			url: `/upload?key=mentoring/9DCDXzRekq7k`,
		});

		if (response && response.status !== 200) {
			makeRandomKeyHandler();
			return;
		}

		setForm({ ...form, key: randomKey });
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
			url: `/upload?key=mentoring/${form.key}`,
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

	const imageHandler = async () => {
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

	useEffect(() => {
		setForm({
			title: "",
			content: "",
			startDate: new Date(),
			endDate: new Date(),
			numberOfPeople: 0,
			amount: 0,
			category: "",
			thumbNailImg: null,
			key: "",
		});
		makeRandomKeyHandler();
	}, []);

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
		<>
			<div className="min-h-screen bg-black-100">
				<div className="mx-auto lg:w-[60rem] md:w-[40rem] sm:w-[35rem] w-[20rem] h-full bg-white">
					<div className="sm:mx-16 mx-4 pt-16">
						<h1 className="font-bold md:text-xl text-lg">멘토링 등록</h1>
						<EssentialInfoContainer />
						<MentoringTitle />
						<div ref={divRef}>
							<ReactQuill
								ref={reactQuillRef}
								className="py-8 rounded-md"
								theme="snow"
								modules={modules}
								formats={formats}
								onChange={(prev) => onChangeContentHandler(prev)}
							/>
						</div>
					</div>
				</div>
				<SaveAndBackButton reactQuillRef={reactQuillRef} />
			</div>
			{isImgUploading && <Loading />}
		</>
	);
};

export default MentoringRegistrationContainer;
