/**
 * 时间处理, 无依赖任何第三方js类库，使用原生js处理
 * @author:Rumble
 * @url: https://github.com/LuMiza/js.times.js
 *
 * @param option参数说明
 *        end:倒计时结束时间【时间戳】
 *        show:当前时间显示【选择器】   endCallback:倒计时结束后的回调
 *        countDownCall:倒计时计时过程中的回调【有三个参数，依次为current_time[当前计时器时间],end[结束时间]】,
 *        downFormatCall:倒计时格式化回调【有四个参数，依次为day[日],hour[小时],minute[分钟],second[秒]】
 *
 *
 *
 * @returns {$date.init}
 */
var $date = function(option) {
    return  new $date.prototype.init(option);
}

$date.prototype = {
	options:null,
    init: function(option) {
    	if( typeof option != 'undefined' ){
			this.options = option;
    	}	
        return this;
    },
    /**
	 * 当前时间  静态时间  yyyy-mm-dd HH:mm:ss
     * @returns {string}
     */
    getCurrentTime: function(){
		var _this = this;
		var dateObj = new Date();
		var year = dateObj.getFullYear();//年
		var month = dateObj.getMonth()+1;//月
		var day = dateObj.getDate();//日
		var hh = dateObj.getHours();//时
		var mm = dateObj.getMinutes();//分
		var ss = dateObj.getSeconds();//秒
		var str = year + '-';
		( month < 10 ) ? str += '0': ''; 
		str += month + '-';
		( day < 10 ) ? str += '0' : '';
		str += day + ' ';
		( hh < 10 ) ? str += '0' : '';
		str += hh + ':';
		( mm < 10 ) ? str += '0' : '';
		str += mm + ':';
		( ss < 10 ) ? str += '0' : '';
		str += ss;
		return str;
	},
    /**
	 * 时间戳  秒
     * @returns {number}
     */
    getTimestamp: function(){
		var _this = this;
		var dateObj = new Date();
		return  Math.floor(dateObj.getTime()/1000);
	},
    /**
	 * 当前动态时间  yyyy-mm-dd HH:mm:ss
     */
	getRuningTime:function(){
        var _this = this;
		if (typeof _this.options.show == 'undefined') {
			return;
		}
		var time = _this.getTimestamp();
		// $(_this.options.show).html(_this.getCurrentTime());
		if (typeof document.querySelector == 'undefined') {
			throw new Error('document.querySelector  is  undefined, please upgrade browser.');
		}
		document.querySelector(_this.options.show).innerHTML = _this.getCurrentTime();
		var int = setInterval(function(){
			time++;
			var tempObj = new Date(time*1000);
			var year = tempObj.getFullYear();//年
			var month = tempObj.getMonth()+1;//月
			var day = tempObj.getDate();//日
			var hh = tempObj.getHours();//时
			var mm = tempObj.getMinutes();//分
			var ss = tempObj.getSeconds();//秒
			var str = year + '-';
			( month < 10 ) ? str += '0': '';
			str += month + '-';
			( day < 10 ) ? str += '0': '';
			str += day + ' ';
			( hh < 10 ) ? str += '0': '';
			str += hh + ':';
			( mm < 10 ) ? str += '0': '';
			str += mm + ':';
			( ss < 10 ) ? str += '0': '';
			str += ss;
			// $(_this.options.show).html(str);
			document.querySelector(_this.options.show).innerHTML = str;
		},1000);
		
	},
    /**
	 * 倒计时
     */
	countDown:function(){
		var _this = this;
		//活动开始时间start 时间戳   活动结束时间end  时间戳
		if (typeof _this.options.end == 'undefined') {
            throw new Error('end  is  undefined');
		}
		if (typeof _this.options.endCallback != 'function') {
            throw new Error('endCallback  is  undefined');
		}
        if (typeof _this.options.countDownCall != 'function') {
            throw new Error('countDownCall  is  undefined');
        }
        var currentTime = this.getTimestamp();
        // console.log(_this.options);
        var int = setInterval(function(){
            if(currentTime==_this.options.end  || (_this.options.end-currentTime)<0){
                console.log('this is end');
                _this.options.endCallback();//如果符合某个条件 就执行回调
                clearInterval(int);
            }
            _this.options.countDownCall(currentTime, _this.options.end);
            currentTime++;
        },1000);
		return;
	},
    /**
	 * 格式化倒计时
     */
    downFormat:function(){
		var _this = this;
		if (typeof _this.options.leave_time == 'undefined') {
			throw new Error('leave_time is undefined');
		}
		if (typeof _this.options.downFormatCall != 'function') {
            throw new Error('downFormatCall is undefined');
		}
		var leave = _this.options.leave_time;
		var day=0,hour=0,minute=0,second=0;
		if (leave > 0) {
            day = parseInt(leave / 86400);
            hour = parseInt(leave / (3600)) - day * 24;
            minute = parseInt(leave / 60) - (day * 1440) - (hour * 60);
            second = parseInt(leave - (day * 86400) - (hour * 3600) - (minute * 60));
		}
        if(hour < 10) {
            hour = '0' + hour;
        }
        if(minute < 10) {
            minute = '0' + minute;
        }
        if(second < 10) {
            second = '0' + second;
        }
        _this.options.downFormatCall(day, hour, minute, second);
	},
    /**
	 * 格式化时间，将时间转换为时间戳
     * @param time
     * @returns {number}
     */
	strtotime:function(time){
		if (/^[1-9]{1}\d*$/g.test(time)) {
			return parseInt(time);
		}
		var dateObj = new Date(time);
		return  Math.floor(dateObj.getTime()/1000);
	},
	/**
	 * 格式化时间，
	 * @param type 格式化时间的格式
	 * @param time 指定时间，如果未指定则为当前时间
	 * @param callback 回调，如果定义回调，则回调函数应设置return
	 *                [如果time 或者 type 定义为callback，那么将会自动转成回调，执行的是最后一个回调]
	 *                回调函数将会有六个参数 yy 年, mm 月, dd 日, hh 时, ii 分, ss 秒
	 *
	 * @returns {string|number}
	 */
	format:function(type, time, callback){
		var date_format,
			date_time,
			temp_callback,
			_this = this;
		if ((typeof type == 'function')) {
        	temp_callback = type;
        }
        if ((typeof time == 'function')) {
        	temp_callback = time;
        }
		if ((typeof type == 'undefined') && (typeof type != 'function')) {
			date_format = 'yyyy-mm-dd hh:ii:ss';
		} else {
			date_format = type;
		}
		if ((typeof time == 'undefined') && (typeof time != 'function')) {
			date_time = _this.getTimestamp();
		} else {
			date_time = _this.strtotime(time);
		}
		var dateObj = new Date(date_time*1000);
		var yy = dateObj.getFullYear();//年
		var mm = dateObj.getMonth()+1;//月
		var dd = dateObj.getDate();//日
		var hh = dateObj.getHours();//时
		var ii = dateObj.getMinutes();//分
		var ss = dateObj.getSeconds();//秒
		if (mm < 10) {
            mm = '0' + mm;
        }
        if (hh < 10) {
            hh = '0' + hh;
        }
        if (ii < 10) {
            ii = '0' + ii;
        }
        if (ss < 10) {
            ss = '0' + ss;
        }
        if (typeof callback == 'function') {
        	return callback(yy, mm, dd, hh, ii, ss);
        }
        if (typeof temp_callback != 'undefined') {
			return temp_callback(yy, mm, dd, hh, ii, ss);
        }
		//yyyy-mm-dd hh:ii:ss
		if (/^default/gi.test(date_format)) {
			return yy +'-' + mm + '-' + dd + ' ' + hh + ':' + ii + ':' +ss;
		}
		if (/^y$/gi.test(date_format)) {
			return yy;
		}
		if (/^m$/gi.test(date_format)) {
			return mm;
		}
		if (/^d$/gi.test(date_format)) {
			return dd;
		}
		if (/^y-m$/gi.test(date_format)) {
			return yy +'-' + mm;
		}
		if (/^y-m-d$/gi.test(date_format)) {
			return yy +'-' + mm + '-' + dd;
		}
		if (/^m-d$/gi.test(date_format)) {
			return mm + '-' + dd;
		}
		if (/^h$/gi.test(date_format)) {
			return hh;
		}
		if (/^i$/gi.test(date_format)) {
			return ii;
		}
		if (/^s$/gi.test(date_format)) {
			return ss;
		}
		if (/^h\:i\:s$/gi.test(date_format)) {
			return hh + ':' + ii + ':' +ss;
		}
		if (/^h\:i$/gi.test(date_format)) {
			return hh + ':' + ii;
		}
		if (/^i\:s$/gi.test(date_format)) {
			return ii + ':' +ss;
		}
		return yy +'-' + mm + '-' + dd + ' ' + hh + ':' + ii + ':' +ss;
	}
}
$date.prototype.init.prototype = $date.prototype;
