import Header from "@components/common/header/Header";
import Footer from "@components/common/footer/Footer";
import Spinner from "@components/common/spinner/Spinner";
import { lazy, Suspense } from "react";

const PaymentSuccess = lazy(
	() => import("@/components/mentoringDetail/PaymentSuccess"),
);

const PaymentSuccessPage = () => {
	return (
		<div>
			<Header />
			<Suspense fallback={<Spinner />}>
				<PaymentSuccess />
			</Suspense>
			<Footer />
		</div>
	);
};
export default PaymentSuccessPage;
