import axios from "axios";
import {
	ErrorMessage,
	SentimentAnalyzerPayload,
	SentimentAnalyzerResponse,
} from "../interfaces/types";

const api = axios.create({
	//   baseURL: process.env.REACT_APP_BASE_URL,
	baseURL: "http://localhost:4000",
});

export const getTestMsg = async () => {
	let data;
	try {
		data = await api.get(``);
	} catch (e) {
		return { message: "Failed to connect to BE" };
	}
	return data.data;
};

export const analyzeSentiment = async (
	payload: SentimentAnalyzerPayload
): Promise<SentimentAnalyzerResponse> => {
	let data;
	try {
		data = await api.post(`/api/s-analyzer/sentiment-analyzer`, payload);
	} catch (e) {
		return { message: "Failed to connect to BE" };
	}
	return data.data;
};
