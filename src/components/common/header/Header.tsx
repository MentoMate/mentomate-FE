import HeaderLeftContainer from "./headerLeft/HeaderLeftContainer";
import HeaderRightContainer from "./headerRight/HeaderRightContainer";

const Header = () => {
	return (
		<>
			<header className="sticky top-0 w-full border-b border-b-[#e5e5e5]">
				<div className="flex justify-between mx-auto w-full md:w-[65rem] py-4">
					<HeaderLeftContainer />
					<HeaderRightContainer />
				</div>
			</header>
		</>
	);
};

export default Header;
