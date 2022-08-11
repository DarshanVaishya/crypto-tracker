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
		// TODO: Improve this logic
		const map = {
			USD: "$",
			CAD: "CA $",
			EUR: "€",
			INR: "₹",
		};

		const currSymbol = map[currency] || null;
		if (!currSymbol)
			throw new Error(`cryptoContext: Invalid currency ${currency} given.`);

		setSymbol(currSymbol);
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
