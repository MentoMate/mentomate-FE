import { QueryClientProvider, QueryClient } from "react-query";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ChoiceSignUpTypePage from "./pages/ChoiceSignUpTypePage";
import MentoringPage from "./pages/MentoringPage";

const queryClient = new QueryClient();

function Router() {
	return (
		<QueryClientProvider client={queryClient}>
			<Routes>
				{/* <Route path="/" element={"메인페이지"}> */}
				<Route path="/login" element={<LoginPage />} />
				<Route path="/choiceSignUpType" element={<ChoiceSignUpTypePage />} />
				<Route path="/signUp" element={<SignUpPage />} />
				<Route path="/mentoring" element={<MentoringPage />} />
			</Routes>
		</QueryClientProvider>
	);
}

export default Router;
