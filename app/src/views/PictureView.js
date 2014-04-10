define(function(require, exports, module) {
    var Surface          = require('famous/core/Surface');
    var Modifier         = require('famous/core/Modifier');
    var Transform        = require('famous/core/Transform');
    var View             = require('famous/core/View');
    var ImageSurface     = require("famous/surfaces/ImageSurface");
    var ContainerSurface = require("famous/surfaces/ContainerSurface");

    function PictureView() {
        View.apply(this, arguments);
        
        _createBackgroundImage.call(this);
    }

    PictureView.prototype = Object.create(View.prototype);
    PictureView.prototype.constructor = PictureView;

    PictureView.DEFAULT_OPTIONS = {
        image: null,
        text: null,
        height: null,
        width: null
    };

    function _createBackgroundImage() {
        this.container = new ContainerSurface({
            size: [this.options.width, this.options.height],
            properties:{
                overflow: 'hidden'
            }
        });

        this.surf = new Surface({
            content: '<img height="'+ this.options.height +'" src="' + this.options.image + '">'
        });

        this.mod = new Modifier({
            transform: Transform.translate(0, 0, 0)
        });

        var view = new View();
        view._add(this.mod).add(this.surf);
        this.container.add(view);

        var textSurf = new Surface({
            size: [this.options.width, window.innerHeight / 18],
            classes: ['surfaceText'],
            content: this.options.text
        });

        var textMod = new Modifier({
            origin: [0.5, 1]
        });
        this.container.add(textMod).add(textSurf);


        this._add(this.container); 
    }

    PictureView.prototype.animateParallax = function(){
        this.mod.setTransform(Transform.translate(-25, 0, 0), {duration: 3000});
    }

    PictureView.prototype.resetParallax = function() {

        this.mod.setTransform(Transform.translate(0, 0, 0));
    }

    module.exports = PictureView;
});