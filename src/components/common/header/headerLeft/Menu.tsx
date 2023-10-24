import { Link } from "react-router-dom";

const Menu = () => {
	return (
		<>
			<Link to={"/"} className="ml-4 px-2 font-semibold">
				홈
			</Link>
			<Link to={""} className="px-2 font-semibold">
				멘토링
			</Link>
			<Link to={""} className="px-2 font-semibold">
				멘토
			</Link>
			<Link to={""} className="px-2 font-semibold">
				커뮤니티
			</Link>
		</>
	);
};

export default Menu;
