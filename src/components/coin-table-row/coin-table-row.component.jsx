import styles from "./coin-table-row.module.css";

import { Button, TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { cryptoContext } from "../../contexts/crypto.context";
import { numberWithCommas } from "../../util/misc";

function CoinTableRow({ coin }) {
	const { symbol } = useContext(cryptoContext);
	const navigate = useNavigate();
	const profit = coin.price_change_percentage_24h >= 0;
	const clickHandler = () => navigate(`/coins/${coin.id}`);

	return (
		<TableRow className={styles.row} key={coin.name}>
			<TableCell component="th" scope="row" className={styles.cell}>
				<img
					src={coin.image}
					alt={coin.name}
					height="50"
					className={styles.img}
				/>

				<div className={styles.wrapper}>
					<span className={styles.symbol}>{coin.symbol}</span>
					<span className={styles.name}>{coin.name}</span>
				</div>
			</TableCell>

			<TableCell
				className={styles.change}
				sx={{ color: profit ? "green" : "red" }}
			>
				{coin.price_change_percentage_24h.toFixed(2)}%
			</TableCell>

			<TableCell className={styles.price}>
				{symbol} {coin.current_price.toFixed(2)}
			</TableCell>

			<TableCell className={styles.market}>
				{symbol} {numberWithCommas(coin.market_cap.toString().slice(0, -6))}M
			</TableCell>

			<TableCell>
				<Button variant="outlined" onClick={clickHandler}>
					View
				</Button>
			</TableCell>
		</TableRow>
	);
}

export default CoinTableRow;
