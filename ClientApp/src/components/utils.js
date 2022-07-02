import { tsvParse, csvParse } from "d3-dsv";
import { timeParse } from "d3-time-format";

function parseData(parse) {
	return function (d) {
		d.date = parse(d.Date);
		d.open = +d.Open;
		d.high = +d.High;
		d.low = +d.Low;
		d.close = +d.Close;
		d.volume = +d.Volume;

		return d;
	};
}


function parsePredictData(parse) {
	return function (d) {
		d.date = parse(d.ds);
		d.open = 0;
		d.high = +d.yhat_upper;
		d.low = +d.yhat_lower;
		d.close = +d.yhat;
		d.volume = 0;

		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");

function parseCompareData(parse) {
	return function (d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;

		return d;
	};
}


export function getCompareData() {
	const promiseCompare = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/comparison.tsv")
		.then(response => response.text())
		.then(data => tsvParse(data, d => {
			d = parseData(parseDate)(d);
			d.SP500Close = +d.SP500Close;
			d.AAPLClose = +d.AAPLClose;
			d.GEClose = +d.GEClose;
			return d;
		}));
	return promiseCompare;
}

export function getData() {
	const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
		.then(response => response.text())
		.then(data => tsvParse(data, parseData(parseDate)))
	return promiseMSFT;
}

export function getLocalData() {
	const promiseMSFT = fetch("https://localhost:5001/usd.tsv")
		.then(response => response.text())
		.then(data => tsvParse(data, d => {
			d = parseData(parseDate)(d);
			d.SP500Close = +d.close_eur;
			d.AAPLClose = +d.close_gbp;
			d.GEClose = +d.close_chf;
			// d.close_sekke = +d.close_sekke;

			return d;
		}));
	return promiseMSFT;
}

export function getStockData(stock) {
	const promiseStock = fetch("https://localhost:5001/data/" + stock + ".tsv")
		.then(response => response.text())
		.then(data => tsvParse(data, parseData(parseDate)))
	return promiseStock;
}


export function getPredictData(stock) {
	const promiseStock = fetch("https://localhost:5001/data/" + stock + "_PREDICT.tsv")
		.then(response => response.text())
		.then(data => tsvParse(data, parsePredictData(parseDate)))
	return promiseStock;
}

export function getTweetData() {
	const data = [
		{ "x": "Google", "y1": 65.8, "y2": 12.7, "y3": 21.5 },
		{ "x": "GameStop", "y1": 45.1, "y2": 27.6, "y3": 27.3 },
		{ "x": "Microsoft", "y1": 52.7, "y2": 17.1, "y3": 30.2 },
		{ "x": "Tesla", "y1": 70.4, "y2": 14.3, "y3": 15.3 },
		{ "x": "Apple", "y1": 75.69, "y2": 14.33, "y3": 9.98 }
	]
	return data;
}
