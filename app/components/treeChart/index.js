import React, { PropTypes } from 'react'
import createG2 from 'g2-react';
import G2 from 'g2';

class TreeChart extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            forceFit: true,
            width: 250,
            height: 450,
            plotCfg: {
                margin: [10, 10]
            },
        }
    }

    getChildrenDeep(list){
        let arr = list.map(obj=>{
            if (obj.children){
                return 1 + this.getChildrenDeep(obj.children)
            }else{
                return 1
            }
        })
        return Math.max.apply(null, arr)
    }

    renderTree(nodes, edges, dx, chart) {
        chart.clear();
        let Stat = G2.Stat
        let height = Math.max(100, 40 / dx); // 最小高度 500
        let deep = nodes.length ? this.getChildrenDeep(nodes) : 1;
        chart.changeSize(deep * 100, height);
        // 首先绘制 edges，点要在边的上面
        // 创建单独的视图
        var edgeView = chart.createView();
        edgeView.source(edges);
        edgeView.coord().transpose().scale(1, -1); //
        edgeView.axis(false);
        edgeView.tooltip(false);
        // Stat.link 方法会生成 ..x, ..y的字段类型，数值范围是 0-1
        edgeView.edge()
            .position(Stat.link('source*target', nodes))
            .shape('smooth')
            .color('#ccc');
        function strLen(str) {
            var len = 0;
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
                    len++;
                } else {
                    len += 2;
                }
            }
            return len;
        }
        // 创建节点视图
        var nodeView = chart.createView();
        nodeView.coord().transpose().scale(1, -1); //'polar'
        nodeView.axis(false);
        // 节点的x,y范围是 0，1
        // 因为边的范围也是 0,1所以正好统一起来
        nodeView.source(nodes, {
            x: { min: 0, max: 1 },
            y: { min: 0, max: 1 },
            value: { min: 0 }
        }, ['id', 'x', 'y', 'name', 'children', 'collapsed']); // 由于数据中没有 'collapsed' 字段，所以需要设置所有的字段名称
        nodeView.point().position('x*y').color('steelblue').size('name', function (name) {
            var length = strLen(name);
            return length * 6 + 5 * 2;
        }).label('name', {
            offset: 6,
            labelEmit: true
        }).shape('children*collapsed', function (children, collapsed) {
            if (children) {
                if (collapsed) {
                    return 'collapsed';
                } else {
                    return 'expanded';
                }
            }
            return 'leaf';
        }).tooltip('name*id');
        chart.render();
    }

    drawNode(cfg, group, collapsed, isLeaf) {
        var x = cfg.x;
        var y = cfg.y;
        var pointSize = 5;
        var width = cfg.size;
        var height = 18;
        var label = cfg.label;
        var shape = group.addShape('rect', {
            attrs: {
                x: x,
                y: y - height / 2,
                width: width,
                height: height,
                fill: '#fff',
                cursor: isLeaf ? '' : 'pointer',
                stroke: cfg.color
            }
        });
        if (!isLeaf) {
            x = x - pointSize;
            group.addShape('circle', {
                attrs: {
                    r: pointSize,
                    x: x,
                    y: y,
                    fill: '#fff',
                    stroke: cfg.color // 可以直接设置颜色 cfg.color，也可以使用映射
                }
            });
            var path = [];
            path.push(['M', x - pointSize / 2, y]);
            path.push(['L', x + pointSize / 2, y]);
            if (collapsed) {
                path.push(['M', x, y - pointSize / 2]);
                path.push(['L', x, y + pointSize / 2]);
            }
            group.addShape('path', {
                attrs: {
                    path: path,
                    stroke: cfg.color
                }
            });
        }
        return shape;
    }

    getTreeChart() {
        return createG2(chart => {
            G2.Shape.registShape('point', 'collapsed', {
                drawShape: (cfg, group) => {
                    return this.drawNode(cfg, group, true)
                }
            })

            G2.Shape.registShape('point', 'expanded', {
                drawShape: (cfg, group) => {
                    return this.drawNode(cfg, group, false);
                }
            })

            G2.Shape.registShape('point', 'leaf', {
                drawShape: (cfg, group) => {
                    return this.drawNode(cfg, group, false, true);
                }
            })

            let data = chart.get('data').data, Stat = G2.Stat;
            // 使用layout，用户可以自己编写自己的layout
            // 仅约定输出的节点 存在 id,x，y字段即可
            let layout = new G2.Layout.Tree({
                nodes: data
            });
            let dx = layout.dx, nodes = layout.getNodes(), edges = layout.getEdges();
            chart.animate(false);
            // 不显示title
            chart.tooltip({
                title: null
            });
            chart.legend('children', false);
            chart.legend('name', false);
            this.renderTree(nodes, edges, dx, chart);
            chart.on('plotclick', (ev) => {
                var shape = ev.shape;
                if (shape) {
                    var obj = shape.get('origin');
                    var id = obj._origin.id;
                    var node = layout.findNode(id);
                    if (node && node.children) {
                        node.collapsed = !node.collapsed ? 1 : 0;
                        layout.reset();
                        nodes = layout.getNodes();
                        edges = layout.getEdges();
                        dx = layout.dx;
                        // edgeView.changeData(edges);
                        this.renderTree(nodes, edges, dx, chart);
                    }
                }
            });
        });
    }

    render() {
        let Chart = this.getTreeChart()
        return (
            <div>
                <Chart
                    data={this.props.data}
                    width={this.state.width}
                    height={this.state.height}
                    plotCfg={this.state.plotCfg}
                    forceFit={this.state.forceFit} />
            </div>
        )
    }
}

TreeChart.PropTypes = {
    data: PropTypes.array.isRequired
}

export default TreeChart