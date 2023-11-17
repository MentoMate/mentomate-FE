import Footer from "@components/common/footer/Footer";
import Header from "@components/common/header/Header";
import Spinner from "@components/common/spinner/Spinner";
import { lazy, Suspense } from "react";

const PaymentConfirmation = lazy(
	() => import("@/components/mentoringPayment/PaymentConfirmation"),
);

const PaymentPage = () => {
	return (
		<div>
			<Header />
			<Suspense fallback={<Spinner />}>
				<PaymentConfirmation />
				<Footer />
			</Suspense>
		</div>
	);
};

export default PaymentPage;
