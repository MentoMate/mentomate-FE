import { ReactComponent as Logo } from "../../../../assets/svg/Logo.svg";
import { ReactComponent as ToggleIcon } from "../../../../assets/svg/toggle.svg";

const Toggle = () => {
	return (
		<>
			<div className="ml-2">
				<Logo width={100} height={30} />
			</div>
			<div className="mr-2">
				<ToggleIcon width={50} height={50} />
			</div>
		</>
	);
};

export default Toggle;
