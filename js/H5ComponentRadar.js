/**
 * Created by shichangluo on 2016/7/21.
 */
var H5ComponentRadar = function(name,cfg){
    var component = new H5ComponentBase(name,cfg)
    //绘制网格线
    var w = cfg.width;
    var h = cfg.height;
    //加入一个画布 背景层
    var cns = document.createElement('canvas')
    var ctx = cns.getContext('2d')
    cns.width = ctx.width = w
    cns.height = ctx.height = h
    component.append(cns)
    var r = w/2
    var step = cfg.data.length
    ctx.beginPath();
    ctx.arc(r,r,5,0,2*Math.PI)
    ctx.stroke()

    ctx.beginPath();
    ctx.arc(r,r,r-2,0,2*Math.PI)
    ctx.stroke()
    var isBlue = false
    for(var s = 10;s >0;s--){
        //计算一个圆周上的坐标
        //x=a+Math.sin(rad)*r
        //y=b+Math.cos(rad)*r
        ctx.beginPath();
        for(var i=0;i<step;i++ ){
            var rad = (2 * Math.PI / 360) * ( 360 / step ) * i
            var x = r + Math.sin( rad ) * r*(s/10);
            var y = r + Math.cos( rad ) * r*(s/10);
            ctx.lineTo(x,y)

        }
        ctx.closePath();
        ctx.fillStyle = (isBlue = !isBlue)?'#99c0ff':'#f1f9ff'
        ctx.fill()

    }
    //绘制伞骨
    for(var i=0;i<step;i++ ){
        var rad = (2 * Math.PI / 360) * ( 360 / step ) * i
        var x = r + Math.sin( rad ) * r;
        var y = r + Math.cos( rad ) * r;
        ctx.moveTo(r,r)
        ctx.lineTo(x,y)
        //输出项目文字
        var text = $('<div class="text">'+cfg.data[i][0]+'</div>')
        text.css('transition','all 1s'+i*.1+'s')
        if(x > w/2 ){
            text.css('left',x/2+5)
        }else{
            text.css('right',(w-x)/2+5)
        }
        if(y > h/2 ){
            text.css('top',y/2+5)
        }else{
            text.css('bottom',(h-y)/2+5)
        }
        if(cfg.data[i][2]){
            text.css('color',cfg.data[i][2])
        }
        component.append(text)
    }
    ctx.strokeStyle = '#e0e0e0'
    ctx.stroke()
    //加入新的画布，创建数据层
    var cns = document.createElement('canvas')
    var ctx = cns.getContext('2d')
    cns.width = ctx.width = w
    cns.height = ctx.height = h
    component.append(cns)
    ctx.strokeStyle = '#f00'
    var drow = function(per){
        ctx.clearRect(0,0,w,h);
            for(var i = 0;i<step;i++)
            {
                var rad = (2 * Math.PI / 360) * ( 360 / step ) * i
                var rate = cfg.data[i][1]*per;
                var x = r + Math.sin( rad ) * r*rate;
                var y = r + Math.cos( rad ) * r*rate;
                ctx.lineTo(x,y)
            }
            ctx.closePath();
            ctx.stroke()
        ctx.fillStyle = 'ff7676'
        for(var i = 0;i<step;i++)
        {
            var rad = (2 * Math.PI / 360) * ( 360 / step ) * i
            var rate = cfg.data[i][1]*per;
            var x = r + Math.sin( rad ) * r*rate;
            var y = r + Math.cos( rad ) * r*rate;
            ctx.beginPath();
            ctx.arc(x,y,2,0,2*Math.PI)
            ctx.fill()
            ctx.closePath();
        }

        ctx.stroke()

    }
    component.on('onLoad',function(){
        var s = 0
        for(i=0;i<100;i++){
            setTimeout(function(){
                s+=0.01;
                drow(s)
            },i*10)
        }
    })
    component.on('onLeave',function(){
        var s = 1
        for(i=0;i<100;i++){
            setTimeout(function(){
                s-=0.01;
               drow(s)
            },i*10)
        }
    })
    return component
}