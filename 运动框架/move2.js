/**
 * move2.js 在move.js的基础上增加了json对象，使得运动框架能够同时支持多个属性一起变化。
 */
function getStyle(obj, attr)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj, false)[attr];
	}
}

function startMove(obj, json, fn)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){

		var bStop=true;		//这一次运动就结束了——所有的值都到达了
		for(var attr in json)
		{
			//1.取当前的值
			var iCur=0;
			//透明度做特殊处理
			if(attr=='opacity')
			{
				iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
			}
			else
			{
				iCur=parseInt(getStyle(obj, attr));
			}
			
			//2.算速度
			var iSpeed=(json[attr]-iCur)/8;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			
			//3.检测停止
			if(iCur!=json[attr])
			{
				bStop=false;
			}
			
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}
			else
			{
				obj.style[attr]=iCur+iSpeed+'px';
			}
		}
		
		if(bStop)
		{
			clearInterval(obj.timer);
			//如果回调，执行回调函数
			if(fn)
			{
				fn();
			}
		}
	}, 30)
}