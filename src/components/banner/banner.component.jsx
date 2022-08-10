import { Typography } from "@mui/material";
import styles from "./banner.module.css";

function Banner() {
	return (
		<div className={styles.banner}>
			<div className={styles.bannerContent}>
				<div className={styles.tagline}>
					<Typography variant="h2" className={styles.title}>
						Crypto Tracker
					</Typography>

					<Typography variant="subtitle2" className={styles.subtext}>
						Your one-stop source for crypto
					</Typography>
				</div>
			</div>
		</div>
	);
}

export default Banner;