import { ReactComponent as NotFoundIcon } from "@assets/svg/notFound.svg";
console.log("asd");
const NotFound404 = () => {
	return (
		<div className="min-h-min-height">
			<NotFoundIcon className="w-[10rem] h-[10rem]" />
			<p>찾을 수 없는 페이지입니다. 404 NOT FOUND</p>
		</div>
	);
};

export default NotFound404;
