const router = require("express").Router();
const bodyParser = require("body-parser");
const spellchecker = require("spellchecker");
const aposToLexForm = require("apos-to-lex-form");
const SW = require("stopword");
const natural = require("natural");

// Middleware setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Default route
router.all("/", function (req, res) {
	return res.json({
		status: true,
		message: "Spelling correction controller...",
	});
});

router.get("/spellchecker", function (req, res) {
	// Input text with some spelling errors
	const inputText = req.body.inputText;

	const sentences = inputText.split(".");

	const correctedSentences = [];
	sentences.forEach((sentence) => {
		// Split the sentences into individual words
		const words = sentence.split(/\s+/);

		// Create an array to store corrected words
		const correctedWords = [];

		// Check each word for spelling errors and correct if needed
		words.forEach((word) => {
			if (spellchecker.isMisspelled(word)) {
				const correctedWord =
					spellchecker.getCorrectionsForMisspelling(word)[0];
				correctedWords.push(correctedWord);
			} else {
				correctedWords.push(word);
			}
		});

		// // Join the corrected words to form the final corrected text
		const correctedSentence = correctedWords.join(" ");
		correctedSentences.push(correctedSentence);
	});

	const correctedText = correctedSentences.join(".");

	return res.json({
		status: true,
		message: "Sentiment analyzer controller...",
		sentences,
		correctedText,
		guess: spellchecker.isMisspelled("is"),
	});
});

router.post("/sentiment-analyzer", function (req, res) {
	const inputText = req.body.inputText;
	const autoCorrection = req.body.autoCorrection;

	// Converting contractions into standard lexicon
	const lexedReview = aposToLexForm(inputText);

	// Removing non-alphabetical and special characters
	const alphaOnlyReview = lexedReview.replace(/[^a-zA-Z\s]+/g, "");

	// Tokenization
	const { WordTokenizer } = natural;
	const tokenizer = new WordTokenizer();
	const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);

	const correctedWords = [];

	if (autoCorrection) {
		// Check each word for spelling errors and correct if needed

		tokenizedReview.forEach((word, index) => {
			if (spellchecker.isMisspelled(word)) {
				const correctedWord = aposToLexForm(
					spellchecker.getCorrectionsForMisspelling(word)[0]
				).toLowerCase();
				correctedWords.push({
					key: index,
					misspelledWord: word,
					correctedWord,
					options: spellchecker.getCorrectionsForMisspelling(word).join(","),
				});
				tokenizedReview[index] = correctedWord;
			} else {
				tokenizedReview[index] = word.toLowerCase();
			}
		});
	} else {
		tokenizedReview.forEach((word, index) => {
			tokenizedReview[index] = word.toLowerCase();
		});
	}

	const filteredReview = SW.removeStopwords(tokenizedReview);

	const { SentimentAnalyzer, PorterStemmer } = natural;
	const analyzer = new SentimentAnalyzer("English", PorterStemmer, "afinn");
	const analysis = analyzer.getSentiment(filteredReview);

	return res.json({
		status: true,
		message: "Sentiment analyzer controller...",
		lexedReview,
		alphaOnlyReview,
		correctedWords,
		filteredReview,
		score: analysis,
	});
});

module.exports = router;
