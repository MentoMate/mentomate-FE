import { useState, lazy, Suspense } from "react";

const AfterLogin = lazy(() => import("./AfterLogin"));
const BeforeLogin = lazy(() => import("./BeforeLogin"));

const HeaderRightContainer = () => {
	const [isLogin] = useState<boolean>(true);

	return (
		<>
			<Suspense fallback={""}>
				{isLogin ? <AfterLogin /> : <BeforeLogin />}
			</Suspense>
		</>
	);
};

export default HeaderRightContainer;
