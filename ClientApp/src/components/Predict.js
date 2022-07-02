import React, { Component } from 'react';
import { render } from 'react-dom';
import CandleStickChartWithZoomPan from './CandleStickChartWithZoomPan';
import { getCompareData, getLocalData, getPredictData } from "./utils"
import { Container, Form, Input, Accordion, AccordionItem, AccordionBody, AccordionHeader } from 'reactstrap';
import { TypeChooser } from "react-stockcharts/lib/helper";
import LineAndScatterChartGrid from './charts/LineAndScatterChartGrid';
import LineAndScatterChart from './charts/LineAndScatterChart';

export class Predict extends Component {
    static displayName = Predict.name;

    componentDidMount() {
        this.setState({ data: [], stock: '', chart: 'line' })
        const stock = 'GOOG'
        getPredictData(stock).then(data => {
            console.log('GOt data', data)
            this.setState({ data, stock })
        })
    }

    setData(data) {
        this.setState({ data })
    }

    handleChange(event) {
        console.log("In select: ", event.target.value);
        const stock = event.target.value;
        getPredictData(stock).then(data => {
            console.log('GOt data', data)
            this.setState({ data, stock })
        })
    }

    handleChartChange(event) {
        const chart = event.target.value;
        this.setState({ chart })

    }

    renderChart(param) {
        switch (param) {
            case 'candle':
                return <CandleStickChartWithZoomPan type={"hybrid"} data={this.state.data} />;
            case 'line':
                return <LineAndScatterChart type={"hybrid"} data={this.state.data} />;
            case 'line-grid':
                return <LineAndScatterChartGrid type={"hybrid"} data={this.state.data} />;
            default:
                return 'foo';
        }
    }

    render() {
        if (this.state == null) {
            return <div>Loading...</div>
        }
        return (
            <Container style={{ marginTop: 100 }}>
                <form>
                    <h2>
                        Select Stock to Predict:
                    </h2>
                    <select className="form-select" aria-label="Select Stock" onChange={this.handleChange.bind(this)}>
                        <option selected value="GOOG">
                            Google
                        </option>
                        <option value="TSLA">
                            Tesla
                        </option>
                        <option value="MSFT">
                            Microsoft
                        </option>
                        <option value="AAPL">
                            Apple
                        </option>
                        <option value="GME">
                            GameStop
                        </option>
                    </select>
                    <h2>
                        Chart type:
                    </h2>
                    <select className="form-select" aria-label="Select Chart Type" onChange={this.handleChartChange.bind(this)}>
                        <option selected value="line">Line Chart</option>
                        <option value="line-grid">Line Chart with Grid</option>
                        <option value="candle">Candle Stick Chart</option>
                    </select>
                </form>


                {this.state.data.length == 0 || this.state.stock == '' || this.state.stock == '' ? (
                    <Container>
                        <h3>
                            Please select a Stock and a Chart Type
                        </h3>
                    </Container>
                ) : (
                    <Container>
                        {this.renderChart(this.state.chart)}
                    </Container>
                )}
            </Container>

        )
    }
}