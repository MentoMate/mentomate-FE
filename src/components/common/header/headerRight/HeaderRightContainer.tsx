import { loginState } from "@/state/loginState";
import { Suspense, lazy } from "react";
import { useRecoilValue } from "recoil";

const AfterLogin = lazy(() => import("./AfterLogin"));
const BeforeLogin = lazy(() => import("./BeforeLogin"));

const HeaderRightContainer = () => {
  const isLogin = useRecoilValue(loginState);

	return (
		<>
			<Suspense fallback={""}>
				{isLogin ? <AfterLogin /> : <BeforeLogin />}
			</Suspense>
		</>
	);
};

export default HeaderRightContainer;
