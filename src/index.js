import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import App from "./App";
import CryptoProvider from "./contexts/crypto.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<StyledEngineProvider injectFirst>
			<BrowserRouter>
				<CryptoProvider>
					<App />
				</CryptoProvider>
			</BrowserRouter>
		</StyledEngineProvider>
	</React.StrictMode>
);
