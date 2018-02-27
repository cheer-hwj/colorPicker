//数值展示当前的颜色
 function colorData(obj) {
    var form = obj.form
    var rgbValue, hslValue

    switch(obj.pickType) {
        case 'R':
        case 'G':
        case 'B':
        obj.rgbColor = obj.currentColor
        rgbValue = obj.rgbColor
        hslValue = obj.currentHslColor
        break

        case 'H':
        case 'S':
        case 'L':
        obj.hslColor = obj.currentColor
        hslValue = obj.hslColor
        rgbValue = obj.currentRgbColor
        break
        default:
        return false
    } 

    form.rValue.value = rgbValue[0]
    form.gValue.value = rgbValue[1]
    form.bValue.value = rgbValue[2]

    form.hValue.value = hslValue[0]
    form.sValue.value = hslValue[1]
    form.lValue.value = hslValue[2]
 }

 //数值改变，更新颜色
function updateColor(changeArea, obj) {
    var form = obj.form
    var hslValue
    switch(changeArea) {
        case 'rValue':
        case 'gValue':
        case 'bValue':
        obj.rgbColor[0] = form.rValue.value
        obj.rgbColor[1] = form.gValue.value
        obj.rgbColor[2] = form.bValue.value
        hslValue = obj.currentHslColor
        break

        case 'hValue':
        case 'sValue':
        case 'lValue':
        obj.hslColor[0] = form.hValue.value
        obj.hslColor[1] = form.sValue.value
        obj.hslColor[2] = form.lValue.value
        obj.currentColor = obj.hslColor
        rgbValue = obj.currentRgbColor
        break
    }

    switch(obj.pickType) {
        case 'R':
        case 'G':
        case 'B':
        obj.currentColor = obj.rgbColor
        break

        case 'H':
        case 'S':
        case 'L':
        obj.currentColor = obj.hslColor
        break
        default:
        return false
    } 
}

 //数值改变时联动
 function updateData(changeArea, obj) {
    var form = obj.form
    var rgbValue, hslValue

    switch(changeArea) {
        case 'rValue':
        case 'gValue':
        case 'bValue':
        hslValue = obj.hslColor
        form.hValue.value = hslValue[0]
        form.sValue.value = hslValue[1]
        form.lValue.value = hslValue[2]
        break

        case 'hValue':
        case 'sValue':
        case 'lValue':
        rgbValue = obj.rgbColor
        form.rValue.value = rgbValue[0]
        form.gValue.value = rgbValue[1]
        form.bValue.value = rgbValue[2]
        break
    }
 }


//辅助颜色函数
function changeColor(x, y, obj, ctx) {
    var currentColor = obj.currentColor
    var l = obj.l
    var o = {
        main: {
            'R': [currentColor[0], Math.round((l - y)/l*255), Math.round(x/l*255)],
            'G': [Math.round((l - y)/l*255), currentColor[1], Math.round(x/l*255)],
            'B': [Math.round(x/l*255), Math.round((l - y)/l*255), currentColor[2]],
            'H': [currentColor[0], (x/l*100).toFixed(1), ((l - y)/l*100).toFixed(1)],
            'S': [((l - y)/l*360).toFixed(1), currentColor[1], (x/l*100).toFixed(1)],
            'L': [((l - y)/l*360).toFixed(1), (x/l*100).toFixed(1), currentColor[2]]
        },
        sub: {
            'R': [Math.round((l - y)/l*255), currentColor[1], currentColor[2]],
            'G': [currentColor[0], Math.round((l - y)/l*255), currentColor[2]],
            'B': [currentColor[0], currentColor[1], Math.round((l - y)/l*255)],
            'H': [((l - y)/l*360).toFixed(1), currentColor[1], currentColor[2]],
            'S': [currentColor[0], ((l - y)/l*100).toFixed(1), currentColor[2]],
            'L': [currentColor[0], currentColor[1], ((l - y)/l*100).toFixed(1)]
        }
    }

    var type = obj.pickType
    o.setColor = function () {
        obj.currentColor = o[ctx][type]
        switch(type) {
        case 'R':
        case 'G':
        case 'B':
            obj.rgbColor = obj.currentColor
            obj.hslColor = obj.currentHslColor
        break
        case 'H':
        case 'S':
        case 'L':
            obj.hslColor = obj.currentColor
            obj.rgbColor = obj.currentRgbColor
        break
        }
    }
    return o
}

//点击主色板或副色条改变当前颜色
function pickColor(event, obj, ctx) {
    var x = event.layerX
    var y = event.layerY
    var l = obj.l
    
    changeColor(x, y, obj, ctx).setColor()
    colorData(obj)
}

//改变画板选择方式
function changeType(obj) {
    var oldType = obj.pickType
        obj.pickType = obj.form.pickType.value

        switch(oldType) {
        case 'R':
        case 'G':
        case 'B':
        obj.rgbColor = obj.currentColor
        obj.hslColor = obj.currentHslColor
        break

        case 'H':
        case 'S':
        case 'L':
        obj.hslColor = obj.currentColor
        obj.rgbColor = obj.currentRgbColor
        break
        default:
        return false
    } 
        switch(obj.pickType) {
        case 'R':
        case 'G':
        case 'B':
        obj.currentColor = obj.currentRgbColor
        break

        case 'H':
        case 'S':
        case 'L':
        obj.currentColor = obj.currentHslColor
        break
        default:
        return false
    }
}