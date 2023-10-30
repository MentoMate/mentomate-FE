import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router.tsx";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";

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
