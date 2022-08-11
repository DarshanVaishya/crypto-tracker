import styles from "./coins-table.module.css";
import { useState, useContext, useEffect, useCallback } from "react";
import { CoinList } from "../../util/api";
import { cryptoContext } from "../../contexts/crypto.context";
import axios from "axios";
import {
	createTheme,
	LinearProgress,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	ThemeProvider,
	Typography,
} from "@mui/material";
import { color } from "@mui/system";
import CoinTableRow from "../coin-table-row/coin-table-row.component";

const darkTheme = createTheme({
	palette: {
		primary: {
			main: "#fff",
		},
		mode: "dark",
	},
});

const rows = ["Coin", "24h Change", "Price", "Market Cap", "Action"];

function CoinsTable() {
	const { currency } = useContext(cryptoContext);
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState("");

	const fetchCoins = useCallback(async () => {
		setLoading(true);
		const { data } = await axios.get(CoinList(currency));
		setCoins(data);
		setLoading(false);
	}, [currency]);

	useEffect(() => {
		fetchCoins();
	}, [fetchCoins]);

	const handleSearch = () => {
		return color.filter(
			(coin) =>
				coin.name.toLowerCase().includes(search) ||
				coin.symbol.toLowerCase().inclides(search)
		);
	};

	const coinsToShow = search ? handleSearch() : coins;

	return (
		<ThemeProvider theme={darkTheme}>
			<Typography className={styles.header} variant="h4">
				Crypto currency prices by market cap
			</Typography>

			<TextField
				className={styles.search}
				label="Search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>

			<TableContainer>
				<Table>
					<TableHead className={styles.head}>
						<TableRow>
							{rows.map((head) => (
								<TableCell className={styles.headCell} key={head}>
									{head}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
				</Table>

				{loading ? (
					<LinearProgress className={styles.progress} />
				) : (
					<Table>
						<TableBody>
							{coinsToShow.map((coin) => (
								<CoinTableRow key={coin.id} coin={coin} />
							))}
						</TableBody>
					</Table>
				)}
			</TableContainer>
		</ThemeProvider>
	);
}

export default CoinsTable;
