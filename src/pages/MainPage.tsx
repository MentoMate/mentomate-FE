import { lazy } from "react";

const Main = lazy(() => import("../components/main/Main"));

const MainPage = () => {
	return <Main />;
};

export default MainPage;
