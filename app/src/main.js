define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine');
   	var AppView = require('views/AppView');
   	require('famous/inputs/FastClick');

    // create the main context
    var mainContext = Engine.createContext();
    mainContext.setPerspective(0);
	var appView = new AppView();

	mainContext.add(appView);

    var AppView = require('views/AppView');

	Engine.on('click', function() {
	    if(appView.currentView === "splash") {
	      appView.animate();
	    } else {
	      appView.reset();
	    }
	}); 
});
