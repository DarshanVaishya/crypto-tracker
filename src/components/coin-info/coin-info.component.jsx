import styles from "./coin-info.module.css";
import axios from "axios";
import { useState, useContext, useCallback, useEffect } from "react";
import { cryptoContext } from "../../contexts/crypto.context";
import { HistoricalChart } from "../../util/api";
import { CircularProgress } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
	CategoryScale,
	Chart as ChartJS,
	LinearScale,
	LineElement,
	PointElement,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

function CoinInfo({ coin }) {
	const [historicData, setHistoricData] = useState([]);
	const [days, setDays] = useState(1);
	const { currency } = useContext(cryptoContext);

	const fetchHistoricalData = useCallback(async () => {
		const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
		setHistoricData(data.prices);
	}, [coin.id, currency, days]);

	useEffect(() => {
		fetchHistoricalData();
	}, [fetchHistoricalData]);

	const labels = historicData.map((data) => {
		const date = new Date(data[0]);
		const time =
			date.getHours() > 12
				? `${date.getHours() - 12}:${date.getMinutes()} PM`
				: `${date.getHours()}:${date.getMinutes()} AM`;

		return days === 1 ? time : date.toLocaleDateString();
	});

	const datasets = [{ data: historicData.map((data) => data[1]) }];

	if (historicData.length === 0)
		return (
			<div className={styles.loader}>
				<CircularProgress color="primary" />
			</div>
		);
	return (
		<div className={styles.container}>
			<Line data={{ labels, datasets }} />{" "}
		</div>
	);
}

export default CoinInfo;
