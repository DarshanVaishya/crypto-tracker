import "./App.css";

import { Route, Routes } from "react-router-dom";
import Header from "./components/header/header.component";
import HomePage from "./routes/home-page/home-page.component";
import CoinPage from "./routes/coin-page/coin-page.component";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Header />}>
					<Route index element={<HomePage />} />
					<Route path="/coins/:id" element={<CoinPage />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
