import KaKaoCallback from "@components/login/KaKaoCallback";
import NaverCallback from "@components/login/NaverCallback";
import ChoiceSignUpTypePage from "@pages/ChoiceSignUpTypePage";
import LoginPage from "@pages/LoginPage";
import MentoringRoom from "@pages/MentoringRoomPage";
import UserMyPage from "@/pages/UserMyPage";
import PaymentSuccessPage from "@pages/PaymentSuccessPage";
import SignUpPage from "@pages/SignUpPage";
import SuccessSignUpPage from "@pages/SuccessSignUpPage";
import { EventSourcePolyfill } from "event-source-polyfill";
import { Suspense, lazy, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Footer from "@components/common/footer/Footer";
import Header from "@components/common/header/Header";
import LazyLoading from "@components/common/spinner/lazyLoading";
import {
	NO_USE_CHAT_SCROLL_LOCATION,
	NO_USE_FOOTER_LOCATION,
	NO_USE_HEADER_LOCATION,
} from "./constants/commonComponentLocation";
import useAxios from "./hooks/useAxios";
import NotFound404Page from "@pages/NotFound404Page";
import PaymentPage from "@pages/PaymentPage";
import { loginState } from "./state/loginState";
import { notification, notificationEmitterId } from "./state/notification";
import { getCookie } from "./utils/cookies";
import { checkAuthToken } from "./utils/checkAuthToken";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			suspense: true,
			staleTime: 1000 * 60,
			cacheTime: 1000 * 60 * 5,
		},
	},
});

const MainPage = lazy(() => import("@pages/MainPage"));
const MentoringPage = lazy(() => import("@pages/MentoringPage"));
const MentoringRegistrationPage = lazy(
	() => import("@pages/MentoringRegistrationPage"),
);
const MentoringEditPage = lazy(() => import("@pages/MentoringEditPage"));
const MentoringDetailPage = lazy(() => import("@pages/MentoringDetailPage"));
const MentorPage = lazy(() => import("@pages/MentorPage"));
const MentorRegistrationPage = lazy(
	() => import("@pages/MentorRegistrationPage"),
);
const MentorDetailPage = lazy(() => import("@pages/MentorDetailPage"));
const CommunityPage = lazy(() => import("@pages/CommunityPage"));
const CommunityRegistrationPage = lazy(
	() => import("@pages/CommunityRegistrationPage"),
);
const CommunityDetailPage = lazy(() => import("@pages/CommunityDetailPage"));
const EditCommunityPage = lazy(() => import("@pages/EditCommunityPage"));

const ChatAndScrollContainer = lazy(
	() => import("@components/common/chatAndScrollTop/ChatAndScrollContainer"),
);

function Router() {
	const location = useLocation();
	const setReceiveNotificationState = useSetRecoilState(notification);
	const isLogin = useRecoilValue(loginState);
	const { fetchDataUseAxios } = useAxios();
	const [emitterId, setEmitterId] = useRecoilState(notificationEmitterId);

	const init = () => {
		checkAuthToken();

		const ACCESS_TOKEN = getCookie("accessToken");

		const eventSource = new EventSourcePolyfill(
			`https://mentormate.site/subscribe`,
			{
				headers: {
					Authorization: `Bearer ${ACCESS_TOKEN}`,
				},
				heartbeatTimeout: 1000 * 60 * 60,
			},
		);

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
					close();
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
		<>
			<QueryClientProvider client={queryClient}>
				{!NO_USE_HEADER_LOCATION.includes(location.pathname) && <Header />}
				<Suspense fallback={<LazyLoading />}>
					<Routes>
						<Route path="/" element={<MainPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route
							path="/choiceSignUpType"
							element={<ChoiceSignUpTypePage />}
						/>
						<Route
							path="/login/oauth2/code/kakao"
							element={<KaKaoCallback />}
						/>
						<Route
							path="/login/oauth2/code/naver"
							element={<NaverCallback />}
						/>
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
							path="/mentoringRoom/:id/:startDate/:endDate"
							element={<MentoringRoom />}
						/>
						<Route
							path="/mentorDetail/:mentorId"
							element={<MentorDetailPage />}
						/>
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
						<Route path="/userMyPage" element={<UserMyPage />} />
						<Route path="/payment/:mentoringId" element={<PaymentPage />} />
						<Route path="/paymentSuccess" element={<PaymentSuccessPage />} />
						<Route
							path="/mentorRegistration"
							element={<MentorRegistrationPage />}
						/>
						<Route
							path="/mentoringRegistration"
							element={<MentoringRegistrationPage />}
						/>
						<Route path="/*" element={<NotFound404Page />} />
					</Routes>
				</Suspense>
				{!NO_USE_CHAT_SCROLL_LOCATION.includes(location.pathname) &&
					!location.pathname.includes("/mentoringRoom") && (
						<ChatAndScrollContainer />
					)}
				{!NO_USE_FOOTER_LOCATION.includes(location.pathname) && <Footer />}
			</QueryClientProvider>
		</>
	);
}

export default Router;
