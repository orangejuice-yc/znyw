function SvgMap(svg_id, data ,width,height) {
    var _svgMap = this;
    this.id = svg_id;//svg元素ID
    this.svg = document.getElementById(svg_id); //SVG的DOM元素
    this.width = width ; //SVG窗体宽度
    this.height = height; //SVG窗体高度
    this.animationSteps = 30; //动画总帧数
    this.animationSpeed = 10; //动画速度，帧之间的间隔时间，单位：毫秒（间隔时间可能会受浏览器的执行速度影响而导致实际无法达到）
    this.minZoom = 0.5;//最小缩放比例，基于初始窗体大小
    this.maxZoom = 1; //最大放大比例，基于SVG原始尺寸
    this.startStation = ""; //起点
    this.endStation = ""; //终点
    this.path_display_percentage = 0.7; //路径显示时占窗口的比例，0~1之间
    this.zoomLevel = new Array(8); //缩放比例，可以通过改变数组元素个数调整缩放级数
    this.onPathShow = false; //当前是否正在显示乘车路线
    this.stationArr = new Array();
    this.readyForClearMask = false; //准备清除遮罩，在mousedown后置为true，mouseup后清除遮罩，在mousedown后如果移动过，则恢复false
    this.panZoom = null;
    this.panZoomAnimationIntervalID = null;
    this.pathAnimationIntervalID = null;
    this.path1 = null;//最少时间
    this.path2 = null;//最短距离

    /*
    * 初始化轨道地图控件
    */
    this.init = function () {
        //初始化窗体，全屏
        this.reSize();
        //记录初始窗体的大小
        this.initWidth = this.width;
        this.initHeight = this.height;
        //记录之前窗体的大小
        this.widthBefore = this.width;
        this.heightBefore = this.height;
        //加载地图
        this.loadMap();

        //获取SVG原始图像的尺寸
        this.image_width = document.getElementById('sw_svg').getBBox().width;
        this.image_height = document.getElementById('sw_svg').getBBox().height;
        //计算默认缩放比例，即当SvgPanZoom缩放比例为1的时候，与实际图像大小的比例
        this.default_scale = this.image_width / this.width;
        if (this.default_scale < this.image_height / this.height) {
            this.default_scale = this.image_height / this.height;
        }
        //计算放大比例        
        this.maxZoom *= this.default_scale;
        var scale = Math.pow(this.maxZoom / this.minZoom, 1 / this.zoomLevel.length);
        this.zoomLevel[0] = this.minZoom;
        for (var i = 1; i < this.zoomLevel.length - 1; i++) {
            this.zoomLevel[i] = this.zoomLevel[i - 1] * scale;
        }
        this.zoomLevel[this.zoomLevel.length - 1] = this.maxZoom;
        //创建SVG移动缩放控件
        this.createSvgPanZoom();

        //加载地图事件
        this.addStationEvents();
    };

    /**
    * 
    * @method 
    * @param {} 
    * @return 
    */
    this.addStationEvents = function () {
        //加载站点点击事件
        $('.svg-station').click(function (e) {
            //更新弹出框内容
            var stationId = this.getAttribute('id').replace("i", "s"); //获取当前ID，当是换乘点时，将ID首字母换成s
            $('#station-title').html('站点融合状态详情（' + _svgMap.stationArr[stationId].name + '）');
            $('#direction1').html(_svgMap.stationArr[stationId].direction1);
            $('#startTime1').html(_svgMap.stationArr[stationId].startTime1);
            $('#endTime1').html(_svgMap.stationArr[stationId].endTime1);
            $('#direction2').html(_svgMap.stationArr[stationId].direction2);
            $('#startTime2').html(_svgMap.stationArr[stationId].startTime2);
            $('#endTime2').html(_svgMap.stationArr[stationId].endTime2);
            $('#stationId').html(_svgMap.stationArr[stationId].id);

            //显示弹出框
            var x = e.clientX;
            var y = e.clientY;
            var m = 260; //在画布上面260之内，弹出框改成向下显示
            var n = 160; //在画布左右180之内，弹出框改成左右显示
            var box_w = 248; //弹出框的宽
            var box_h = 194; //弹出框的高
            var arrow_w = 14; //箭头图标的宽高
            var space_w = 30; //隐藏边界宽度
            var radius = 6; //圆角半径
            var box_x, box_y, arrow_x, arrow_y;
            if (x < n) {
                //向右显示弹出框
                box_x = x + arrow_w - 1 - space_w;
                arrow_x = x;
                arrow_y = y - arrow_w / 2;
                if (arrow_y < radius + 10) {
                    arrow_y = radius + 10;
                } else if (arrow_y > _svgMap.height - radius - arrow_w - 10) {
                    arrow_y = _svgMap.height - radius - arrow_w - 10;
                }
                box_y = arrow_y - box_h / 2 - space_w + arrow_w / 2;
                if (box_y < 10 - space_w) {
                    box_y = 10 - space_w;
                } else if (box_y > _svgMap.height - box_h - space_w - 10) {
                    box_y = _svgMap.height - box_h - space_w - 10;
                }
                $('#station-box-arrow').css('background', 'url(images/arrow_right.png) no-repeat');
            } else if (x > _svgMap.width - n) {
                //向左显示弹出框
                arrow_x = x - arrow_w;
                box_x = x - arrow_w + 1 - box_w - space_w;
                arrow_y = y - arrow_w / 2;
                if (arrow_y < radius + 10) {
                    arrow_y = radius + 10;
                } else if (arrow_y > _svgMap.height - radius - arrow_w - 10) {
                    arrow_y = _svgMap.height - radius - arrow_w - 10;
                }
                box_y = arrow_y - box_h / 2 - space_w + arrow_w / 2;
                if (box_y < 10 - space_w) {
                    box_y = 10 - space_w;
                } else if (box_y > _svgMap.height - box_h - space_w - 10) {
                    box_y = _svgMap.height - box_h - space_w - 10;
                }
                $('#station-box-arrow').css('background', 'url(images/arrow_left.png) no-repeat');
            } else if (y < m) {
                //向下显示弹出框
                arrow_x = x - arrow_w / 2;
                box_x = x - box_w / 2 - space_w;
                arrow_y = y;
                box_y = y + arrow_w - 1 - space_w;
                $('#station-box-arrow').css('background', 'url(images/arrow_down.png) no-repeat');
            } else {
                arrow_x = x - arrow_w / 2;
                box_x = x - box_w / 2 - space_w;
                arrow_y = y - arrow_w;
                box_y = y - arrow_w + 1 - box_h - space_w;
                //默认向上显示弹出框
                $('#station-box-arrow').css('background', 'url(images/arrow_up.png) no-repeat');
            }
            $('#station-box').css('left', _svgMap.width/2 - 250 );
            $('#station-box').css('top', _svgMap.height/2 - 300);
            // $('#station-box').css('left',box_x);
            // $('#station-box').css('top', box_y);
            $('#station-box-arrow').css('left', arrow_x);
            $('#station-box-arrow').css('top', arrow_y);
            $('#station-box-arrow').css('display', '');
            $('#station-box').css('display', '');
        });
        //点击设为起点
        $("#btnSetStart").click(function (e) {
            _svgMap.searchPath($('#stationId').html(), "");
            $('#station-box').css('display', 'none');
            $('#station-box-arrow').css('display', 'none');
        });
        //点击设为终点
        $("#btnSetEnd").click(function (e) {
            _svgMap.searchPath("", $('#stationId').html());
            $('#station-box').css('display', 'none');
            $('#station-box-arrow').css('display', 'none');
        });

        //鼠标经过站点圆圈时，站点圆圈放大
        $('.svg-station').mouseover(function (e) {
            if (this.nodeName == "ellipse") {
                this.setAttribute('rx', '50');
                this.setAttribute('ry', '50');
                this.setAttribute('stroke-width', '20');
            } else if (this.nodeName == "image") {
                this.setAttribute('width', '160');
                this.setAttribute('height', '160');
                this.setAttribute('x', _svgMap.stationArr[this.id.replace("i", "s")].x - 80);
                this.setAttribute('y', _svgMap.stationArr[this.id.replace("i", "s")].y - 80);
            }

        });
        $('.svg-station').mouseout(function (e) {
            if (this.nodeName == "ellipse") {
                this.setAttribute('rx', '30');
                this.setAttribute('ry', '30');
                this.setAttribute('stroke-width', '12');
            } else {
                this.setAttribute('width', '100');
                this.setAttribute('height', '100');
                this.setAttribute('x', _svgMap.stationArr[this.id.replace("i", "s")].x - 50);
                this.setAttribute('y', _svgMap.stationArr[this.id.replace("i", "s")].y - 50);
            }
        });

        //鼠标经过站点文字时，站点圆圈放大
        $('.svg-station-name').mouseover(function (e) {
            if (this.id.indexOf("_") == -1) {
                var stationElement = document.getElementById(this.id.replace('t', 's'));
                stationElement.setAttribute('rx', '50');
                stationElement.setAttribute('ry', '50');
                stationElement.setAttribute('stroke-width', '20');
            }
        });
        $('.svg-station-name').mouseout(function (e) {
            if (this.id.indexOf("_") == -1) {
                var stationElement = document.getElementById(this.id.replace('t', 's'));
                stationElement.setAttribute('rx', '30');
                stationElement.setAttribute('ry', '30');
                stationElement.setAttribute('stroke-width', '12');
            }
        });
        //当鼠标移出起点终点选择框时，隐藏选择框
        // $('#sw_svg').mouseover(function (e) {
        //     $('#station-box').css('display', 'none');
        //     $('#station-box-arrow').css('display', 'none');
        // });
        
        //点击关闭按钮关闭弹窗
        $('#station-close').click(function(){
            $('#station-box').css('display', 'none');
        })
        //清除规划路线，恢复遮罩
        this.svg.onmousedown = function () {
            if (_svgMap.onPathShow == true) {
                _svgMap.readyForClearMask = true;
            }
        };
        this.svg.onmouseup = function () {
            if (_svgMap.onPathShow == true && _svgMap.readyForClearMask == true) {
                if ($('#transfer-box-close').css("display") == "none") {
                    _svgMap.clearPathShow();
                }
            }
        };
        //地图移动事件
        this.panZoom.setOnPan(function () {
            //如果当前正在显示规划路线，则移动后鼠标松开时不清除规划路线
            if (_svgMap.onPathShow == true) {
                _svgMap.readyForClearMask = false;
            }
            _svgMap.showStartEndPoint();
        });
        //地图缩放事件
        this.panZoom.setOnZoom(function () {
            _svgMap.showStartEndPoint();
        });
        //查看最少时间路线
        $('#transfer-box-tab1').click(function (e) {
            if ($("#transfer-box-tab1").attr("class") == "transfer-box-tab") {
                $("#transfer-box-tab1").attr("class", "transfer-box-tab-selected");
                $("#transfer-box-tab2").attr("class", "transfer-box-tab");
                _svgMap.showPath(_svgMap.path1);
                _svgMap.showPathBox(_svgMap.path1);
            }
        });
        //查看最短路径路线
        $('#transfer-box-tab2').click(function (e) {
            if ($("#transfer-box-tab2").attr("class") == "transfer-box-tab") {
                $("#transfer-box-tab1").attr("class", "transfer-box-tab");
                $("#transfer-box-tab2").attr("class", "transfer-box-tab-selected");
                _svgMap.showPath(_svgMap.path2);
                _svgMap.showPathBox(_svgMap.path2);
            }
        });
        $('#transfer-box-close').click(function (e) {
            _svgMap.clearPathShow();
        });
    };

    /**
    * 
    * @method 
    * @param {} 
    * @return 
    */
    this.clearPathShow = function () {
        this.onPathShow = false;
        this.readyForClearMask = false;
        this.startStation = "";
        this.endStation = "";
        this.showStartEndPoint();
        $("#transfer-box").css("display", "none");
        $("#transfer-box-tab1").css("display", "none");
        $("#transfer-box-tab2").css("display", "none");
        $("#transfer-box-close").css("display", "none");
        this.mask(false);
    }

    /**
    * 
    * @method 
    * @param {} 
    * @return 
    */
    this.createSvgPanZoom = function () {
        var eventsHandler;
        eventsHandler = {
            haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel'],
            init: function (options) {
                var instance = options.instance
              , initialScale = 1
              , pannedX = 0
              , pannedY = 0

                // Init Hammer
                // Listen only for pointer and touch events
                this.hammer = Hammer(options.svgElement, {
                    inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
                })

                // Enable pinch
                this.hammer.get('pinch').set({ enable: true })

                // Handle double tap
                this.hammer.on('doubletap', function (ev) {
                    instance.zoomIn()
                })

                // Handle pan
                this.hammer.on('panstart panmove', function (ev) {
                    // On pan start reset panned variables
                    if (ev.type === 'panstart') {
                        pannedX = 0
                        pannedY = 0
                    }

                    // Pan only the difference
                    instance.panBy({ x: ev.deltaX - pannedX, y: ev.deltaY - pannedY })
                    pannedX = ev.deltaX
                    pannedY = ev.deltaY
                })

                // Handle pinch
                this.hammer.on('pinchstart pinchmove', function (ev) {
                    // On pinch start remember initial zoom
                    if (ev.type === 'pinchstart') {
                        initialScale = instance.getZoom()
                        instance.zoom(initialScale * ev.scale)
                    }

                    instance.zoom(initialScale * ev.scale)

                })

                // Prevent moving the page on some devices when panning over SVG
                options.svgElement.addEventListener('touchmove', function (e) { e.preventDefault(); });
            }

            , destroy: function () {
                this.hammer.destroy()
            }
        }

        var options = {
            //viewportSelector: '.svg-pan-zoom_viewport',
            panEnabled: true,
            controlIconsEnabled: false,
            zoomEnabled: true,
            dblClickZoomEnabled: false,
            mouseWheelZoomEnabled: false,
            preventMouseEventsDefault: true,
            zoomScaleSensitivity: 0.5,
            minZoom: this.minZoom,
            maxZoom: this.maxZoom,
            fit: true,
            contain: false,
            center: true,
            refreshRate: 'auto',
            beforeZoom: function () { },
            onZoom: function () { },
            beforePan: function () { },
            onPan: function (pan) { /*console.log(pan.x + ", " + pan.y + ", " + panZoom.getZoom()); */ },
            onUpdatedCTM: function () { },
            eventsListenerElement: null,
            customEventsHandler: eventsHandler
        };
        this.panZoom = svgPanZoom(this.svg, options);
    };

    /**
    * 
    * @method 
    * @param {} 
    * @return 
    */
    this.fitScreen = function (x1, y1, x2, y2, displayTextBox) {
        if (displayTextBox == true) {
            var scale_after = this.path_display_percentage / ((x2 - x1) / this.default_scale / (this.width - 300));
        } else {
            var scale_after = this.path_display_percentage / ((x2 - x1) / this.default_scale / (this.width));
        }
        if (scale_after > this.path_display_percentage / ((y2 - y1) / this.default_scale / this.height)) {
            scale_after = this.path_display_percentage / ((y2 - y1) / this.default_scale / this.height);
        }
        if (scale_after > this.zoomLevel[5]) {
            scale_after = this.zoomLevel[5];
        }
        var pan = this.panZoom.getPan();
        var center_x = ((x2 + x1) / 2 / this.default_scale) * this.panZoom.getZoom() + pan.x;
        var center_y = ((y2 + y1) / 2 / this.default_scale) * this.panZoom.getZoom() + pan.y;
        if (displayTextBox == true) {
            center_x -= 150 * this.panZoom.getZoom() / scale_after;
        }
        this.playPanZoomAnimation(center_x, center_y, scale_after);
    };

    /**
    * 
    * @method 
    * @param {} 
    * @return 
    */
    this.formatPath = function (result) {
        var path = {};
        path.line = new Array();
        path.road = result.road;
        path.snum = result.snum;
        path.ticket = result.ticket;
        path.time = result.time;
        path.displayTextBox = true;
        var lineIndex;
        //循环遍历换乘结果
        for (var i = 0; i < result.paths.length - 1; i++) {
            //获取每条路线的ID和名称
            for (var m = 0; m < data.line.length; m++) {
                if (data.line[m].name == result.paths[i].sLine) {
                    lineIndex = m;
                    path.line[i] = { index: m, name: result.paths[i].sLine, direction: result.paths[i].sPath };
                    break;
                }
            }
            //找到对应线路中的起始点下标和结束点下标
            iStartIndex = this.getStationIndex(m, result.paths[i].sId);
            iEndIndex = this.getStationIndex(m, result.paths[i + 1].sId);
            //创建当前线路的途经点
            path.line[i].station = new Array();
            if (iEndIndex > iStartIndex) {
                for (var k = iStartIndex; k <= iEndIndex; k++) {
                    path.line[i].station.push(data.line[m].station[k].id);
                }
            } else {
                for (var k = iStartIndex; k >= iEndIndex; k--) {
                    path.line[i].station.push(data.line[m].station[k].id);
                }
            }
        }
        return path;
    }

    /**
    * 
    * @method 
    * @param {} 
    * @return 
    */
    this.getLineId = function (id1, id2) {
        return id1 < id2 ? "line" + id1 + "to" + id2 : "line" + id2 + "to" + id1;
    }

    /**
    * 获取站点在指定线路中的数组下标
    * @method getStationIndex
    * @param {int} lineIndex 线路下标
    * @param {string} stationId 站点ID号(换乘点不带s?_,仅后面的数字)
    * @return 
    */
    this.getStationIndex = function ($lineIndex, $stationId) {
        for (var i = 0; i < data.line.length; i++) {
            var s = data.line[i].station;
            for (var k = 0; k < s.length; k++) {
                var temp = s[k].id.split("_");
                if ($stationId == temp[0]) {
                    return k;
                } else if ($stationId == temp[1]) {
                    var sId = temp[0];
                    for (var m = 0; m < data.line[$lineIndex].station.length; m++) {
                        var temp2 = data.line[$lineIndex].station[m].id.split("_");
                        if (sId == temp2[0]) {
                            return m;
                        }
                    }
                }
            }
        }
    };

    /**
    * 获取当前的缩放级别
    * @method getZoomLevel
    * @return {int} 缩放级别
    */
    this.getZoomLevel = function () {
        var scale = this.panZoom.getZoom();
        var d = 10000, level;
        for (i = 0; i < this.zoomLevel.length; i++) {
            if (Math.abs(scale - this.zoomLevel[i]) < d) {
                level = i;
                d = Math.abs(scale - this.zoomLevel[i]);
            }
        }
        return level;
    }

    /**
    * 
    * @method 
    * @param {} 
    * @return 
    */
    this.loadMap = function () {
        var svgElement;
        var g = document.getElementById('g1');
        svgElement = this.makeSVG('rect', { fill: "none", width: data.width, height: data.height });
        g.appendChild(svgElement);

        this.loadMapLine();
        //遍历线路
        for (var i = 0; i < data.line.length; i++) {
            var line = data.line[i];
            //在起点画线路名称
            if (line.x1 > 0) {
                svgElement = this.makeSVG('rect', { fill: line.color, width: line.w, height: 90, x: line.x1, y: line.y1, rx: 10, ry: 10 });
                g.appendChild(svgElement);
                svgElement = this.makeSVG('text', { id: "lineName" + line.id, class: '', "font-size": "60", "font-weight": "bold", style: "font-family: Helvetica, Arial, sans-serif;", fill: "#FFFFFF", x: line.x1 + 27, y: line.y1 + 66 });
                svgElement.textContent = line.name;
                g.appendChild(svgElement);
            }
            //在终点画线路名称
            if (line.x2 > 0) {
                svgElement = this.makeSVG('rect', { fill: line.color, width: line.w, height: 90, x: line.x2, y: line.y2, rx: 10, ry: 10 });
                g.appendChild(svgElement);
                svgElement = this.makeSVG('text', { id: "lineName" + line.id, class: '', "font-size": "60", "font-weight": "bold", style: "font-family: Helvetica, Arial, sans-serif;", fill: "#FFFFFF", x: line.x2 + 27, y: line.y2 + 66 });
                svgElement.textContent = line.name;
                g.appendChild(svgElement);
            }
            //画站点
            for (var j = 0; j < line.station.length; j++) {
                this.stationArr["s" + line.station[j].id] = line.station[j]; //在遍历中将所有的站点存到数组中
                if (line.station[j].type == "transfer" || line.station[j].type == "normal") {
                    if (line.station[j].type == "transfer") {
                        var temp = line.station[j].id.split("_");
                        svgElement = this.makeSVG('ellipse', { id: "s" + line.station[j].id, name: line.station[j].name, class: 'svg-station line' + i + ' trans_' + temp[0], fill: "white", stroke: line.color, "stroke-width": "12", cx: line.station[j].x, cy: line.station[j].y, rx: "30", ry: "30" });
                        g.appendChild(svgElement);
                        svgElement = this.makeSVG('image', { id: "i" + line.station[j].id, name: line.station[j].name, class: 'svg-station svg-station-transfer trans_' + temp[0], x: line.station[j].x - 50, y: line.station[j].y - 50, width: "100", height: "100", "href": "images/resTransfer1.png" });
                    } else if (line.station[j].type == "normal") {
                        svgElement = this.makeSVG('ellipse', { id: "s" + line.station[j].id, name: line.station[j].name, class: 'svg-station line' + i, fill: "white", stroke: line.color, "stroke-width": "12", cx: line.station[j].x, cy: line.station[j].y, rx: "30", ry: "30" });
                    }
                    g.appendChild(svgElement);
                    if (line.station[j].type == "transfer") {
                        svgElement = this.makeSVG('text', { id: "t" + line.station[j].id, class: 'svg-station-name trans_' + temp[0] + "_name", "font-size": "50", "font-weight": "bold", style: "font-family: Microsoft YaHei, SimHei;", fill: "#333333", x: line.station[j].tx, y: line.station[j].ty });
                    } else {
                        svgElement = this.makeSVG('text', { id: "t" + line.station[j].id, class: 'svg-station-name', "font-size": "50", "font-weight": "bold", style: "font-family: Microsoft YaHei, SimHei;", fill: "#333333", x: line.station[j].tx, y: line.station[j].ty });
                    }
                    svgElement.textContent = line.station[j].name;
                    var tSpanElement = this.makeSVG('tspan', { "font-size": "30", "font-weight": "normal", style: "font-family: Microsoft YaHei, SimHei;", x: line.station[j].tx + line.station[j].dx, y: line.station[j].ty + 35 });
                    tSpanElement.textContent = line.station[j].eName;
                    svgElement.appendChild(tSpanElement);
                    g.appendChild(svgElement);
                }
            }
        }
    };

    /**
    * 
    * @method 
    * @param {} 
    * @return 
    */
    this.loadMapLine = function () {
        var svgElement;
        var g = document.getElementById('g1');
        for (var i = 0; i < data.line.length; i++) {
            var line = data.line[i];
            var lineId;
            for (var j = 1; j < line.station.length; j++) {
                //{ id: "t0001", name: "过渡点", x: 1291, y: 2629, rx: 45, ry: 45, "sweep-flag": 0, type: "temp" },
                //<path d="M0 0 L0 1000 A 1000 1000 0 0 0 293 1707" stroke="black" fill="none" stroke-width="12"/>
                if (line.station[j].type == "temp") {
                    var x1 = line.station[j - 1].x, y1 = line.station[j - 1].y, x2 = line.station[j].x, y2 = line.station[j].y, x3 = line.station[j + 1].x, y3 = line.station[j + 1].y, r = line.station[j].r;
                    var ab = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
                    var ac = Math.sqrt((x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2));
                    var bc = Math.sqrt((x3 - x1) * (x3 - x1) + (y3 - y1) * (y3 - y1));
                    var alpha = Math.acos((ab * ab + ac * ac - bc * bc) / (2 * ab * ac)) / 2;
                    var l = r / Math.tan(alpha);
                    var cx1 = Math.round((x2 + (x1 - x2) * l / ab) * 10)/10;
                    var cy1 = Math.round((y2 + (y1 - y2) * l / ab) * 10)/10;
                    var cx2 = Math.round((x2 + (x3 - x2) * l / ac) * 10)/10;
                    var cy2 = Math.round((y2 + (y3 - y2) * l / ac) * 10)/10;
                    var scx1 = Math.round((x2 + (x1 - x2) * (l - 2) / ab) * 10)/10;
                    var scy1 = Math.round((y2 + (y1 - y2) * (l - 2) / ab) * 10)/10;
                    var scx2 = Math.round((x2 + (x3 - x2) * (l - 2) / ac) * 10)/10;
                    var scy2 = Math.round((y2 + (y3 - y2) * (l - 2) / ac) * 10) / 10;
                    data.line[i].station[j].scx1 = scx1;
                    data.line[i].station[j].scy1 = scy1;
                    data.line[i].station[j].scx2 = scx2;
                    data.line[i].station[j].scy2 = scy2;
                    lineId = this.getLineId(line.station[j - 1].id, line.station[j].id);
                    svgElement = this.makeSVG('line', { id: lineId, class: "line" + i, x1: x1, y1: y1, x2: scx1, y2: scy1, sx2: scx1, sy2: scy1, style: "stroke:" + line.color + ";stroke-width:40" });
                    g.appendChild(svgElement);
                    svgElement = this.makeSVG('path', { id: "templine" + line.station[j].id, class: "line" + i, d: "M" + cx1 + " " + cy1 + " A " + r + " " + r + " 0 0 " + line.station[j].sweep + " " + cx2 + " " + cy2, stroke: line.color, fill: "none", "stroke-width": 40 });
                    g.appendChild(svgElement);
                    lineId = this.getLineId(line.station[j].id, line.station[j + 1].id);
                    svgElement = this.makeSVG('line', { id: lineId, class: "line" + i, x1: scx2, y1: scy2, x2: x3, y2: y3, sx1: scx2, sy1: scy2, style: "stroke:" + line.color + ";stroke-width:40" });
                    g.appendChild(svgElement);
                    j++;
                } else {
                    lineId = this.getLineId(line.station[j - 1].id, line.station[j].id);
                    svgElement = this.makeSVG('line', { id: lineId, class: "line" + i, x1: line.station[j - 1].x, y1: line.station[j - 1].y, x2: line.station[j].x, y2: line.station[j].y, style: "stroke:" + line.color + ";stroke-width:40" });
                    g.appendChild(svgElement);
                }
            }
        }
    }

    /**
    * 
    * @method 
    * @param {} 
    * @return 
    */
    this.mask = function (mask) {
        for (var i = 0; i < data.line.length; i++) {
            if (mask == true) {
                $(".line" + i).css("stroke", data.line[i].maskColor);
            } else {
                $(".line" + i).css("stroke", data.line[i].color);
            }
        }
        if (mask == true) {
            $(".svg-station-name").css("fill", "#d1d1d1");
            //$(".svg-station-transfer").attr("href", "images/resTransfer0.png");
            $(".svg-station-transfer").css("display","none");
        } else {
            $(".svg-station-name").css("fill", "#333333");
            $(".svg-station-transfer").css("display", "");
            //$(".svg-station-transfer").attr("href", "images/resTransfer1.png");
        }
    };

    /**
    * 
    * @method 
    * @param {} 
    * @return 
    */
    this.move = function (x, y) {
        center_x = this.width / 2 - x;
        center_y = this.height / 2 - y;
        this.playPanZoomAnimation(center_x, center_y, this.panZoom.getZoom());
    };

    /**
    * 
    * @method 
    * @param {} 
    * @return 
    */
    this.playPanZoomAnimation = function (center_x, center_y, scale) {
        var scale_before = this.panZoom.getZoom();
        var scale_after = scale;
        var move_x = this.width / 2 - center_x;
        var move_y = this.height / 2 - center_y;
        var move_x_sum = 0;
        var move_y_sum = 0;
        var percentage = 0;
        var panZoom = this.panZoom;
        var animationSteps = this.animationSteps;
        var animationSpeed = this.animationSpeed;

        //禁止动画
        if (arguments[3] == false) {
            animationSteps = 5;
            animationSpeed = 1;
        }
        //不需要按坐标center_x, center_y居中移动地图
        if (arguments[4] == false) {
            var move = false;
        } else {
            var move = true;
        }

        var animationStep = 0; //当前帧
        var scale; //动画过程中的当前缩放比例
        clearInterval(this.panZoomAnimationIntervalID);
        _svgMap.panZoomAnimationIntervalID = setInterval(function () {
            if (++animationStep <= animationSteps) {
                percentage = 1 - (animationSteps - animationStep) * (animationSteps - animationStep) * (animationSteps - animationStep) / (animationSteps * animationSteps * animationSteps);
                scale = scale_before + (scale_after - scale_before) * percentage;
                panZoom.zoomAtPoint(scale, { x: center_x, y: center_y }); //以某个点为中心进行缩放，这个点的坐标是相对于窗体，而非SVG图片
                if (move) {
                    panZoom.panBy({ x: move_x * percentage - move_x_sum, y: move_y * percentage - move_y_sum }); //横向位移X像素，纵向位移Y像素
                    center_x += move_x * percentage - move_x_sum;
                    center_y += move_y * percentage - move_y_sum;
                    move_x_sum = move_x * percentage;
                    move_y_sum = move_y * percentage;
                }
            } else {
                // Cancel interval
                clearInterval(_svgMap.panZoomAnimationIntervalID);
            }
        }, animationSpeed);
    };

    //播放轨迹（线路，乘车路线）动画
    this.playPathAnimation = function (pathData) {
        /*
        var pathData = { step: 0, startStep: 10, endFlag1: false, endFlag2: false };
        pathData.stationArr = new Array();
        pathData.lineArr = new Array()
        */
        var sInterval = 8; //显示站点的间隔帧数
        var sFrames = 10; //显示站点的帧数
        var moveDistance = 30; //每帧画出的路径长度
        var rx1 = 30, ry1 = 30, stroke1 = 12, rx2 = 50, ry2 = 50, stroke2 = 20, iw1 = 100, iw2 = 160;
        if (++pathData.step <= pathData.startStep) { return; }
        //画线
        var s1, s2, t, tx, ty, lineId;
        if (pathData.endFlag2 == false) {
            pathData.tempDistance += moveDistance;
            //获取当前正在划线的两个站点
            s1 = pathData.stationArr[pathData.lineStationI];
            s2 = pathData.stationArr[pathData.lineStationI + 1];

            var s1x, s1y, s2x, s2y;
            if (s1.type == "temp") {
                if ((s2.x >= s1.scx2 && s1.scx2 >= s1.scx1) || (s2.y >= s1.scy2 && s1.scy2 >= s1.scy1)) {
                    s1x = s1.scx2;
                    s1y = s1.scy2;
                    s2x = s2.x;
                    s2y = s2.y;
                } else {
                    s1x = s1.scx1;
                    s1y = s1.scy1;
                    s2x = s2.x;
                    s2y = s2.y;
                }
            } else if (s2.type == "temp") {
                if ((s1.x <= s2.scx1 && s2.scx1 <= s2.scx2) || (s1.y <= s2.scy1 && s2.scy1 <= s2.scy2)) {
                    s1x = s1.x;
                    s1y = s1.y;
                    s2x = s2.scx1;
                    s2y = s2.scy1;
                } else {
                    s1x = s1.x;
                    s1y = s1.y;
                    s2x = s2.scx2;
                    s2y = s2.scy2;
                }
            } else {
                s1x = s1.x;
                s1y = s1.y;
                s2x = s2.x;
                s2y = s2.y;
            }
            //计算两个站点间的距离t
            t = Math.sqrt((s2x - s1x) * (s2x - s1x) + (s2y - s1y) * (s2y - s1y));
            //如果距离为0，说明这两个站点是重合的（一般指两条线路共同的换乘点）时，计算下一条路径
            if (t == 0) {
                pathData.lineStationI++;
                //获取当前正在划线的两个站点
                s1 = pathData.stationArr[pathData.lineStationI];
                s2 = pathData.stationArr[pathData.lineStationI + 1];
                var s1x, s1y, s2x, s2y;
                if (s1.type == "temp") {
                    if ((s2.x >= s1.scx2 && s1.scx2 >= s1.scx1) || (s2.y >= s1.scy2 && s1.scy2 >= s1.scy1)) {
                        s1x = s1.scx2;
                        s1y = s1.scy2;
                        s2x = s2.x;
                        s2y = s2.y;
                    } else {
                        s1x = s1.scx1;
                        s1y = s1.scy1;
                        s2x = s2.x;
                        s2y = s2.y;
                    }
                } else if (s2.type == "temp") {
                    if ((s1.x <= s2.scx1 && s2.scx1 <= s2.scx2) || (s1.y <= s2.scy1 && s2.scy1 <= s2.scy2)) {
                        s1x = s1.x;
                        s1y = s1.y;
                        s2x = s2.scx1;
                        s2y = s2.scy1;
                    } else {
                        s1x = s1.x;
                        s1y = s1.y;
                        s2x = s2.scx2;
                        s2y = s2.scy2;
                    }
                } else {
                    s1x = s1.x;
                    s1y = s1.y;
                    s2x = s2.x;
                    s2y = s2.y;
                }
                //计算两个站点间的距离t
                t = Math.sqrt((s2x - s1x) * (s2x - s1x) + (s2y - s1y) * (s2y - s1y));
            }
            //获取线段ID
            lineId = this.getLineId(s1.id, s2.id);
            var lineElement = document.getElementById(lineId);
            //如果当前划线行进的距离大于线段长度，则直接将线段划完，否则计算要划到哪里
            if (pathData.tempDistance >= t) {
                pathData.tempDistance -= t;
                tx = s2x;
                ty = s2y;
                if (s2.type == "temp") {
                    $("#templine" + s2.id).css("stroke", s1.color);
                    pathData.tempDistance = 0;
                }
                pathData.lineStationI++;
                if (pathData.lineStationI == pathData.stationArr.length - 1) {
                    pathData.endFlag2 = true;
                }
            } else {
                tx = s1x + (s2x - s1x) * pathData.tempDistance / t;
                ty = s1y + (s2y - s1y) * pathData.tempDistance / t;
            }
            //正向线路改变的终点坐标，反向线段改变起点坐标
            if (lineElement.getAttribute("x1") == s1x && lineElement.getAttribute("y1") == s1y) {
                lineElement.setAttribute("x2", tx);
                lineElement.setAttribute("y2", ty);
            } else {
                lineElement.setAttribute("x1", tx);
                lineElement.setAttribute("y1", ty);
            }
            $("#" + lineId).css("stroke", s1.color);
        }
        //画点
        if (pathData.endFlag1 == false) {
            for (var i = 0; i <= pathData.lineStationI + 2 && i < pathData.stationArr.length; i++) {
                if (this.stationArr["s" + pathData.stationArr[i].id].type == "temp") {
                    i++;
                }
                if (pathData.stationArr[i].transferFlag == false) {
                    var stationElement = document.getElementById("s" + pathData.stationArr[i].id);
                } else {
                    var stationElement = document.getElementById("i" + pathData.stationArr[i].id);
                }
                var stationNameElement = document.getElementById("t" + pathData.stationArr[i].id);
                if (pathData.stationArr[i].frame < sFrames) {
                    pathData.stationArr[i].frame++;
                    if (pathData.stationArr[i].frame == 1) {
                        if (pathData.stationArr[i].transferFlag == false) {
                            $("#s" + pathData.stationArr[i].id).css('stroke', pathData.stationArr[i].color);
                        } else {
                            var temp = pathData.stationArr[i].id.split("_");
                            $(".trans_" + temp[0]).css("display", "");

                        }
                    }
                    if (stationElement.nodeName == "ellipse") {
                        stationElement.setAttribute('rx', rx2 - (rx2 - rx1) * pathData.stationArr[i].frame / sFrames);
                        stationElement.setAttribute('ry', ry2 - (ry2 - ry1) * pathData.stationArr[i].frame / sFrames);
                        stationElement.setAttribute('stroke-width', stroke2 - (stroke2 - stroke1) * pathData.stationArr[i].frame / sFrames);
                    } else if (stationElement.nodeName == "image") {
                        var temp = pathData.stationArr[i].id.split("_");
                        $(".trans_" + temp[0]).attr("width", iw2 - (iw2 - iw1) * pathData.stationArr[i].frame / sFrames);
                        $(".trans_" + temp[0]).attr("height", iw2 - (iw2 - iw1) * pathData.stationArr[i].frame / sFrames);
                        $(".trans_" + temp[0]).attr("x", this.stationArr["s" + pathData.stationArr[i].id].x - (iw2 - (iw2 - iw1) * pathData.stationArr[i].frame / sFrames) / 2);
                        $(".trans_" + temp[0]).attr("y", this.stationArr["s" + pathData.stationArr[i].id].y - (iw2 - (iw2 - iw1) * pathData.stationArr[i].frame / sFrames) / 2);
                    }
                    if (pathData.stationArr[i].frame == sFrames) {
                        $("#t" + pathData.stationArr[i].id).css("fill", "#333333");
                    }
                }
            }
            if (pathData.stationArr[pathData.stationArr.length - 1].frame == sFrames) {
                pathData.endFlag1 = true;
            }
        }
    };

    /**
    * 
    * @method 
    * @param {} 
    * @return 
    */
    this.reset = function () {
        var pan = this.panZoom.getPan();
        var center_x = (this.image_width / 2 / this.default_scale) * this.panZoom.getZoom() + pan.x
        var center_y = (this.image_height / 2 / this.default_scale) * this.panZoom.getZoom() + pan.y;
        if (this.width / this.height > this.image_width / this.image_height) {
            var scale = this.height / (this.image_height / this.default_scale);
        } else {
            var scale = this.width / (this.image_width / this.default_scale);
        }
        this.playPanZoomAnimation(center_x, center_y, scale, false);
    };

    /**
    * 
    * @method 
    * @param {} 
    * @return 
    */
    this.reSize = function () {
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight - 5;
        this.svg.setAttribute("width", this.width);
        this.svg.setAttribute("height", this.height);
        $('#map-controls .slider').css('left', _svgMap.width - 79);
        $('#move-controls').css('left', _svgMap.width - 106);
        $('#zoom-in').css('left', _svgMap.width - 80);
        $('#zoom-out').css('left', _svgMap.width - 80);
        $('#line-box').css('left', _svgMap.width - 220);
        $('#north').css('left', _svgMap.width - 80);
        $('#north').css('top', _svgMap.height - 130);
        $('#transfer-box').css('max-height', _svgMap.height - 80);
    };

    /**
    * 
    * @method 
    * @param {} 
    * @return 
    */
    this.reSizeAnimation = function () {
        this.playPanZoomAnimation(this.widthBefore / 2, this.heightBefore / 2, this.panZoom.getZoom(), false);
        this.widthBefore = this.width;
        this.heightBefore = this.height;
    };

    /**
    * 
    * @method 
    * @param {} 
    * @return 
    */
    this.searchPath = function (start, end) {
        if (start != "") {
            this.startStation = start;
            if (this.startStation == this.endStation) {
                this.endStation = "";
            }
        }
        if (end != "") {
            this.endStation = end;
            if (this.endStation == this.startStation) {
                this.startStation = "";
            }
        }
        if (this.startStation != "" && this.endStation != "") {
            $.ajax({
                type: 'GET',
                //url: "search.asp?ss=" + this.startStation.replace("_", "%7C") + "&es=" + this.endStation.replace("_", "%7C"),
                url: "/admin/getStationInfo.do?ss=" + this.startStation.replace("_", "%7C") + "&es=" + this.endStation.replace("_", "%7C"),
                success: function (data) {
                    if (data == "") {
                        alert("系统异常:未加载到换乘线路");
                        _svgMap.clearPathShow();
                        return;
                    }
                    try {
                        var result = eval(data);
                    } catch (err) {
                        alert("系统异常:换乘线路数据格式错误");
                        _svgMap.clearPathShow();
                        return;
                    }
                    _svgMap.path1 = _svgMap.formatPath(result[0]);
                    if (JSON.stringify(result[1]) != JSON.stringify(result[0])) {
                        _svgMap.path2 = _svgMap.formatPath(result[1]);
                        $("#transfer-box-tab1").html("最少时间");
                    } else {
                        _svgMap.path2 = null;
                        $("#transfer-box-tab1").html("推荐路线");
                    }
                    _svgMap.showPath(_svgMap.path1);
                    _svgMap.showPathBox(_svgMap.path1);
                    $("#transfer-box-tab1").attr("class", "transfer-box-tab-selected");
                    $("#transfer-box-tab2").attr("class", "transfer-box-tab");
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("加载路线错误：" + textStatus + errorThrown);
                },
                datatype: 'json'
            });
        }
        this.showStartEndPoint();
    }

    /**
    * 
    * @method 
    * @param {} 
    * @return 
    */
    this.showLine = function (lineIndex) {
        this.clearPathShow();
        var path = {};
        path.displayTextBox = false;
        path.line = new Array({ index: lineIndex, name: data.line[lineIndex].name });
        path.line[0].station = new Array();
        for (var i = 0; i < data.line[lineIndex].station.length; i++) {
            path.line[0].station.push(data.line[lineIndex].station[i].id);
        }
        this.showPath(path);
    }

    /**
    * 显示换乘路线
    * @method showPath
    * @param {object} path 包含线路全部站点的对象，包含多条换乘线路以及途经点
    * @return 无返回值
    */
    this.showPath = function (path) {
        var lineId, transferFlag;
        this.mask(true);
        this.onPathShow = true;
        var x1 = 100000, x2 = 0, y1 = 100000, y2 = 0;
        var animationSpeed = this.animationSpeed;
        var pathData = { step: 0, startStep: 30, tempDistance: 0, lineStationI: 0, endFlag1: false, endFlag2: false };
        pathData.stationArr = new Array();
        for (var i = 0; i < path.line.length; i++) {
            var line = path.line[i];
            var color = data.line[line.index].color;
            for (var j = 0; j < line.station.length; j++) {
                var stationId = line.station[j];
                if (stationId.indexOf("_") >= 0) {
                    var temp = stationId.split("_");
                    $(".trans_" + temp[0]).css("display", "none");
                    $(".trans_" + temp[0] + "_name").css("display", "none");
                    $("#s" + stationId).css("display", "");
                    $("#t" + stationId).css("display", "");
                }
                if (i > 0 && j == 0) {
                    transferFlag = true;
                } else {
                    transferFlag = false;
                }
                if (this.stationArr["s" + stationId].type == "temp") {
                    pathData.stationArr.push({ id: stationId, color: color, type: this.stationArr["s" + stationId].type, transferFlag: transferFlag, x: parseFloat(this.stationArr["s" + stationId].x), y: parseFloat(this.stationArr["s" + stationId].y), scx1: this.stationArr["s" + stationId].scx1, scy1: this.stationArr["s" + stationId].scy1, scx2: this.stationArr["s" + stationId].scx2, scy2: this.stationArr["s" + stationId].scy2, frame: 0 });
                } else {
                    pathData.stationArr.push({ id: stationId, color: color, type: this.stationArr["s" + stationId].type, transferFlag: transferFlag, x: parseFloat(this.stationArr["s" + stationId].x), y: parseFloat(this.stationArr["s" + stationId].y), frame: 0 });
                }
                x1 = x1 < this.stationArr["s" + stationId].x ? x1 : this.stationArr["s" + stationId].x;
                y1 = y1 < this.stationArr["s" + stationId].y ? y1 : this.stationArr["s" + stationId].y;
                x2 = x2 > this.stationArr["s" + stationId].x ? x2 : this.stationArr["s" + stationId].x;
                y2 = y2 > this.stationArr["s" + stationId].y ? y2 : this.stationArr["s" + stationId].y;
            }
        }
        clearInterval(this.pathAnimationIntervalID);
        _svgMap.pathAnimationIntervalID = setInterval(function () {
            if (pathData.endFlag1 && pathData.endFlag2) {
                clearInterval(_svgMap.pathAnimationIntervalID);
            } else {
                _svgMap.playPathAnimation(pathData);
            }
        }, animationSpeed);
        if (path.displayTextBox == true) {
            this.fitScreen(x1, y1, x2, y2, true);
        } else {
            this.fitScreen(x1, y1, x2, y2, false);
        }
    }

    /**
    * 显示换乘路线文字框
    * @method showPathBox
    * @param {object} path 包含线路全部站点的对象，包含多条换乘线路以及途经点
    * @return 无返回值
    */
    this.showPathBox = function (path) {
        //插入换乘信息HTML,包含起点到所有换乘点的HTML
        var transferHTML = '<div id="transfer-line[lineID]" class="transfer-div logo-start-station"><div id="transfer-line[lineID]-bg1" class="transfer-line-bg1"><div class="up"></div><div class="down"></div></div><div id="transfer-line[lineID]-bg2" class="transfer-line-bg2"></div><div id="transfer-line[lineID]-content" class="transfer-line"><div class="transfer-station-box"><span id="transfer-line[lineID]-station" class="transfer-station">木渎</span><span id="transfer-line[lineID]-name1" class="transfer-line-name1">1号线</span></div><div class="transfer-line-box"><span id="transfer-mode0">乘坐</span> <span id="transfer-line[lineID]-name2" class="transfer-line-name2">1号线</span> 往 <span id="transfer-line[lineID]-direction" class="transfer-direction">钟南街</span> 方向</div><div class="transfer-time-box">首班车：<span id="transfer-line[lineID]-starttime" class="transfer-starttime">06:12</span>&nbsp;&nbsp;&nbsp;末班车：<span id="transfer-line[lineID]-endtime" class="transfer-endtime">22:12</span></div></div></div>';
        transferHTML += '<div id="transfer-line[lineID]-stations" class="transfer-line-stations"><div lineID="[lineID]" class="btnOpenCloseStationsList">展开</div><div id="transfer-line[lineID]-stations-close-box" class="transfer-line-stations-close-box"><div class="transfer-line-bg1"></div><div class="transfer-line-bg2"></div><div>乘坐 <span id="transfer-line[lineID]-stations-number" class="transfer-line-stations-number">5</span> 站路</div></div><div id="transfer-line[lineID]-stations-open-box" class="transfer-line-stations-open-box" style="display:none;"><ul id="transfer-line[lineID]-stations-list"></ul></div></div>';

        var allTransferHTML = "";
        for (var i = 0; i < path.line.length; i++) {
            if (i == 0) {
                allTransferHTML += transferHTML.replace(/\[lineID\]/g, i);
            } else {
                allTransferHTML += transferHTML.replace("乘坐", "换乘").replace(/\[lineID\]/g, i).replace("logo-start-station", "logo-transfer-station");
            }
        }
        var transferBoxFrameHTML = '<div id="transfer-title" class="transfer-div"><div id="transfer-title-1">独墅湖邻里中心 -> 富元路</div><div id="transfer-title-2">共 <span id="tStationNumber">27</span> 站&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;换乘 <span id="tTransferTimes">1</span> 次&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;票价 <span id="tPrice">7</span> 元<br />全长 <span id="tDistance">34</span> 公里&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时长 <span id="tTime">66</span> </div></div><!--transfer content--><div id="transfer-line-end" class="transfer-div logo-end-station"><div id="transfer-line-end-bg1" class="transfer-line-bg1"><div class="up"></div><div class="down"></div></div><div id="transfer-line-end-bg2" class="transfer-line-bg2"></div><div id="transfer-line-end-content" class="transfer-line"><div class="transfer-station-box"><span id="transfer-end-station" class="transfer-station">富元路</span></div></div></div><div id="transfer-remark">以上方案仅供参考，具体以实际情况为准。请您留意进站及换乘的首末班时间，以免耽误您的行程。</div>';
        $("#transfer-box-frame").html(transferBoxFrameHTML.replace("<!--transfer content-->", allTransferHTML));
        $(".btnOpenCloseStationsList").click(function () {
            var id = this.getAttribute("lineID");
            this.innerHTML = this.innerHTML == "展开" ? "收起" : "展开";
            document.getElementById("transfer-line" + id + "-stations-open-box").style.display = document.getElementById("transfer-line" + id + "-stations-open-box").style.display == "" ? "none" : "";
            document.getElementById("transfer-line" + id + "-stations-close-box").style.display = document.getElementById("transfer-line" + id + "-stations-close-box").style.display == "" ? "none" : "";

        });
        //头部信息
        $("#transfer-title-1").html(this.stationArr["s" + path.line[0].station[0]].name + " -> " + this.stationArr["s" + path.line[path.line.length - 1].station[path.line[path.line.length - 1].station.length - 1]].name);
        $("#tStationNumber").html(path.snum);
        $("#tTransferTimes").html(path.line.length - 1);
        $("#tPrice").html(path.ticket);
        $("#tDistance").html(Math.round(path.road / 100) / 10); //距离转换成千米，保留一位小数
        $("#tTime").html(path.time);
        //写入每路线信息数据（包含起点）
        for (var i = 0; i < path.line.length; i++) {
            var station = this.stationArr["s" + path.line[i].station[0]];
            $("#transfer-line" + i + "-station").html(station.name);
            $("#transfer-line" + i + "-name1").html(data.line[path.line[i].index].name);
            $("#transfer-line" + i + "-name1").css("background-color", data.line[path.line[i].index].color);
            $("#transfer-line" + i + "-name2").css("color", data.line[path.line[i].index].color);
            $("#transfer-line" + i + "-name2").html(data.line[path.line[i].index].name);
            if (i > 0) {
                $("#transfer-line" + i + " .up").css("background-color", data.line[path.line[i - 1].index].color);
            }
            $("#transfer-line" + i + " .down").css("background-color", data.line[path.line[i].index].color);
            $("#transfer-line" + i + "-direction").html(path.line[i].direction);
            if (path.line[i].direction == station.direction1) {
                $("#transfer-line" + i + "-starttime").html(station.startTime1);
                $("#transfer-line" + i + "-endtime").html(station.endTime1);
            } else {
                $("#transfer-line" + i + "-starttime").html(station.startTime2);
                $("#transfer-line" + i + "-endtime").html(station.endTime2);
            }
            //途径站信息
            var stationListHTML = "";
            var stationNumbers = 0;
            for (var m = 1; m < path.line[i].station.length; m++) {
                if (this.stationArr["s" + path.line[i].station[m]].type == "normal" || this.stationArr["s" + path.line[i].station[m]].type == "transfer") {
                    stationListHTML += '<li class="line' + i + '-list-stations"><div class="transfer-line-bg1"></div><div class="transfer-line-bg2"></div><div>' + this.stationArr["s" + path.line[i].station[m]].name + '</div></li>';
                    stationNumbers++;
                }
            }
            $("#transfer-line" + i + "-stations-number").html(stationNumbers);
            $("#transfer-line" + i + "-stations-list").html(stationListHTML);
            $("#transfer-line" + i + "-stations .transfer-line-bg1").css("background-color", data.line[path.line[i].index].color);
        }
        $("#transfer-end-station").html(this.stationArr["s" + path.line[i - 1].station[path.line[i - 1].station.length - 1]].name);
        $("#transfer-line-end .up").css("background-color", data.line[path.line[i - 1].index].color);
        $("#transfer-box").css("display", "");
        $("#transfer-box-tab1").css("display", "");
        if (this.path2 != null) {
            $("#transfer-box-tab2").css("display", "");
        } else {
            $("#transfer-box-tab2").css("display", "none");
        }
        $("#transfer-box-close").css("display", "");
    }

    /**
    * 
    * @method 
    * @param {} 
    * @return 
    */
    this.showStartEndPoint = function () {
        var x, y;
        if (this.startStation != "") {
            x = this.stationArr["s" + this.startStation].x / this.default_scale * this.panZoom.getZoom() + this.panZoom.getPan().x - 23;
            y = this.stationArr["s" + this.startStation].y / this.default_scale * this.panZoom.getZoom() + this.panZoom.getPan().y - 84;
            if (x > this.width-46 || y > this.height-84) {
                $("#logoStart").css("display", "none");
            } else {
                $("#logoStart").css("left", x);
                $("#logoStart").css("top", y);
                $("#logoStart").css("display", "");
            }
        } else {
            $("#logoStart").css("display", "none");
        }
        if (this.endStation != "") {
            x = this.stationArr["s" + this.endStation].x / this.default_scale * this.panZoom.getZoom() + this.panZoom.getPan().x - 23;
            y = this.stationArr["s" + this.endStation].y / this.default_scale * this.panZoom.getZoom() + this.panZoom.getPan().y - 84;
            if (x > this.width-46 || y > this.height-84) {
                $("#logoEnd").css("display", "none");
            } else {
                $("#logoEnd").css("left", x);
                $("#logoEnd").css("top", y);
                $("#logoEnd").css("display", "");
            }
        } else {
            $("#logoEnd").css("display", "none");
        }
    }

    /**
    * 将地图缩放至指定级别
    * @method zoomBy
    * @param {int} 地图缩放的级别 
    * @return none
    */
    this.zoomBy = function (zoom_level) {
        if (typeof (arguments[1]) != "undefined") {
            var center_x = arguments[1];
            var center_y = arguments[2];
        } else {
            var center_x = this.width / 2;
            var center_y = this.height / 2;
        }
        this.playPanZoomAnimation(center_x, center_y, this.zoomLevel[zoom_level], true, false);
    }
}

/*在所有实例中共享的方法或属性*/


/**
* 创建一个SVG HTML元素
* @method makeSVG
* @param {string} tag html元素名称，如path、line
* @param {Array} attrs 包含有属性名称和属性值的数组
* @return {SvgElement} SVG HTML元素对象
*/
SvgMap.prototype.makeSVG = function (tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
};

/**
* 计算字符长度，汉字占2个字符
* @method gbLen
* @return {int}长度
*/
String.prototype.gbLen = function () {
    var len = 0;
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
            len += 2;
        } else {
            len++;
        }
    }
    return len;
}