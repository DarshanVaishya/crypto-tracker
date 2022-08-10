import React, { createContext, useState } from "react";
import { useEffect } from "react";

export const cryptoContext = createContext({
	currency: "USD",
	symbol: "$",
	setCurrency: () => {},
});

function CryptoProvider({ children }) {
	const [currency, setCurrency] = useState("USD");
	const [symbol, setSymbol] = useState("$");

	useEffect(() => {
		switch (currency) {
			case "USD":
				setSymbol("$");
				break;
			case "CAD":
				setSymbol("CA $");
				break;
			case "INR":
				setSymbol("₹");
				break;

			default:
				throw new Error(
					`cryptoContext: Invalid currency ${currency} provided.`
				);
		}
	}, [currency]);

	const value = {
		currency,
		symbol,
		setCurrency,
	};

	return (
		<cryptoContext.Provider value={value}>{children}</cryptoContext.Provider>
	);
}

export default CryptoProvider;
