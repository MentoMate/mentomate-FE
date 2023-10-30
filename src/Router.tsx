import ChoiceSignUpTypePage from "@pages/ChoiceSignUpTypePage";
import CommunityDetailPage from "@pages/CommunityDetailPage";
import CommunityPage from "@pages/CommunityPage";
import LoginPage from "@pages/LoginPage";
import MainPage from "@pages/MainPage";
import MentorDetailPage from "@pages/MentorDetailPage";
import MentorPage from "@pages/MentorPage";
import MentorRegistrationPage from "@pages/MentorRegistrationPage";
import MentoringDetailPage from "@pages/MentoringDetailPage";
import MentoringPage from "@pages/MentoringPage";
import SignUpPage from "@pages/SignUpPage";
import SuccessSignUpPage from "@pages/SuccessSignUpPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import OauthRedirect from "./components/login/OauthRedirect";

const queryClient = new QueryClient();

function Router() {
	return (
		<QueryClientProvider client={queryClient}>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/choiceSignUpType" element={<ChoiceSignUpTypePage />} />
				<Route path="/login/oauth2/code/kakao" element={<OauthRedirect />} />
				<Route path="/signUp" element={<SignUpPage />} />
				<Route path="/mentoring" element={<MentoringPage />} />
				<Route path="/mentoringDetail" element={<MentoringDetailPage />} />
				<Route path="/mentor" element={<MentorPage />} />
				<Route path="/mentorDetail" element={<MentorDetailPage />} />
				<Route path="/community" element={<CommunityPage />} />
				<Route path="/communityDetail" element={<CommunityDetailPage />} />
				<Route path="/successSignUp" element={<SuccessSignUpPage />} />
				<Route
					path="/mentorRegistration"
					element={<MentorRegistrationPage />}
				/>
			</Routes>
		</QueryClientProvider>
	);
}

export default Router;
