import { useEffect, useState } from "react";
import logo from "../logo.svg";
import { getTestMsg } from "../apis/openRoutes";

function Home() {
	const [msg, setMsg] = useState("Loading");
	useEffect(() => {
		showBeMsg();
	}, []);

	const showBeMsg = async () => {
		const res: any = await getTestMsg();
		console.log(res);
		if (res.message) setMsg(res.message);
		else setMsg("Failed to connect to BE");
	};

	return (
		<header className="App-header">
			<h1> {msg}</h1>
			<p> JS Warriors- We play to win!</p>
			<img src={logo} className="App-logo" alt="logo" />

			<a
				className="App-link"
				href="/sentiment-analyzer"
				rel="noopener noreferrer"
			>
				Go to sentiment analyzer
			</a>
		</header>
	);
}

export default Home;
