import { NextApiRequest, NextApiResponse } from "next";

const { GoogleSpreadsheet } = require("google-spreadsheet");

const componentToHex = (component: number) => {
	var hex = Math.round(component * 255).toString(16);
	return hex.length == 1 ? "0" + hex : hex;
};

const rgbToHex = ({ red, green, blue }: any) => {
	return (
		"#" + componentToHex(red) + componentToHex(green) + componentToHex(blue)
	);
};

const getResults = async (targetSheet: string, headerRow: number) => {
	const doc = new GoogleSpreadsheet(targetSheet);
	await doc.useServiceAccountAuth({
		client_email: process.env.NEXT_GOOGLE_CLIENT_EMAIL,
		private_key: process.env.NEXT_GOOGLE_PRIVATE_KEY,
	});
	await doc.loadInfo(); // loads document properties and worksheets

	const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
	await sheet.loadHeaderRow(headerRow);
	await sheet.loadCells("A7:F35");

	const rows = await sheet.getRows({
		limit: 50,
	});

	const results: any[][] = [];

	for (let x = 0; x < rows.length; x++) {
		const row = rows[x];
		const tmp = [];

		for (let y = 0; y < row._rawData.length; y++) {
			const value = row._rawData[y];
			const cell = await sheet.getCell(x + headerRow, y);
			const backgroundColor = cell.effectiveFormat.backgroundColor;
			const hexBackgroundColor = rgbToHex(backgroundColor);

			const k: any = {
				value,
				hyperlink: cell.hyperlink,
			};

			if (hexBackgroundColor !== "#ffffff") {
				k.backgroundColor = hexBackgroundColor;
			}

			tmp.push(k);
		}

		results.push(tmp);
	}

	return { rows: results, headers: sheet.headerValues };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	console.log("[API] api/data GET - called");
	const startingRow = 6;

	const results = await getResults(
		"1JgPTZ_cwgi2keYK2NvA0Dq9hDUz9J8AzrlPmlCQj1j0",
		startingRow
	);

	res.status(200).json(results);
};

export default handler;
