import KaKaoCallback from "@components/login/KaKaoCallback";
import NaverCallback from "@components/login/NaverCallback";
import ChoiceSignUpTypePage from "@pages/ChoiceSignUpTypePage";
import CommunityDetailPage from "@pages/CommunityDetailPage";
import CommunityPage from "@pages/CommunityPage";
import CommunityRegistrationPage from "@pages/CommunityRegistrationPage";
import LoginPage from "@pages/LoginPage";
import MainPage from "@pages/MainPage";
import MentorDetailPage from "@pages/MentorDetailPage";
import MentorPage from "@pages/MentorPage";
import MentorRegistrationPage from "@pages/MentorRegistrationPage";
import MentoringDetailPage from "@pages/MentoringDetailPage";
import MentoringEditPage from "@pages/MentoringEditPage";
import MentoringPage from "@pages/MentoringPage";
import MentoringRegistrationPage from "@pages/MentoringRegistrationPage";
import MentoringRoom from "@pages/MentoringRoomPage";
import Mypage from "@pages/MyPage";
import PaymentSuccessPage from "@pages/PaymentSuccessPage";
import SignUpPage from "@pages/SignUpPage";
import SuccessSignUpPage from "@pages/SuccessSignUpPage";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import useAxios from "./hooks/useAxios";
import EditCommunityPage from "./pages/EditCommunityPage";
import PaymentPage from "./pages/PaymentPage";
import { loginState } from "./state/loginState";
import { notification, notificationEmitterId } from "./state/notification";
import { getCookie } from "./utils/cookies";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			suspense: true,
			staleTime: 1000 * 60,
			cacheTime: 1000 * 60 * 5,
		},
	},
});

function Router() {
	const setReceiveNotificationState = useSetRecoilState(notification);
	const isLogin = useRecoilValue(loginState);
	const { fetchDataUseAxios } = useAxios();
	const [emitterId, setEmitterId] = useRecoilState(notificationEmitterId);

	const init = () => {
		const ACCESS_TOKEN = getCookie("accessToken");

		const eventSource = new EventSourcePolyfill(`/api/subscribe`, {
			headers: {
				Authorization: `Bearer ${ACCESS_TOKEN}`,
			},
			heartbeatTimeout: 1000 * 60 * 60,
		});

		eventSource.onmessage = (event) => {
			const message = JSON.parse(event.data);

			if (message.type === "SUBSCRIBE") {
				setEmitterId(message.data.emitterId);
			}

			if (message.type === "RECEIVE") {
				setReceiveNotificationState((prev) => prev + 1);
			}
		};

		eventSource.onerror = () => {
			eventSource.close();
		};

		const close = () => {
			eventSource.close();
		};

		return { close };
	};

	const deleteEmitter = async () => {
		await fetchDataUseAxios("useTokenAxios", {
			method: "DELETE",
			url: `/emitter?emitterId=${emitterId}`,
		});
	};

	useEffect(() => {
		if (isLogin) {
			const { close } = init();

			const timer = setInterval(
				() => {
					init();
				},
				1000 * 60 * 60,
			);

			return () => {
				clearInterval(timer);
				close();
				deleteEmitter();
			};
		}
	}, [isLogin]);

	return (
		<QueryClientProvider client={queryClient}>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/choiceSignUpType" element={<ChoiceSignUpTypePage />} />
				<Route path="/login/oauth2/code/kakao" element={<KaKaoCallback />} />
				<Route path="/login/oauth2/code/naver" element={<NaverCallback />} />
				<Route path="/signUp" element={<SignUpPage />} />
				<Route path="/successSignUp" element={<SuccessSignUpPage />} />
				<Route path="/mentoring" element={<MentoringPage />} />
				<Route
					path="/mentoringDetail/:mentoringId"
					element={<MentoringDetailPage />}
				/>
				<Route
					path="/mentoringEdit/:mentoringId"
					element={<MentoringEditPage />}
				/>
				<Route path="/mentor" element={<MentorPage />} />
				<Route
					path="/mentoringRoom/:id/:startDate/:endDate/"
					element={<MentoringRoom />}
				/>
				<Route path="/mentorDetail/:mentorId" element={<MentorDetailPage />} />
				<Route path="/community" element={<CommunityPage />} />
				<Route
					path="/communityDetail/:communityId"
					element={<CommunityDetailPage />}
				/>
				<Route
					path="/communityRegistration"
					element={<CommunityRegistrationPage />}
				/>
				<Route
					path="/communityEdit/:communityId"
					element={<EditCommunityPage />}
				/>
				<Route path="/mypage" element={<Mypage />} />
				<Route path="/payment" element={<PaymentPage />} />
				<Route path="/paymentSuccess" element={<PaymentSuccessPage />} />
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
