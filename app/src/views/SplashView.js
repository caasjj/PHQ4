define(function(require, exports, module) {
    var Surface   = require('famous/core/Surface');
    var Modifier  = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var View      = require('famous/core/View');

    //creates inital static view with logo and text
    function SplashView() {
        View.apply(this, arguments);

        _createLogo.call(this);
        _createText.call(this);

    }

    SplashView.prototype = Object.create(View.prototype);
    SplashView.prototype.constructor = SplashView;

    SplashView.DEFAULT_OPTIONS = {};

    function _createLogo() {
        this.logoSurf = new Surface({
            classes: ['splashBackgroundImg'],
            properties: {
                backgroundImage: 'url("content/images/splashBackground.png")'
            }
        });

        this.logoMod = new Modifier({
            transform: Transform.translate(0,0,-10)
        });

        this._add(this.logoMod).add(this.logoSurf);
    }

    function _createText() {
        var textSurf = new Surface({
            size: [window.innerWidth/ 3, window.innerHeight / 7],
            content: '<span class="largeText">PHQ</span>'+
                     '<span class="skinnyText">4</span>',
        });

        var textMod = new Modifier({
            origin: [0.5, 0.75],
            transform: Transform.translate(0, 0, -10)
        });

        this._add(textMod).add(textSurf);
    }

    module.exports = SplashView;
});
