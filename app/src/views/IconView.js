define(function(require, exports, module) {
    var Surface   = require('famous/core/Surface');
    var Modifier  = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var View      = require('famous/core/View');

    function IconView(text) {
        View.apply(this, arguments);
        
        _createIconView.call(this);
    }

    IconView.prototype = Object.create(View.prototype);
    IconView.prototype.constructor = IconView;

    IconView.DEFAULT_OPTIONS = {
        text: null,
        image: null,
        height: null,
        width: null,
        originX: null,
        originY: null,
        backgroundColor: null,
        imgWidth: null,
        imgHeight: null,
        imgPadding: null,
        textOriginY: null
    };

    function _createIconView() {
        //Set up Modifier for entire FeatureArtistView to be container for components
        this.iconViewMod = new Modifier({
            origin: [this.options.originX, this.options.originY],
            size: [this.options.width, this.options.height]
        });
        var container = this._add(this.iconViewMod);


        //add background
        var backgroundSurf = new Surface({
            size: [undefined, undefined],
            properties: {
              background: this.options.backgroundColor,
            }
        });
        container.add(backgroundSurf);


        //add image
        var imgSurf = new Surface({
            size: [undefined, undefined],
            content: '<img height="'+ this.options.imgHeight+'" width="'+ this.options.imgWidth+'" src="' + this.options.image + '">',
            properties: {
                textAlign: 'center',
                paddingTop: this.options.imgPadding
            }
        });
        var imgMod = new Modifier({
            origin: [0.5, 0.5]
        });
        container.add(imgMod).add(imgSurf);


        //add text
        var textSurf = new Surface({
            size: [this.options.width, window.innerHeight / 30],
            classes: ['surfaceText'],
            content: this.options.text
        });
        var textMod = new Modifier({
            origin: [0.5, this.options.textOriginY]
        });
        container.add(textMod).add(textSurf);
    }

    module.exports = IconView;
});