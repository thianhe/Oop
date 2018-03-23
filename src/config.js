// By Raccoon
// include namespace
var Framework = (function (Framework) {
	'use strict'
	Framework.Config = function () {
		this.fps = 60;
		this.canvasWidth = 896;  // 2017.02.20, 電流急急棒
		this.canvasHeight = 512;  // 2017.02.20, 電流急急棒
		this.isBackwardCompatiable = false;
		this.isOptimize = false;  // 2017.02.20, from V3.1.1
		this.isMouseMoveRecorded = false;
	};
	return Framework;
})(Framework || {});
