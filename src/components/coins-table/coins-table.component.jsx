import styles from "./coins-table.module.css";
import { useState, useContext, useEffect, useCallback } from "react";
import { CoinList } from "../../util/api";
import { cryptoContext } from "../../contexts/crypto.context";
import axios from "axios";
import {
	LinearProgress,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import CoinTableRow from "../coin-table-row/coin-table-row.component";

const ITEMS_PER_PAGE = 10;

const rows = ["Coin", "24h Change", "Price", "Market Cap", "Action"];

function CoinsTable() {
	const { currency } = useContext(cryptoContext);
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);

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
		const searchLow = search.toLowerCase();
		return coins.filter(
			(coin) =>
				coin.name.toLowerCase().includes(searchLow) ||
				coin.symbol.toLowerCase().includes(searchLow)
		);
	};

	const handleChange = (_, newPage) => {
		setPage(newPage);
		window.scroll(0, 650);
	};

	const startIdx = (page - 1) * 10;
	const filteredCoins = search ? handleSearch() : coins;
	const coinsToShow = filteredCoins.slice(startIdx, startIdx + ITEMS_PER_PAGE);

	return (
		<>
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
				{loading ? (
					<LinearProgress className={styles.progress} />
				) : (
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
						<TableBody>
							{coinsToShow.map((coin) => (
								<CoinTableRow key={coin.id} coin={coin} />
							))}
						</TableBody>
					</Table>
				)}
			</TableContainer>

			{!loading && (
				<Pagination
					className={styles.pagination}
					count={+(filteredCoins.length / ITEMS_PER_PAGE).toFixed(0) || 1}
					color="primary"
					onChange={handleChange}
				/>
			)}
		</>
	);
}

export default CoinsTable;
