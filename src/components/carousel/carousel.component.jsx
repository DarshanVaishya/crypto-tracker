import styles from "./carousel.module.css";
import "react-alice-carousel/lib/alice-carousel.css";

import axios from "axios";
import { useContext, useState, useEffect, useCallback } from "react";
import { cryptoContext } from "../../contexts/crypto.context";
import { TrendingCoins } from "../../util/api";
import AliceCarousel from "react-alice-carousel";
import CarouselItem from "../carousel-item/carousel-item.component";
import { CircularProgress } from "@mui/material";

const responsiveOb = {
	0: {
		items: 2,
	},
	650: {
		items: 4,
	},
	1000: {
		items: 5,
	},
};

function Carousel() {
	const [trending, setTrending] = useState([]);
	const { currency } = useContext(cryptoContext);

	const fetchTrendingCoins = useCallback(async () => {
		setTrending([]);

		const { data } = await axios.get(TrendingCoins(currency));
		setTrending(data);
	}, [currency]);

	useEffect(() => {
		fetchTrendingCoins();
	}, [currency, fetchTrendingCoins]);

	const items = trending.map((coin) => <CarouselItem coin={coin} />);

	return (
		<div className={styles.container}>
			{trending.length === 0 ? (
				<div className={styles.loader}>
					<CircularProgress color="inherit" />
				</div>
			) : (
				<AliceCarousel
					mouseTracking
					infinite
					autoPlayInterval={3000}
					animationDuration={1500}
					disableDotsControls
					disableButtonsControls
					autoPlay
					responsive={responsiveOb}
					items={items}
				/>
			)}
		</div>
	);
}

export default Carousel;
