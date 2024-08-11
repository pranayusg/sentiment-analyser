import { useEffect, useState } from "react";
import { analyzeSentiment, getTestMsg } from "../apis/openRoutes";
import { Input, Button, Form, Switch, Table } from "antd";
import { Col, Container, Row } from "react-bootstrap";

const { TextArea } = Input;

function TestRoute() {
	const [autoCorrection, setAutoCorrection] = useState(false);
	const [showTable, setShowTable] = useState(false);
	const [score, setScore] = useState(0);
	const [dataSource, setDataSource] = useState<any>([]);
	const [imgSrc, setImSrc] = useState("");
	const [textAreaValue, setTextAreaValue] = useState("");

	const reset = (eventPlace: string) => {
		if (eventPlace === "onResetClick") setAutoCorrection(false);
		setTextAreaValue("");
		setShowTable(false);
		setScore(0);
		setDataSource([]);
		setImSrc("");
	};

	const columns = [
		{
			title: "Misspelled word",
			dataIndex: "misspelledWord",
			key: "misspelledWord",
		},
		{
			title: "Corrected word",
			dataIndex: "correctedWord",
			key: "correctedWord",
		},
		{
			title: "Other options",
			dataIndex: "options",
			key: "options",
		},
	];

	const onFinish = async (values: any) => {
		reset("onSubmit");
		setTextAreaValue(values.input);
		const payload = { inputText: values.input, autoCorrection };
		const analysisResults = await analyzeSentiment(payload);

		console.log(analysisResults);
		if (analysisResults?.correctedWords?.length) {
			setShowTable(true);
			setDataSource(analysisResults.correctedWords);
		}

		if (analysisResults?.score || analysisResults?.score === 0) {
			setScore(analysisResults.score);
			if (analysisResults.score < 0) setImSrc("/emojis/sadEmoji.png");
			else if (analysisResults.score > 0) setImSrc("/emojis/happyEmoji.png");
			else setImSrc("/emojis/neutralEmoji.png");
		}
	};

	const switchOnChange = async (checked: boolean) => {
		setAutoCorrection(checked);
	};

	return (
		<header className="App-header">
			<div style={{ width: "60%" }}>
				<h2>Input</h2>
				<Form onFinish={onFinish}>
					<Form.Item
						name="input"
						rules={[{ required: true, message: "Please input a paragragh!" }]}
					>
						<TextArea
							placeholder="Input a paragragh"
							autoSize={{ minRows: 6 }}
							defaultValue={textAreaValue}
						/>
					</Form.Item>
					<Form.Item>
						<Container>
							<Row>
								<Col sm={8}>
									<Row>
										<Col sm={2}>
											<p className="autoCorrectText">Auto correct</p>
										</Col>
										<Col sm={1}>
											<Switch
												checked={autoCorrection}
												onChange={switchOnChange}
											/>
										</Col>
									</Row>
								</Col>

								<Col sm={4}>
									<Button type="primary" htmlType="submit">
										Submit
									</Button>
									<Button
										style={{ marginLeft: "8%" }}
										type="primary"
										onClick={() => reset("onResetClick")}
									>
										Reset
									</Button>
								</Col>
							</Row>
						</Container>
					</Form.Item>
				</Form>

				{showTable ? (
					<>
						<h2>Corrections</h2>
						<Table
							dataSource={dataSource}
							columns={columns}
							pagination={false}
						/>
					</>
				) : null}

				{imgSrc ? (
					<div style={{ marginTop: "3%" }}>
						<h2>Result</h2>
						<img src={imgSrc} alt="emoji" />
						<p>Score:{score}</p>{" "}
					</div>
				) : null}
			</div>
		</header>
	);
}

export default TestRoute;

// {correctedData ? (
// 	<>
// 		{" "}
// 		<h2>Auto correction</h2>
// 		<TextArea readOnly value={correctedData} autoSize />
// 	</>
// ) : null}
