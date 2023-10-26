import { QueryClientProvider, QueryClient } from "react-query";
import { Route, Routes } from "react-router-dom";
import MainPage from "@pages/MainPage";
import LoginPage from "@pages/LoginPage";
import SignUpPage from "@pages/SignUpPage";
import ChoiceSignUpTypePage from "@pages/ChoiceSignUpTypePage";
import MentoringPage from "@pages/MentoringPage";
import MentoringDetailPage from "@pages/MentoringDetailPage";
import MentorPage from "@pages/MentorPage";
import MentorDetailPage from "@pages/MentorDetailPage";
import CommunityPage from "@pages/CommunityPage";
import CommunityDetailPage from "@pages/CommunityDetailPage";

const queryClient = new QueryClient();

function Router() {
	return (
		<QueryClientProvider client={queryClient}>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/choiceSignUpType" element={<ChoiceSignUpTypePage />} />
				<Route path="/signUp" element={<SignUpPage />} />
				<Route path="/mentoring" element={<MentoringPage />} />
				<Route path="/mentoringDetail" element={<MentoringDetailPage />} />
				<Route path="/mentor" element={<MentorPage />} />
				<Route path="/mentorDetail" element={<MentorDetailPage />} />
				<Route path="/community" element={<CommunityPage />} />
				<Route path="/communityDetail" element={<CommunityDetailPage />} />
			</Routes>
		</QueryClientProvider>
	);
}

export default Router;
