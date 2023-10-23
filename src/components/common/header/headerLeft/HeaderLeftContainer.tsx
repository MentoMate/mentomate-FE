import Menu from "./Menu";
import { ReactComponent as Logo } from "../../../../assets/svg/Logo.svg";

const HeaderLeftContainer = () => {
	return (
		<>
			<div className="flex justify-center items-center">
				<div className="flex justify-center items-center ml-4">
					<Logo />
					<Menu />
				</div>
			</div>
		</>
	);
};

export default HeaderLeftContainer;
