import { Link, useParams } from "react-router-dom";
import useAxios from "@/hooks/useAxios";

const Button = () => {
	const params = useParams();
	console.log(params);
	const { fetchDataUseAxios } = useAxios();
	const onClickFavoriteMentoringHandler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "POST",
			url: `mentoring/${params.mentoringId}`,
		});
		if (response && response.status === 200) {
			console.log(response);
			return response.data;
		} else {
			console.log(response);
		}
	};
	return (
		<div className="flex flex-col mt-2">
			<Link
				className="my-1 py-2 w-full bg-main-color rounded-sm text-white text-lg font-bold"
				to={`/payment/${params.mentoringId}`}
			>
				멘토링 신청
			</Link>
			<button className="my-1 py-2 w-full bg-yellow-200 rounded-sm text-white text-lg font-bold">
				1:1 문의
			</button>
			<button
				onClick={() => onClickFavoriteMentoringHandler()}
				className="my-1 py-2 w-full bg-red-200 rounded-sm text-white text-lg font-bold"
			>
				멘토링 찜 하기
			</button>
		</div>
	);
};

export default Button;
