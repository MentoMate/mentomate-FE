import { ReactComponent as Logo } from "@assets/svg/Logo.svg";
import { ReactComponent as ToggleIcon } from "@assets/svg/toggle.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ToggleMenu from "./ToggleMenu";
import { cancelLockScroll, lockScroll } from "@/utils/controlBodyScroll";

const Toggle = () => {
	const [isOpenToggle, setIsOpenToggle] = useState<boolean>(false);

	useEffect(() => {
		if (!isOpenToggle) {
			cancelLockScroll();
		} else {
			lockScroll();
		}
	}, [isOpenToggle]);

	return (
		<>
			<Link to="/" className="ml-2">
				<Logo width={100} height={30} />
			</Link>
			<button
				type="button"
				className="mr-2"
				onClick={() => setIsOpenToggle(true)}
			>
				<ToggleIcon width={50} height={50} />
			</button>
			{isOpenToggle && <ToggleMenu setIsOpenToggle={setIsOpenToggle} />}
		</>
	);
};

export default Toggle;
