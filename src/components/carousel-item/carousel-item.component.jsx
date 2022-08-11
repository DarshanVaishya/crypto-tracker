import styles from "./carousel-item.module.css";
import { useContext } from "react";
import { cryptoContext } from "../../contexts/crypto.context";
import { numberWithCommas } from "../../util/misc";
import { useNavigate } from "react-router-dom";

function CarouselItem({ coin }) {
	const percStyle =
		coin.price_change_percentage_24h < 0 ? styles.down : styles.up;
	const navigate = useNavigate();
	const { symbol } = useContext(cryptoContext);
	const clickHandler = () => navigate(`/coins/${coin.id}`);

	return (
		<div className={styles.container} onClick={clickHandler}>
			<img
				src={coin.image}
				alt={coin.name}
				height="80"
				className={styles.img}
			/>
			<p className={styles.maintext}>
				{coin.symbol.toUpperCase()}{" "}
				<span className={percStyle}>
					{coin.price_change_percentage_24h.toFixed(2)}%
				</span>
			</p>
			<p className={styles.subtext}>
				{symbol} {numberWithCommas(coin.current_price.toFixed(2))}
			</p>
		</div>
	);
}

export default CarouselItem;
