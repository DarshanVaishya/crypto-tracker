import styles from "./carousel.module.css";
import "react-alice-carousel/lib/alice-carousel.css";

import axios from "axios";
import { useContext, useState, useEffect, useCallback } from "react";
import { cryptoContext } from "../../contexts/crypto.context";
import { TrendingCoins } from "../../util/api";
import AliceCarousel from "react-alice-carousel";
import CarouselItem from "../carousel-item/carousel-item.component";

const responsiveOb = {
	0: {
		items: 2,
	},
	512: {
		items: 4,
	},
};

function Carousel() {
	const [trending, setTrending] = useState([]);
	const { currency } = useContext(cryptoContext);

	const fetchTrendingCoins = useCallback(async () => {
		setTrending([]);

		const { data } = await axios.get(TrendingCoins(currency));
		console.log(data);
		setTrending(data);
	}, [currency]);

	useEffect(() => {
		fetchTrendingCoins();
	}, [currency, fetchTrendingCoins]);

	const items = trending.map((coin) => <CarouselItem coin={coin} />);

	if (trending.length === 0) return <h3>Loading...</h3>;
	return (
		<div className={styles.container}>
			<AliceCarousel
				mouseTracking
				infinite
				autoPlayInterval={3000}
				animationDuration={1500}
				disableDotsControls
				disableButtonsControls
				responsive={responsiveOb}
				autoPlay
				items={items}
			/>
		</div>
	);
}

export default Carousel;
