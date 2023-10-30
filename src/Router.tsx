import ChoiceSignUpTypePage from "@pages/ChoiceSignUpTypePage";
import MentoringPage from "@pages/MentoringPage";
import MentoringDetailPage from "@pages/MentoringDetailPage";
import MentorPage from "@pages/MentorPage";
import MentoringRoom from "@pages/MentoringRoomPage";
import MentorDetailPage from "@pages/MentorDetailPage";
import CommunityPage from "@pages/CommunityPage";
import CommunityDetailPage from "@pages/CommunityDetailPage";
import LoginPage from "@pages/LoginPage";
import MainPage from "@pages/MainPage";
import MentorRegistrationPage from "@pages/MentorRegistrationPage";
import SignUpPage from "@pages/SignUpPage";
import OauthRedirect from "./components/login/OauthRedirect";
import MentoringRegistrationPage from "@pages/MentoringRegistrationPage";
import SuccessSignUpPage from "@pages/SuccessSignUpPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";

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
				<Route path="/successSignUp" element={<SuccessSignUpPage />} />
				<Route path="/mentoring" element={<MentoringPage />} />
				<Route path="/mentoringDetail" element={<MentoringDetailPage />} />
				<Route path="/mentor" element={<MentorPage />} />
				<Route path="/mentoringRoom" element={<MentoringRoom />} />
				<Route path="/mentorDetail" element={<MentorDetailPage />} />
				<Route path="/community" element={<CommunityPage />} />
				<Route path="/communityDetail" element={<CommunityDetailPage />} />
				<Route
					path="/mentorRegistration"
					element={<MentorRegistrationPage />}
				/>
				<Route
					path="/mentoringRegistration"
					element={<MentoringRegistrationPage />}
				/>
			</Routes>
		</QueryClientProvider>
	);
}

export default Router;
