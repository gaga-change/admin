/** layuiAdmin.std-v1.2.1 LPPL License By http://www.layui.com/admin/ */ ;
layui.define(function (e) {
    layui.use(["admin", "carousel"], function () {
        var $ = layui.$,
            carousel = (layui.admin, layui.carousel),
            element = layui.element,
            device = layui.device();
        $(".layadmin-carousel").each(function () {
            var a = $(this);
            carousel.render({
                elem: this,
                width: "100%",
                arrow: "none",
                interval: a.data("interval"),
                autoplay: a.data("autoplay") === !0,
                trigger: device.ios || device.android ? "click" : "hover",
                anim: a.data("anim")
            })
        }), element.render("progress")
    }), layui.use(["admin", "carousel", "echarts"], function () {
        var $ = layui.$,
            admin = layui.admin,
            carousel = layui.carousel,
            echarts = layui.echarts,
            l = [],
            n = [{
                title: {
                    text: "最近一周新增的学员量",
                    x: "center",
                    textStyle: {
                        fontSize: 14
                    }
                },
                tooltip: {
                    trigger: "axis",
                    formatter: "{b}<br>新增用户：{c}"
                },
                xAxis: [{
                    type: "category",
                    data: ["11-07", "11-08", "11-09", "11-10", "11-11", "11-12", "11-13"]
                }],
                yAxis: [{
                    type: "value"
                }],
                series: [{
                    type: "line",
                    data: [200, 300, 400, 610, 150, 270, 380]
                }]
            }, {
                title: {
                    text: "通过率趋势图百分比",
                    x: "center",
                    textStyle: {
                        fontSize: 14
                    }
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["", ""]
                },
                xAxis: [{
                    type: "category",
                    boundaryGap: !1,
                    data: ["11-07", "11-08", "11-09", "11-10", "11-11", "11-12", "11-13", "11-14", "11-15", "11-16", "11-17", "11-18", "11-19", "11-20"]
                }],
                yAxis: [{
                    type: "value"
                }],
                series: [{
                    name: "科目一",
                    type: "line",
                    smooth: !0,
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: "default"
                            }
                        }
                    },
                    data: [88, 88, 88, 70, 88, 88, 88, 88, 66, 88, 88, 90, 70, 88]
                }, {
                    name: "科目二",
                    type: "line",
                    smooth: !0,
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: "default"
                            }
                        }
                    },
                    data: [66, 66, 66, 66, 66, 66, 50, 66, 66, 66, 70, 66, 66, 66]
                }]
            }, {
                title: {
                    text: "未通过占比分布",
                    x: "center",
                    textStyle: {
                        fontSize: 14
                    }
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    x: "left",
                    data: ["科目一", "科目二", "科目三"]
                },
                series: [{
                    name: "未通过次数",
                    type: "pie",
                    radius: "55%",
                    center: ["50%", "50%"],
                    data: [{
                        value: 80,
                        name: "科目一"
                    }, {
                        value: 1000,
                        name: "科目二"
                    }, {
                        value: 2000,
                        name: "科目三"
                    }]
                }]
            }],
            r = $("#LAY-index-dataview").children("div"),
            o = function (e) {
                l[e] = echarts.init(r[e], layui.echartsTheme), l[e].setOption(n[e]), admin.resize(function () {
                    l[e].resize()
                })
            };
        if (r[0]) {
            o(0);
            var d = 0;
            carousel.on("change(LAY-index-dataview)", function (e) {
                o(d = e.index)
            }), layui.admin.on("side", function () {
                setTimeout(function () {
                    o(d)
                }, 300)
            }), layui.admin.on("hash(tab)", function () {
                layui.router().path.join("") || o(d)
            })
        }
    }), layui.use("table", function () {
        var e = (layui.$, layui.table);
        e.render({
            elem: "#LAY-index-topSearch",
            url: layui.setter.base + "json/console/top-search.js",
            page: !0,
            cols: [
                [{
                    type: "numbers",
                    fixed: "left"
                }, {
                    field: "keywords",
                    title: "关键词",
                    minWidth: 300,
                    templet: '<div><a href="https://www.baidu.com/s?wd={{ d.keywords }}" target="_blank" class="layui-table-link">{{ d.keywords }}</div>'
                }, {
                    field: "frequency",
                    title: "搜索次数",
                    minWidth: 120,
                    sort: !0
                }, {
                    field: "userNums",
                    title: "用户数",
                    sort: !0
                }]
            ],
            skin: "line"
        }), e.render({
            elem: "#LAY-index-topCard",
            url: layui.setter.base + "json/console/top-card.js",
            page: !0,
            cellMinWidth: 120,
            cols: [
                [{
                    type: "numbers",
                    fixed: "left"
                }, {
                    field: "title",
                    title: "标题",
                    minWidth: 300,
                    templet: '<div><a href="{{ d.href }}" target="_blank" class="layui-table-link">{{ d.title }}</div>'
                }, {
                    field: "username",
                    title: "发帖者"
                }, {
                    field: "channel",
                    title: "类别"
                }, {
                    field: "crt",
                    title: "点击率",
                    sort: !0
                }]
            ],
            skin: "line"
        })
    }), e("console", {})
});