import React, { PropTypes } from 'react'
import createG2 from 'g2-react';
import G2 from 'g2';

import './index.scss'

class SearchChart extends React.Component {

    constructor(props, context) {
        super(props, context)
    }

    //柱状图
    getBarChart() {
        return createG2(chart => {
            const Stat = G2.Stat;
            chart.setMode('select'); // 开启框选模式
            chart.select('rangeX'); // 设置 X 轴范围的框选 
            chart.legend(false);
            chart.cols({
                count: {
                    title: null,
                },
                name: {
                    tickInterval: 1,
                    title: null,
                }
            })
            chart.tooltip(true, {
                map: {
                    title: "name",
                    name: "数量",
                    value: "count",
                }
            })

            chart.interval().position("name*count").color('name');
            chart.render();

            // 监听双击事件，这里用于复原图表
            chart.on('plotdblclick', function (ev) {
                chart.get('options').filters = {}; // 清空 filters
                chart.repaint();
            });
        })
    }

    //饼图
    getPieChart() {
        return createG2(chart => {
            const Stat = G2.Stat;
            // 重要：绘制饼图时，必须声明 theta 坐标系
            chart.coord('theta', {
                radius: 0.8 // 设置饼图的大小
            });
            chart.setMode('select'); // 开启框选模式
            chart.select('rangeX'); // 设置 X 轴范围的框选 
            chart.legend(false);

            chart.cols({
                count: {
                    title: null,
                },
                name: {
                    tickInterval: 1,
                    title: null,
                }
            })

            chart.tooltip(true, {
                map: {
                    title: "name",
                    name: "数量",
                    value: "count",
                }
            })

            chart.intervalStack().position('count').color('name');
            chart.render();

            // 监听双击事件，这里用于复原图表
            chart.on('plotdblclick', function (ev) {
                chart.get('options').filters = {}; // 清空 filters
                chart.repaint();
            });
        })
    }

    //瀑布图
    getWaterfallChart() {
        return createG2(chart => {
            chart.setMode('select'); // 开启框选模式
            chart.select('rangeX'); // 设置 X 轴范围的框选 
            chart.legend(false);

            chart.cols({
                name: {
                    tickInterval: 1,
                }
            })
            chart.axis('count', {
                title: null,
                // formatter: function (val) {
                //     return (val / 1000) + 'k';
                // }
            });
            chart.axis('name', {
                title: null,
                tickInterval: 1,
            })
            chart.tooltip(true, {
                map: {
                    title: "name",
                    name: "数量",
                    value: "count",
                }
            })

            chart.interval().position('name*count').color("name")
            chart.render();

            // 监听双击事件，这里用于复原图表
            chart.on('plotdblclick', function (ev) {
                chart.get('options').filters = {}; // 清空 filters
                chart.repaint();
            });
        });
    }

    componentDidMount() {

    }

    render() {
        let { title, data, type } = this.props

        let width = 320, height = 220, forceFit = true;
        let Chart, plotCfg
        if (type == "pie") {
            plotCfg = { margin: [20, 20, 20, 20] }
            Chart = this.getPieChart()
        } else if (type == "waterfall") {
            plotCfg = { margin: [10, 30, 40, 50] }
            Chart = this.getWaterfallChart()
        } else {
            plotCfg = { margin: [10, 30, 40, 50] }
            Chart = this.getBarChart()
        }

        return (
            <div className="search-chart-item">
                <span className="chart-title">{title}</span>
                <div className="chart-div">
                    <Chart
                        data={data}
                        width={width}
                        height={height}
                        plotCfg={plotCfg}
                        forceFit={forceFit} />
                </div>
            </div>
        )
    }
}

SearchChart.PropTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array,
    type: PropTypes.string
}

export default SearchChart