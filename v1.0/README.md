# js.times.js
#### 原生js的时间处理，不依赖任何第三方js类库，包含倒计时，当前时间显示，格式化时间戳等
#### Author: Rumble
#### url:https://github.com/LuMiza/js.times.js

# v1为第一个版本，功能独立，但使用不是很简洁

```javascript
 /** 
 * @param option参数说明
 *        end:倒计时结束时间【时间戳】
 *        show:当前时间显示【选择器】   endCallback:倒计时结束后的回调
 *        countDownCall:倒计时计时过程中的回调【有三个参数，依次为current_time[当前计时器时间],end[结束时间]】,
 *        downFormatCall:倒计时格式化回调【有四个参数，依次为day[日],hour[小时],minute[分钟],second[秒]】
 *        leave_time: 时间差【秒】
 *       
 *        
 */
```

`$.date().format(type, time, callback)`:函数参数使用说明:
* @param type 格式化时间的格式，如果一定定义了回调，那么该参数不作用  [参数值内定的有]

| 值        | 说明   | 结果 |
| :--------:   | :-----:  | :-----:  |
| default     | 年 月 日 时 分 秒 |2018-10-10 10:53:36 |
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

* #### 用法实例：
```javascript
//获取当前时间
$date().getCurrentTime();//2018-10-08 16:14:27

//获取当前的时间戳
$date().getTimestamp();//1538986583

//动态显示当前时间
$date({show:'#show_time'}).getRuningTime();//2018-10-08 16:14:27

//倒计时
$date({
    end: parseInt('156213456')+86400,
    endCallback:function(){
        alert(888);
    },
    countDownCall:function(current,end){
        $date({leave_time:(end-current),downFormatCall:function(day, hour, minute,second){
                // console.log( 'day='+ day );
                // console.log( 'hour='+ hour );
                // console.log( 'minute='+ minute );
                // console.log( 'second='+ second );
                // console.log( 'current='+ current );
                $('.OVERTIME').html('<i class="hour">' + hour + '</i>:<i class="min">' + minute + '</i>:<i class="sec">' + second + '</i>');
            }}).downFormat();
    }
}).countDown();
 
 
 //倒计时时间格式化
 $date({
     leave_time:80,//时间差【秒】
     //格式化时间回调
     downFormatCall:function(day, hour, minute,second){
         console.log( 'day='+ day );
         console.log( 'hour='+ hour );
         console.log( 'minute='+ minute );
         console.log( 'second='+ second );
     }}).downFormat();
 //转换为时间戳
 $date().strtotime('2018-10-10 09:21:09');//1539134469
 $date().strtotime('1539134469');//1539134469
 
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
