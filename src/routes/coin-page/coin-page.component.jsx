import styles from "./coin-page.module.css";

import axios from "axios";
import { useContext, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cryptoContext } from "../../contexts/crypto.context";
import { SingleCoin } from "../../util/api";
import { CircularProgress, Typography } from "@mui/material";
import CoinInfo from "../../components/coin-info/coin-info.component";
import parse from "html-react-parser";
import { numberWithCommas } from "../../util/misc";

function CoinPage() {
	const { id } = useParams();
	const { currency, symbol } = useContext(cryptoContext);
	const [coin, setCoin] = useState(null);

	const fetchCoin = useCallback(async () => {
		const { data } = await axios.get(SingleCoin(id));
		setCoin(data);
		console.log(data);
	}, [id]);

	useEffect(() => {
		console.log("Fetching coin");
		fetchCoin();
	}, [fetchCoin]);

	if (!coin)
		return (
			<div className={styles.loader}>
				<CircularProgress color="primary" />
			</div>
		);

	return (
		<div className={styles.container}>
			<div className={styles.sidebar}>
				<img
					src={coin.image.large}
					className={styles.img}
					alt={coin.name}
					height="200"
				/>

				<Typography variant="h3" className={styles.heading}>
					{coin.name}
				</Typography>

				<Typography variant="subtitle1" className={styles.description}>
					{parse(coin.description.en.split(". ")[0])}.
				</Typography>

				<div className={styles.marketData}>
					<span className={styles.dataWrapper}>
						<Typography variant="h5" className={styles.heading}>
							Rank:
						</Typography>
						&nbsp; &nbsp;
						<Typography variant="h5">{coin.market_cap_rank}</Typography>
					</span>

					<span className={styles.dataWrapper}>
						<Typography variant="h5" className={styles.heading}>
							Current Price:
						</Typography>
						&nbsp; &nbsp;
						<Typography variant="h5">
							{symbol}{" "}
							{numberWithCommas(
								coin.market_data.current_price[currency.toLowerCase()]
							)}
						</Typography>
					</span>

					<span className={styles.dataWrapper}>
						<Typography variant="h5" className={styles.heading}>
							Market Cap:
						</Typography>
						&nbsp; &nbsp;
						<Typography variant="h5">
							{symbol}{" "}
							{numberWithCommas(
								coin.market_data.market_cap[currency.toLowerCase()]
									.toString()
									.slice(0, -6)
							)}
							M
						</Typography>
					</span>
				</div>
			</div>

			<CoinInfo coin={coin} />
		</div>
	);
}

export default CoinPage;
