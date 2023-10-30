import { useNavigate } from "react-router-dom";
import Loading from "../common/spinner/Loading";
import { useEffect } from "react";

const OauthRedirect = () => {
	const navigate = useNavigate();
	const params = new URL(document.URL).searchParams;
	const code = params.get("code");

	useEffect(() => {
		// 인가코드
		console.log(code);
		navigate("/");
	}, []);

	return (
		<>
			<Loading />
		</>
	);
};

export default OauthRedirect;
