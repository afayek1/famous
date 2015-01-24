/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var AtomView = require('views/AtomView');
    // var ButtonsView = require('views/ButtonsView');
    
    /*
     * @name AppView
     * @constructor
     * @description
     */

    function AppView() {
        View.apply(this, arguments);
        _createAtomView.call(this);
        // _createButtonsView.call(this);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {
    };

    function _createAtomView() {
      this.atomView = new AtomView();
      this.add(this.atomView);
    }

    // function _createButtonsView() {
    //   this.buttonsView = new ButtonsView();
    //   this.add(this.buttonsView);
    // }



    module.exports = AppView;
});
