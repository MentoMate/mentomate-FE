import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router.tsx";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";
import "./input.css";
import "react-quill/dist/quill.snow.css";

//TODO: 나중에 숫자 3자리 콤마 찍기 함수 분리하기
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<CookiesProvider>
			<BrowserRouter>
				<RecoilRoot>
					<Router />
				</RecoilRoot>
			</BrowserRouter>
		</CookiesProvider>
	</React.StrictMode>,
);
