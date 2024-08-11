import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import TestRoute from "./components/sentiment-analyzer";
import PageNotFound from "./components/404";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="sentiment-analyzer" element={<TestRoute />} />
				<Route path="*" element={<PageNotFound />} />.
			</Routes>
		</div>
	);
}

export default App;
