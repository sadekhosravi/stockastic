import React, { Component } from 'react';
import { render } from 'react-dom';
import LineAndScatterChart from './LineAndScatterChart';
import { getCompareData, getLocalData } from "./utils"

import { TypeChooser } from "react-stockcharts/lib/helper";

export class Currency extends Component {
    static displayName = Currency.name;

    componentDidMount() {
        getLocalData().then(data => {
            this.setState({ data })
        })
    }
    render() {
        if (this.state == null) {
            return <div>Loading...</div>
        }
        return (
            <TypeChooser>
                {type => <LineAndScatterChart type={type} data={this.state.data} />}
            </TypeChooser>
        )
    }
}