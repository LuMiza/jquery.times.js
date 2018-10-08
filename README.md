# jquery.times.js
#### js的时间处理，包含倒计时，当前时间显示，格式化时间戳等
#### Author: Rumble
#### url:https://github.com/LuMiza/jquery.times.js
```javascript
 /** 
 * @param option参数说明
 *        end:倒计时结束时间【时间戳】
 *        show:当前时间显示【选择器】   endCallback:倒计时结束后的回调
 *        countDownCall:倒计时计时过程中的回调【有三个参数，依次为current_time[当前计时器时间],end[结束时间]】,
 *        downFormatCall:倒计时格式化回调【有四个参数，依次为day[日],hour[小时],minute[分钟],second[秒]】
 *        
 */
```
* ####用法实例：
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
```
