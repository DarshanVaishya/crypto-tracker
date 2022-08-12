import styles from "./header.module.css";
import { AppBar, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { cryptoContext } from "../../contexts/crypto.context";

function Header() {
	const navigate = useNavigate();
	const { currency, setCurrency } = useContext(cryptoContext);
	const clickHandler = () => navigate("/");
	const changeHandler = (e) => setCurrency(e.target.value);

	return (
		<>
			<AppBar color="transparent" position="static">
				<Container>
					<Toolbar>
						<Typography className={styles.title} variant="h5">
							<span onClick={clickHandler}>Crypto Tracker</span>
						</Typography>

						<Select
							value={currency}
							variant="outlined"
							className={styles.select}
							onChange={changeHandler}
						>
							<MenuItem value="USD">USD</MenuItem>
							<MenuItem value="CAD">CAD</MenuItem>
							<MenuItem value="EUR">EUR</MenuItem>
							<MenuItem value="INR">INR</MenuItem>
						</Select>
					</Toolbar>
				</Container>
			</AppBar>

			<Outlet />
		</>
	);
}

export default Header;
