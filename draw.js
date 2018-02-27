//绘制主画板
function drawBoard (obj) {
    var currentColor = obj.currentColor
    var pickType = obj.pickType
    var l = obj.l
    var mainCtx = obj.mainCtx

    mainCtx.clearRect(0, 0, l, l)
    for(var i = 0; i < l; i++) {
        obj.i = i
        var gradient = mainCtx.createLinearGradient(0,i,l,i)
        gradient.addColorStop(0, obj['mainStart' + pickType])
        if(pickType == 'S') {
            gradient.addColorStop(0.5, obj['mainMid' + pickType])
        }
        gradient.addColorStop(1, obj['mainEnd' + pickType])
        mainCtx.fillStyle = gradient
        mainCtx.fillRect(0,l-i,l,1)
    }
}

//绘制右边取色条
function drawBar (obj) {
    var currentColor = obj.currentColor
    var pickType = obj.pickType
    var l = obj.l
    var subCtx = obj.subCtx

    subCtx.clearRect(0, 0, 20, l)
    var subGradient = subCtx.createLinearGradient(0, 0, 0, l)
    if (pickType == 'H') {
        for(var m = 0; m < 360; m++) {
            subGradient.addColorStop(m/360,'hsl(' + m + ',' + currentColor[1] + '%,' + currentColor[2] + '%)')
        }
    }
    else {
        subGradient.addColorStop(0, obj['subStart' + pickType])
        subGradient.addColorStop(1, obj['subEnd' + pickType])
    }
    subCtx.fillStyle = subGradient
    subCtx.fillRect(0, 0, 20, l)
}

//绘制样品色
function drawSample (obj) {
    var sample = obj.sample
    var currentColor = obj.currentColor
    switch(obj.pickType) {
        case 'R':
        case 'G':
        case 'B':
        sample.style.background = 'rgb(' + currentColor.join(',') + ')'
        break

        case 'H':
        case 'S':
        case 'L':
        sample.style.background = 'hsl(' + currentColor[0] + ',' + currentColor[1] + '%,' + currentColor[2] + '%)'
        break
        default:
        return false
    }
}
//绘制当前颜色的位置
function drawPosition(obj) {
    var mainCtx = obj.mainCtx
    var subCtx = obj.subCtx
    var l = obj.l
    var currentColor = obj.currentColor
    var pickType = obj.pickType
    var x, y, t

    switch(pickType) {
        case 'R': x = currentColor[2]/255*l
        y = l - currentColor[1]/255*l
        t = l - currentColor[0]/255*l
        break
        case 'G': x = currentColor[2]/255*l
        y = l - currentColor[0]/255*l
        t = l - currentColor[1]/255*l
        break
        case 'B': x = currentColor[0]/255*l
        y = l - currentColor[1]/255*l
        t = l - currentColor[2]/255*l
        break
        case 'H': x = currentColor[1]/100*l
        y = l - currentColor[2]/100*l
        t = l - currentColor[0]/360*l
        break
        case 'S': x = currentColor[0]/360*l
        y = l - currentColor[2]/100*l
        t = l - currentColor[1]/100*l
        break
        case 'L': x = currentColor[1]/100*l
        y = l - currentColor[0]/360*l
        t = l - currentColor[2]/100*l
        break
    }

    mainCtx.strokeStyle = 'rgb(0, 0, 0)'
    mainCtx.beginPath()
    mainCtx.arc(x, y, 7, 0, Math.PI*2, true)
    mainCtx.stroke()

    mainCtx.strokeStyle = 'rgb(255, 255, 255)'
    mainCtx.beginPath()
    mainCtx.arc(x, y, 6, 0, Math.PI*2, true)
    mainCtx.stroke()

    subCtx.fillStyle = 'rgb(0, 0, 0)'
    subCtx.fillRect(0, t-1, 20, 1)
    subCtx.fillStyle = 'rgb(255, 255, 255)'
    subCtx.fillRect(0, t, 20, 1)
    subCtx.fillStyle = 'rgb(0, 0, 0)'
    subCtx.fillRect(0, t+1, 20, 1)
}
