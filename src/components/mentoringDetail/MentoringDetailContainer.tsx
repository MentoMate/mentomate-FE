import { Suspense } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../common/spinner/Spinner";
import RecommendMentoring from "./RecommendMentoring";
import MentoringContent from "./mentoringInfoWithApply/MentoringContent";
import MentoringInfoWithApply from "./mentoringInfoWithApply/MentoringInfoWithApply";
import useAxios from "@/hooks/useAxios";
import Swal from "sweetalert2";
import { alertHandler } from "@/utils/alert";

const MentoringDetailContainer = () => {
	const { fetchDataUseAxios } = useAxios();
	const navigate = useNavigate();
	const { mentoringId } = useParams();
	console.log("asd");
	const { data } = useQuery(["mentoringInfo", mentoringId], async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			url: `/mentoring/${mentoringId}`,
			method: "GET",
		});
		if (response) {
			const status = response.status;

			if (status === 200) {
				return response.data;
			}

			if (status === 400) {
				alertHandler("error", "존재하지 않는 멘토링입니다.");
				navigate("/mentoring");
			}

			if (status === 500) {
				alertHandler(
					"error",
					"서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.",
				);
				navigate("/mentoring");
			}
		}
	});

	const deleteHandler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "DELETE",
			url: `/mentoring/${mentoringId}`,
		});

		if (response && response.status === 200) {
			alertHandler("success", "멘토링이 삭제 되었습니다.");
			navigate("/mentoring");
		}
	};

	const onClickDeleteHandler = () => {
		Swal.fire({
			icon: "error",
			text: "멘토링을 삭제 하시겠습니까?",
			showCancelButton: true,
			confirmButtonText: "확인",
			cancelButtonText: "취소",
		}).then((result) => {
			if (result.isConfirmed) {
				deleteHandler();
			}
		});
	};

	return (
		<Suspense fallback={<Spinner />}>
			<div className="flex md:flex-row flex-col mx-auto my-16 lg:w-[60rem] md:w-[40rem] w-[20rem] min-h-min-height">
				<div>
					<div
						className={`${
							data.owner ? "flex" : "hidden"
						} lg:w-[40rem] md:w-[25rem] sm:w-[20rem] justify-end text-black-400 text-sm`}
					>
						<Link to={`/mentoringEdit/${mentoringId}`} className="mx-1">
							수정
						</Link>
						<button
							type="button"
							onClick={onClickDeleteHandler}
							className="mx-1"
						>
							삭제
						</button>
					</div>
					<MentoringContent data={data} />
					<div className="md:hidden block mt-20">
						<MentoringInfoWithApply data={data} />
					</div>
					<RecommendMentoring />
				</div>
				<div className="md:block hidden">
					<MentoringInfoWithApply data={data} />
				</div>
			</div>
		</Suspense>
	);
};

export default MentoringDetailContainer;
