
//初始化
function init (l, currentColor, pickType) {
    var obj = initData(l, currentColor, pickType)
    obj.mainCanvas.width = obj.l
    obj.mainCanvas.height = obj.l
    obj.subCanvas.width = 20
    obj.subCanvas.height = obj.l

    drawBoard(obj)
    drawBar(obj)
    drawSample (obj)
    colorData(obj)
    drawPosition(obj)

    //给每一条数据的改动加上监听事件
    var inputs = obj.form.querySelectorAll('input[type=number]')
    names = Array.prototype.map.call(inputs, function(val){return val.name})
    var len = names.length
    for(let i = 0; i < len; i++) {
        obj.form[names[i]].addEventListener("blur", function () {
            validValue(this, obj) 
        })
    }

    function validValue(o, obj) {
        //验证填写的数据合法
            if(o.value == '') {
                o.value = o.min
            }
            var value = parseInt(o.value)
            if (value < o.min) {
                o.value = o.min
            }
            else if (value > o.max) {
                o.value = o.max
            }
            
            //更新颜色， 重新绘制画布
            updateColor(o.name, obj) 
            drawBoard(obj)
            drawBar(obj)
            drawSample (obj)
            drawPosition(obj)
            
            //数据联动
            updateData(o.name, obj)
    }

    obj.form.addEventListener('change', function () {
        changeType(obj)
        drawBoard(obj)
        drawBar(obj)
        drawPosition(obj)
    })
    obj.mainCanvas.addEventListener('click', function(event) {
        pickColor(event, obj, 'main')

        drawBoard(obj)
        drawBar(obj)
        drawSample (obj)
        drawPosition(obj)
    })
    obj.subCanvas.addEventListener('click',function(event) {
        pickColor(event, obj,'sub')

        drawBoard(obj)
        drawBar(obj)
        drawSample (obj)
        drawPosition(obj)
    })
    //当按下enter键时，模拟tab键
    // 创建事件
    var myevent = new KeyboardEvent("keydown", {"code":"Tab", "bubbles": true})

    obj.form.addEventListener("click", function() {
            obj.form.dispatchEvent(myevent)
            console.log('click')
        
    })
 
}

init (360, [255,100,0],'R')  