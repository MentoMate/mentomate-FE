import { useState } from "react";
import AfterLogin from "./AfterLogin";
import BeforeLogin from "./BeforeLogin";

const HeaderRightContainer = () => {
	const [isLogin] = useState<boolean>(true);

	return <>{isLogin ? <AfterLogin /> : <BeforeLogin />}</>;
};

export default HeaderRightContainer;
