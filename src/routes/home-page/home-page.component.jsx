import { Container } from "@mui/material";
import Banner from "../../components/banner/banner.component";
import CoinsTable from "../../components/coins-table/coins-table.component";

function HomePage() {
	return (
		<Container>
			<Banner />
			<CoinsTable />
		</Container>
	);
}

export default HomePage;
