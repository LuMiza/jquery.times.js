# js.times.js
#### 原生js的时间处理，不依赖任何第三方js类库，包含倒计时，当前时间显示，格式化时间戳等
#### Author: Rumble
#### url:https://github.com/LuMiza/js.times.js

###### v2.0为最新版本，简洁版的时间处理类库


## 使用演示
* 当前动态时间
```javascript
// 使用1：
 $date({show:'.now'}).now();
 //如果让时间停止，如下操作：
 var init = $date({show:'.now'}).now();
 window.clearInterval(init);

 //使用2：【format的值，请参考$date().format()的type参数】
  $date({show:'.now',format:'default'}).now();

 //使用3：
 var now_init = $date().now(function(d){
        $('.now').html(d.y +'-' + d.m + '-' + d.d + ' ' + d.h + ':' + d.i + ':' +d.s);
});
```

                     
* 当前静态时间
```javascript
$date().date();
```

* 当前时间戳
```javascript
$date().time();
```
* 将时间格式化时间戳
```javascript
$date().strtotime('2018-10-12 10:33:31');
```

* 倒计时 1
```javascript
$date({
    end:'2018-10-12 10:42:01',//结束时间 也可以为 时间戳
    now:1528255000 //[时间戳] 如果指定倒计时的当前时间  否则 直接取客户端的时间
}).counting(function(d){
    //回调参数d是一个对象
    //d.status:倒计时状态[true=倒计时正在运行 false=倒计时停止]   d.d天  d.h小时   d.i分钟  d.s秒数
    console.log(d);
    $('.count_down_1').html('day:'+d.d + '  hour:'+d.h + ' minute:'+d.i+' second:'+d.s);
});
```
                      
* 30秒倒计时
```javascript
$date({
    end:30 //秒级倒计时，最大支持999秒
}).counting(function(d){
    console.log(d);
    if (d.status) {
        $('.count_down_2').css({backgroundColor:'gray'});
        $('.count_down_2').html(parseInt(d.s)+'秒后重新获取');
    } else {
        $('.count_down_2').css({backgroundColor:'#009688'});
        $('.count_down_2').html('获取验证码');
        $('.count_down_2').removeAttr('data-click');
    }
});
```

* 格式化时间`$.date().format(type, time, callback)`:函数参数使用说明:
* @param type 格式化时间的格式，如果一定定义了回调，那么该参数不作用  [参数值内定的有]

| 值        | 说明   | 结果 |
| :--------:   | :-----:  | :-----:  |
| default     | 年 月 日 时 分 秒 |2018-10-10 10:53:36 |
|    json           |      返回一个对象             |                   |
| y        |   年 |2018  |
|      m        |   月       |10|
|      d        |    日      |10|
|        y-m-d      |    年 月 日      |2018-10-10 |
| y-m        |    年 月   |2018-10 |
|    m-d          |    月 日      |   10-10 |
|      h:i:s        |     时 分 秒     |  10:53:36 |
|         h       |      小时    | 10 |
|         i     |      分    | 53 |
|        s      |     秒     | 36 |
|       h:i       |     小时 分钟     |10:53|
|        i:s      |     分钟 秒     |53:36|

* @param time 指定时间，如果未指定则为当前时间  [可以为时间戳，或者字符串类型的时间格式]
* @param callback 回调，如果定义回调，则回调函数应设置return     [如果time 或者 type 定义为callback，那么将会自动转成回调，执行的是最后一个回调]  回调函数将会有六个参数,依次分别为 yy 年, mm 月, dd 日, hh 时, ii 分, ss 秒；回调参数命名可以自定义，不一定为举例的yy
```javascript
 //格式化时间
 $date().format();//2018-10-10 10:53:36
 $date().format('y-m-d');//2018-10-10
 $date().format('y-m-d','2018-10-10 10:53:36');//2018-10-10
 $date().format(
 		function(){
 			console.log('type');
 		},
 		function(){
 			console.log('time');
 		},
 		function(){
 			console.log('callback');
 		}
);//callback
$date().format('y-m-d','2018-10-10 10:53:36', function(y, m, d, h, i, s) {
    var str = y +'-' + m + '-' + d + ' ' + h + ':' + i + ':' +s;
    return 'this is callback:  ' + str;
});//this is callback:  2018-10-10 10:53:36
```                      