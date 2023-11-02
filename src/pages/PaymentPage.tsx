import Header from "@components/common/header/Header";
import Footer from "@components/common/footer/Footer";
import Spinner from "@components/common/spinner/Spinner";
import { lazy, Suspense } from "react";
import useCheckAuth from "@/hooks/useCheckAuth";

const PaymentConfirmation = lazy(
	() => import("@/components/mentoringpayment/PaymentConfirmation"),
);

const PaymentPage = () => {
	useCheckAuth("/payment");

	return (
		<div>
			<Header />
			<Suspense fallback={<Spinner />}>
				<PaymentConfirmation />
			</Suspense>
			<Footer />
		</div>
	);
};

export default PaymentPage;
