import { Link } from "react-router-dom";

const menus = [
	{
		path: "/",
		menuName: "홈",
	},
	{
		path: "/mentoring",
		menuName: "멘토링",
	},
	{
		path: "/mentor",
		menuName: "멘토",
	},
	{
		path: "/",
		menuName: "커뮤니티",
	},
];

const Menu = () => {
	return (
		<>
			{menus.map((menu) => (
				<Link
					key={menu.menuName}
					to={menu.path}
					className={`${menu.menuName === "홈" && "ml-4"} px-2 font-semibold`}
				>
					{menu.menuName}
				</Link>
			))}
		</>
	);
};

export default Menu;
