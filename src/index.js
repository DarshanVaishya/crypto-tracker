import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
	createTheme,
	StyledEngineProvider,
	ThemeProvider,
} from "@mui/material/styles";
import App from "./App";
import CryptoProvider from "./contexts/crypto.context";

const theme = createTheme({
	palette: {
		primary: {
			main: "#00a97f",
		},
		secondary: {
			main: "#383645",
		},
		grey: {
			main: "#c2c2c2",
		},
		mode: "dark",
	},
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<StyledEngineProvider injectFirst>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CryptoProvider>
						<App />
					</CryptoProvider>
				</ThemeProvider>
			</BrowserRouter>
		</StyledEngineProvider>
	</React.StrictMode>
);
