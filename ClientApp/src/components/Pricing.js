import React, { Component } from 'react';
import { render } from 'react-dom';
import CandleStickChartWithZoomPan from './CandleStickChartWithZoomPan';
import { getCompareData, getLocalData, getStockData } from "./utils"
import { Container, Form, Input, Accordion, AccordionItem, AccordionBody, AccordionHeader } from 'reactstrap';
import { TypeChooser } from "react-stockcharts/lib/helper";
import LineAndScatterChartGrid from './charts/LineAndScatterChartGrid';
import LineAndScatterChart from './charts/LineAndScatterChart';

export class Pricing extends Component {
    static displayName = Pricing.name;



    render() {
        return (
            <Container style={{ marginTop: 100 }}>
                <h1>Pricing</h1>
                <section class="services">
                    <div class="container">

                        <div class="row">
                            <div class="col-md-6 col-lg-3 d-flex align-items-stretch" data-aos="fade-up">
                                <div class="icon-box icon-box-pink">
                                    <div class="icon"><i class="bx bxl-dribbble"></i></div>
                                    <h4 class="title"><a href="">Free</a></h4>
                                    <p class="description">access to stock price, volume and all kinds of plots</p>
                                    <p class="description">use now for free</p>
                                </div>
                            </div>

                            <div class="col-md-6 col-lg-3 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
                                <div class="icon-box icon-box-cyan">
                                    <div class="icon"><i class="bx bx-file"></i></div>
                                    <h4 class="title"><a href="">Silver Package</a></h4>
                                    <p class="description">access to forcasting and all kinds of plots for analysing </p>
                                    <p class="description">30.99$ </p>
                                </div>
                            </div>

                            <div class="col-md-6 col-lg-3 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
                                <div class="icon-box icon-box-green">
                                    <div class="icon"><i class="bx bx-tachometer"></i></div>
                                    <h4 class="title"><a href="">Golden Package</a></h4>
                                    <p class="description">access to all predictions for forcast and videos for analysing</p>
                                    <p class="description">99.9$</p>
                                </div>
                            </div>

                            <div class="col-md-6 col-lg-3 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
                                <div class="icon-box icon-box-blue">
                                    <div class="icon"><i class="bx bx-world"></i></div>
                                    <h4 class="title"><a href="">Platinum Package</a></h4>
                                    <p class="description">INCOMING</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>
            </Container>

        )
    }
}