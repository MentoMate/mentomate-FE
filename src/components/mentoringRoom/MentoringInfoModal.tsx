import { useEffect, useRef, useState } from "react";
import { ReactComponent as Close } from "@/assets/svg/close.svg";
import { ReactComponent as Search } from "@/assets/svg/search.svg";
import { cancelLockScroll, lockScroll } from "@/utils/controlBodyScroll";
import { useParams } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { alertHandler } from "@/utils/alert";
import { useQuery } from "react-query";
import { categories } from "@/constants/categories";

const MentoringInfoModal = () => {
	const { id } = useParams();
	const { fetchDataUseAxios } = useAxios();
	const mentoringInfoModalRef = useRef<HTMLDivElement>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [categoryName, setCategoryName] = useState<string>("");

	const getMentoringInfo = async () => {
		const response = await fetchDataUseAxios("defaultAxios", {
			url: `/mentoring/${id}`,
			method: "GET",
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				return response.data;
			}

			if (status === 500) {
				alertHandler(
					"error",
					"서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.",
				);
			}
		}
	};
	const { data } = useQuery(
		["mentoringList", `/mentoring/${id}`],
		getMentoringInfo,
	);

	const getCategoryNameHandler = () => {
		for (let key in categories) {
			categories[key].find((category) => {
				if (category.key === data.category) {
					setCategoryName(category.categoryName);
					return;
				}
			});
		}
	};
	const onClickOpenModal = () => {
		lockScroll();
		setIsModalOpen(true);
	};

	const onClickCloseModal = () => {
		cancelLockScroll();
		setIsModalOpen(false);
	};
	useEffect(() => {
		getCategoryNameHandler();
	}, []);

	useEffect(() => {
		const outSideClickHandler = (e: Event) => {
			if (
				mentoringInfoModalRef.current &&
				!mentoringInfoModalRef.current.contains(e.target as Node)
			) {
				cancelLockScroll();
				setIsModalOpen(false);
			}
		};

		document.addEventListener("mousedown", outSideClickHandler);

		return () => {
			document.removeEventListener("mousedown", outSideClickHandler);
		};
	}, [mentoringInfoModalRef]);

	return (
		<>
			<button
				title="mentoring_info"
				className="hidden lg:flex items-center mx-1 bg-sky-500 hover:bg-sky-700 text-white py-2 px-4 rounded-[0.3rem] z-10 transition duration-200"
				onClick={onClickOpenModal}
			>
				멘토링 정보
			</button>
			<button
				title="mentoring_info"
				className="flex lg:hidden bg-sky-500 hover:bg-sky-700 text-white py-2 px-4 rounded-full z-10 shadow-lg transition duration-200"
				onClick={onClickOpenModal}
			>
				<Search width={15} height={15} />
			</button>
			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-[100] ">
					<div className="absolute inset-0 bg-black opacity-50" />

					<div
						ref={mentoringInfoModalRef}
						className="bg-white p-8 rounded-lg mt-20 z-10"
					>
						<div className="flex justify-between items-center w-[15rem] lg:w-[30rem]">
							<h2 className="text-sm lg:text-lg font-semibold mb-2">
								{data.title}
							</h2>
							<Close
								onClick={onClickCloseModal}
								width={20}
								height={20}
								className="cursor-pointer"
							/>
						</div>
						<div className="flex items-center w-[15rem] lg:w-[30rem] border-b-2">
							<h2 className="text-sm lg:text-lg mr-2 mb-2">멘토링 정보</h2>
						</div>
						<div className="font-semibold mt-4 text-sm lg:text-lg ">멘토</div>
						<div> {data.name} 멘토</div>
						<div className="font-semibold mt-4 text-sm lg:text-lg  ">
							멘토링 기간
						</div>
						<div>
							{data.startDate} ~ {data.endDate}
						</div>
						<div className="font-semibold mt-4 text-sm lg:text-lg">소개</div>
						<div
							className={`text-sm lg:text-lg  w-[15rem] lg:w-[30rem] overflow-auto ${
								data.content.length < 100 ? "h-[2rem] " : "h-[20rem] "
							}`}
							dangerouslySetInnerHTML={{ __html: data.content }}
						/>
						<div className="font-semibold mt-4 text-sm lg:text-lg  ">
							대화 주제
						</div>
						<div>{categoryName}</div>
					</div>
				</div>
			)}
		</>
	);
};
export default MentoringInfoModal;
