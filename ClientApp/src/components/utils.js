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
