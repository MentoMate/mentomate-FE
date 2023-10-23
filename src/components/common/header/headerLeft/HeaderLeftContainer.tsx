import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../../../assets/svg/Logo.svg";

const Menu = lazy(() => import("./Menu"));

const HeaderLeftContainer = () => {
	return (
		<>
			<div className="flex justify-center items-center">
				<div className="flex justify-center items-center ml-4">
					<Link to={"/"}>
						<Logo />
					</Link>
					<Suspense fallback={""}>
						<Menu />
					</Suspense>
				</div>
			</div>
		</>
	);
};

export default HeaderLeftContainer;
