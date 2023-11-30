import { checkAuthToken } from "@/utils/checkAuthToken";
import { ReactComponent as NotFoundIcon } from "@assets/svg/notFound.svg";
import { useEffect } from "react";

const NotFound404 = () => {
	useEffect(() => {
		checkAuthToken();
	}, []);

	return (
		<div className="flex flex-col justify-center items-center min-h-min-height">
			<NotFoundIcon className="w-[10rem] h-[10rem]" />
			<p className="mt-10">찾을 수 없는 페이지입니다. 404 NOT FOUND</p>
		</div>
	);
};

export default NotFound404;
