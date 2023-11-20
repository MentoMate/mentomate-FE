import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
		path: "/community",
		menuName: "커뮤니티",
	},
];

const Menu = () => {
	const location = useLocation();
	const [, setSelectedMenu] = useState<string>(location.pathname);

	const selectedMenuHandler = () => {
		const path = location.pathname;
		setSelectedMenu(path);
	};

	useEffect(() => {
		selectedMenuHandler();
	}, [location]);

	return (
		<>
			{menus.map((menu) => (
				<Link
					key={menu.menuName}
					to={menu.path}
					className={`${
						menu.menuName === "홈" && "ml-4"
					} px-2 text-white hover:text-black-200 font-semibold`}
				>
					{menu.menuName}
				</Link>
			))}
		</>
	);
};

export default Menu;
