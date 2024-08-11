export interface SentimentAnalyzerPayload {
	inputText: string;
	autoCorrection: boolean;
}

interface CorrectedWords {
	word: string;
	correctedWord: string;
	options: string[];
}

export interface SentimentAnalyzerResponse {
	status?: true;
	message?: string;
	lexedReview?: string;
	alphaOnlyReview?: string;
	correctedWords?: CorrectedWords[];
	filteredReview?: string[];
	score?: number;
}

export interface TableDataSource {
	key: string;
	misspelledWord: string;
	correctedWord: string;
	options: string;
}

export interface ErrorMessage {
	message: string;
}

// wrapperCol={{ offset: 8, span: 16 }}
