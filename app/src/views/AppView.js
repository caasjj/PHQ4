define(function(require, exports, module) {
    var Surface   = require('famous/core/Surface');
    var Modifier  = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var View      = require('famous/core/View');

    var IconView    = require('views/IconView');
    var PictureView = require('views/PictureView');
    var SplashView  = require('views/SplashView');

    function AppView() {
        View.apply(this, arguments);

        //initial static view w/ logo & 'PHQ4' text
        _addSplashView.call(this);

        //three views with icon & text
        _addToursView.call(this);
        _addInfoView.call(this);
        _addFeaturedArtistView.call(this);

        //three photos with parallax effect
        _addPicViews.call(this);

        this.currentView = "splash";
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {
        transition: {
            duration: 600,
            curve: 'easeInOut'
        },
        height: window.innerHeight,
        width: window.innerWidth,
        backgroundColor: 'rgb(230, 40, 40)'
    };

    function _addSplashView() {
        this.splashView = new SplashView();
        this.splashMod = new Modifier({
            transform: Transform.translate(0, 0, 0)
        })
        this._add(this.splashMod).add(this.splashView);
    }

    function _addFeaturedArtistView() {
        this.featuredArtistView = new IconView({
            image: 'content/images/face-icon.png',
            text: 'FRANK',
            height: this.options.height / 4,
            width: this.options.width / 3,
            originX: 1,
            originY: 1,
            backgroundColor: this.options.backgroundColor,
            imgHeight: this.options.height * .15,
            imgPadding: '6%',
            textOriginY: 0.9
        });

        this.featuredArtistHorizontalOffset = this.options.width / 3;
        this.featuredArtistMod = new Modifier({
            transform: Transform.translate(this.featuredArtistHorizontalOffset, 0, 1)
        });

        this._add(this.featuredArtistMod).add(this.featuredArtistView);
    }

    function _addToursView() {
        this.toursView = new IconView({
            image: 'content/images/tours-icon.png',
            text: 'TOURS',
            height: this.options.height / 2,
            width: this.options.width / 3,
            originX: 1,
            originY: 0,
            backgroundColor: this.options.backgroundColor,
            imgHeight: this.options.height / 2  - 30,
            imgWidth: this.options.width / 3,
            textOriginY: 0.95
        });

        this.toursHorizontalOffset = this.options.width / 3;
        this.toursMod = new Modifier({
            transform: Transform.translate(this.toursHorizontalOffset, 0, 1)
        });
        this._add(this.toursMod).add(this.toursView);
    }

    function _addInfoView() {
        this.infoView = new IconView({
            image: 'content/images/info-icon.png',
            text: 'PRACTICAL INFORMATION',
            height: this.options.height / 4,
            width: this.options.width / 3,
            originX: 0,
            originY: 0.667,
            backgroundColor: this.options.backgroundColor,
            imgHeight: this.options.height * .15,
            imgPadding: '3%',
            textOriginY: 0.77
        });

        this.infoHorizontalOffset = (this.options.width / 3) * -1; //offset to the left
        this.infoMod = new Modifier({
            transform: Transform.translate(this.infoHorizontalOffset, 0, 1)
        });

        this._add(this.infoMod).add(this.infoView);
    }


    function _addPicViews(picOptions) {
        this.picViews = [];
        this.picViewMods = [];
        this.goldfishOffset = this.options.width * (2/3) * -1;
        this.glassHouseOffset = this.options.width * (2/3);
        this.horsebackOffset = this.options.width * (2/3) * -1;

        var picViewData = [
        {
            height: this.options.height/2,
            width: this.options.width * (2/3),
            image: 'content/images/goldfish.png',
            text: 'PHOTOGRAPHERS',
            origin: [0,0],
            offset: this.goldfishOffset
        },
        {
            height: this.options.height/4,
            width: this.options.width * (2/3),
            image: 'content/images/glass-house.png',
            text: 'PHOTOQUAI 2013',
            origin: [1,0.6665],
            offset: this.glassHouseOffset
        },
        {
            height: this.options.height/4,
            width: this.options.width * (2/3),
            image: 'content/images/horseback.png',
            text: 'FAVORITES',
            origin: [0,1],
            offset: this.horsebackOffset
        }
        ];

        for(var i = 0; i < picViewData.length; i++) {
            var picture = picViewData[i];
            var picView = new PictureView({
                height: picture.height,
                width: picture.width,
                image: picture.image,
                text: picture.text,
                offset: picture.offset
            });

            var picMod = new Modifier({
                transform: Transform.translate(picture.offset, 0, 0),
                origin: picture.origin
            });

            this.picViews.push(picView);
            this.picViewMods.push(picMod);

            this._add(picMod).add(picView);
      }
    }

    AppView.prototype.animate = function() {
        this.currentView = "pics";
        this.toursMod.setTransform(Transform.translate(0, 0, 0), this.options.transition);
        this.infoMod.setTransform(Transform.translate(0, 0, 0), this.options.transition);
        this.featuredArtistMod.setTransform(Transform.translate(0, 0, 0), this.options.transition);

        for(var pics = 0; pics < this.picViewMods.length; pics++) {
            this.picViews[pics].resetParallax();
            this.picViewMods[pics].setTransform(Transform.translate(0, 0, 20), this.options.transition, function(){
               for(var views = 0; views < this.picViews.length; views++) {
                    this.picViews[views].animateParallax();
               }
          }.bind(this));
        }

    }


    AppView.prototype.reset = function() {
        this.currentView = "splash";
        this.toursMod.setTransform(Transform.translate(this.toursHorizontalOffset, 0, 0), this.options.transition);
        this.infoMod.setTransform(Transform.translate(this.infoHorizontalOffset, 0, 0), this.options.transition);
        this.featuredArtistMod.setTransform(Transform.translate(this.featuredArtistHorizontalOffset, 0, 0), this.options.transition);

        for(var pics = 0; pics < this.picViewMods.length; pics++) {
            var offset = this.picViews[pics].options.offset;
            this.picViewMods[pics].setTransform(Transform.translate( offset, 0, 20), this.options.transition);
        }
    }
    module.exports = AppView;
});
