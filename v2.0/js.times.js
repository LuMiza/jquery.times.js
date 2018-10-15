/**
 * 时间处理, 无依赖任何第三方js类库，使用原生js处理
 * @author:Rumble
 * @version 2.0
 *
 * 使用说明请前往以下链接的 v2.0
 * @url: https://github.com/LuMiza/js.times.js
 *
 * @param option参数说明
 *        end:倒计时结束时间【时间戳】
 *        show:当前时间显示【选择器】
 *
 * @returns {$date.init}
 */

(function(window) {
    var $date = window.$date = function(option) {
        return  new $date.prototype.init(option);
    };

    /**
     * 格式化倒计时
     * @param leave 时间差
     * @param status  倒计时执行状态:true  false
     * @returns {{status: boolean, d: number, h: number, i: number, s: number}}
     */
    function downFormat(leave, status){
        if (typeof leave == 'undefined') {
            throw new Error('leave is undefined');
        }
        if (typeof status == 'undefined') {
            throw new Error('status is undefined');
        }
        var day=0,
            hour=0,
            minute=0,
            second=0;
        if (leave > 0) {
            day = Math.floor(leave / (60 * 60 * 24));
            hour = Math.floor(leave / (60 * 60)) - day * 24;
            minute = Math.floor(leave / 60) - (day * 60 * 24) - (hour * 60);
            second = Math.floor(leave - (day * (60 * 60 * 24)) - (hour * 60 * 60 ) - (minute * 60));
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
        return {
            status: status,
            d: day,
            h: hour,
            i: minute,
            s: second
        };
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
        date: function(){
            var _this = this;
            return _this.format();
        },
        /**
         * 时间戳  秒
         * @returns {number}
         */
        time: function(){
            var _this = this;
            var dateObj = new Date();
            return  Math.floor(dateObj.getTime()/1000);
        },
        /**
         * 当前动态时间  yyyy-mm-dd HH:mm:ss
         */
        now:function(callback){
            var _this = this;
            var is_call = false;
            if ((typeof callback != 'undefined') && (typeof callback == 'function')) {
                is_call = true;
            }
            if (! is_call) {
                if (typeof _this.options.show == 'undefined') {
                    throw new Error('show  is  undefined.');
                }
                var format = (typeof _this.options.format == 'undefined')? 'default': _this.options.format;
            }
            var time = _this.time();
            if (typeof document.querySelector == 'undefined') {
                throw new Error('document.querySelector  is  undefined, please upgrade browser.');
            }
            if (! is_call) {
                document.querySelector(_this.options.show).innerHTML = _this.format(format, time);
            } else {
                callback(_this.format('json', time));
            }
            var timer = setInterval(function(){
                time++;
                if (! is_call) {
                    document.querySelector(_this.options.show).innerHTML = _this.format(format, time);
                } else {
                    callback(_this.format('json', time));
                }
            },1000);
            return timer;
        },
        /**
         * 倒计时
         * @param callback 回调函数
         * @returns {number}
         */
        counting:function(callback){
            var _this = this;
            /*结束时间end  时间戳*/
            if (typeof _this.options.end == 'undefined') {
                throw new Error('end  is  undefined');
            }
            if (typeof callback =='undefined') {
                throw new Error('callback  is  undefined');
            }
            if (typeof callback != 'function') {
                throw new Error('callback  is  not function');
            }
            var is_num = false;
            if (typeof _this.options.end == 'number') {
                if (/^[1-9]{1}\d{0,2}$/g.test(_this.options.end)) {
                    is_num = true;
                }
            }
            var current_time = this.time();
            if (! is_num) {
                var end = _this.strtotime(_this.options.end);
            } else {
                var end = _this.options.end + current_time;
            }
            var status = true;/*代表当前计时器的运行状态*/
            var timer = setInterval(function(){
                if(current_time==end  || (end-current_time)<0){
                    status = false;/*代表当前计时器，停止计时*/
                    clearInterval(timer);
                }
                callback(downFormat((end-current_time), status));
                current_time++;
            },1000);
            return timer;
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
                date_time = _this.time();
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
            if (/^json/gi.test(date_format)) {
                return {
                    y:yy,
                    m:mm,
                    d:dd,
                    h:hh,
                    i:ii,
                    s:ss
                };
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
    };
    $date.prototype.init.prototype = $date.prototype;
})(window);


