/**
 * 时间处理
 * @author:Rumble
 * @url: https://github.com/LuMiza/jquery.times.js
 *
 * @param option参数说明
 *        start: 倒计时开始时间【时间戳】  end:倒计时结束时间【时间戳】
 *        show:当前时间显示【选择器】   endCallback:倒计时结束后的回调
 *        countDownCall:倒计时计时过程中的回调【有三个参数，依次为current_time[当前计时器时间],start,end】,
 *        downFormatCall:倒计时格式化回调【有四个参数，依次为day[日],hour[小时],minute[分钟],second[秒]】
 *
 * @returns {$date.init}
 */
var $date = function(option) {
    if(typeof $ == 'undefined'){
        throw new Error('请引入jquery，$  is  undefined');
    }
    return  new $date.prototype.init(option);
}

$date.prototype = {
	options:null,
	date:new Date(),
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
		var dateObj = _this.date;
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
		var dateObj = _this.date;
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
		$(_this.options.show).html(_this.getCurrentTime());
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
			$(_this.options.show).html(str);
		},1000);
		
	},
    /**
	 * 倒计时
     */
	countDown:function(){
		var _this = this;
		//活动开始时间start 时间戳   活动结束时间end  时间戳
		if (typeof _this.options.start == 'undefined') {
            throw new Error('start  is  undefined');
		}
		if (typeof _this.options.end == 'undefined') {
            throw new Error('end  is  undefined');
		}
		if (typeof _this.options.endCallback != 'function') {
            throw new Error('endCallback  is  undefined');
		}
        if (typeof _this.options.countDownCall != 'function') {
            throw new Error('countDownCall  is  undefined');
        }
        //var currentTime = this.getTimestamp();
        var currentTime = _this.options.start;
        console.log(_this.options);
        var int = setInterval(function(){
            if( currentTime == _this.options.end ){
                console.log('this is end');
                _this.options.endCallback();//如果符合某个条件 就执行回调
                clearInterval(int);
            }
            _this.options.countDownCall(currentTime, _this.options.start, _this.options.end);
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
        var day = parseInt(leave / 86400);
        var hour = parseInt(leave / (3600)) - day * 24;
        var minute = parseInt(leave / 60) - (day * 1440) - (hour * 60);
        var second = parseInt(leave - (day * 86400) - (hour * 3600) - (minute * 60));
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
	}
}
$date.prototype.init.prototype = $date.prototype;
