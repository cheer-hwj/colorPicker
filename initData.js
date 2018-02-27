function initData(l, currentColor, pickType) {
    var o = {
            mainCanvas: document.querySelector('#mainCanvas'),
            mainCtx: this.mainCanvas.getContext('2d'),
            subCanvas: document.querySelector('#subCanvas'),
            subCtx: this.subCanvas.getContext('2d'),
            sample: document.querySelector('#sample'),
            form: document.querySelector('#colorData'),

            //两种颜色值以及相互转换
            rgbColor: [0, 0, 0],//[255,255,255]
            hslColor: [0, 0, 0],//[360,100,100]
            get currentRgbColor () {
                var hsl = [this.hslColor[0]/360, this.hslColor[1]/100, this.hslColor[2]/100]
                this.rgbColor =  hslToRgb.apply(this, hsl).map(val=>Math.round(val))
                return this.rgbColor
            },
            get currentHslColor () {
                var hsl = rgbToHsl.apply(this, this.rgbColor)
                this.hslColor = [(hsl[0]*360).toFixed(1), (hsl[1]*100).toFixed(1), (hsl[2]*100).toFixed(1)]
                return this.hslColor
            },

            
            i: 0,
            l: l,
            pickType: pickType,
            currentColor: currentColor,

            //计算各种情况下的渐变值
            get mainStartR () {return 'rgb(' + this.currentColor[0] + ',' + Math.round(this.i * 255/ this.l)  + ',0)'},
            get mainEndR () { return 'rgb(' + this.currentColor[0] + ',' + Math.round(this.i * 255/ this.l) + ',255)'},
            get subStartR () { return 'rgb(255, ' + this.currentColor[1] + ', ' + this.currentColor[2] +')'},
            get subEndR () { return 'rgb(0, ' + this.currentColor[1] + ', ' + this.currentColor[2] + ')'},
        
            get mainStartG () { return 'rgb(' + Math.round(this.i * 255/ this.l) + ',' + this.currentColor[1] + ',0)'},
            get mainEndG () { return 'rgb(' + Math.round(this.i * 255/ this.l) + ',' + this.currentColor[1] + ',255)'},
            get subStartG () { return 'rgb(' + this.currentColor[0] + ', 255, ' + this.currentColor[2] + ')'},
            get subEndG () { return'rgb(' + this.currentColor[0] + ', 0, ' + this.currentColor[2] + ')'},
        
            get mainStartB () { return 'rgb(0, ' + Math.round(this.i * 255/ this.l) + ',' + this.currentColor[2] + ')'},
            get mainEndB () { return 'rgb(255, ' + Math.round(this.i * 255/ this.l) + ',' + this.currentColor[2] + ')'},
            get subStartB () { return 'rgb(' + this.currentColor[0] + ', ' + this.currentColor[1] + ' ,255)'},
            get subEndB () { return 'rgb(' + this.currentColor[0] + ', ' + this.currentColor[1] + ' ,0)'},

            get mainStartH () { return 'hsl(' + this.currentColor[0] + ' ,0%,' + this.i/this.l*100 + '%)'},
            get mainEndH () { return 'hsl(' + this.currentColor[0] + ' ,100%,' + this.i/this.l*100 + '%)'},

            get mainStartS () { return 'hsl(' + this.i * 360/this.l + ',' + this.currentColor[1] + '% ,0%)'},
            get mainMidS () { return 'hsl(' + this.i * 360/this.l + ',' + this.currentColor[1] + '% ,50%)'},
            get mainEndS () { return 'hsl(' + this.i * 360/this.l + ',' + this.currentColor[1] + '% ,100%)'},
            get subStartS () { return 'hsl(' + this.currentColor[0] + ', 100%,' + this.currentColor[2] + '%)'},
            get subEndS () { return 'hsl(' + this.currentColor[0] + ', 0%,' + this.currentColor[2] + '%)'},

            get mainStartL () { return 'hsl(' + this.i * 360/this.l + ' ,0%, ' + this.currentColor[2] + '%)'},
            get mainEndL () { return 'hsl(' + this.i * 360/this.l + ' ,100%, ' + this.currentColor[2] + '%)'},
            get subStartL () { return 'hsl(' + this.currentColor[0] + ', ' + this.currentColor[1] + '%,' + '100%)'},
            get subEndL () { return 'hsl(' + this.currentColor[0] + ', ' + this.currentColor[1] + '%,' + '0%)'},
         }
    return o
}        