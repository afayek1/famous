/*globals define*/
define(function(require, exports, module) {
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var Modifier = require('famous/core/Modifier');
  var ImageSurface = require('famous/surfaces/ImageSurface');
  var PhysicsEngine = require('famous/physics/PhysicsEngine');
  var Particle = require('famous/physics/bodies/Particle');
  var RepulsionForce = require('famous/physics/forces/Repulsion');
  var Circle = require('famous/physics/bodies/Circle');

  var physics = new PhysicsEngine();
  var planetParticle = new Particle();
  physics.addBody(planetParticle);  

    /*
     * @name AtomView
     * @constructor
     * @description
     */

     function AtomView() {
      View.apply(this, arguments);
      _createPlanet.call(this);
      _createSatellite.call(this);
      _addParticleButton.call(this);
      _setListeners.call(this);
    }

    AtomView.prototype = Object.create(View.prototype);
    AtomView.prototype.constructor = AtomView;

    AtomView.DEFAULT_OPTIONS = {
      gravity: -2,
      planetColor: 'blue',
      // Hard coded colors for particles
      particleColors: ['red', 'green', 'yellow', 'purple', 'orange']
    };

    function _createPlanet() {
      this.planetSurface = new Surface({
        properties: {
          backgroundColor: this.options.planetColor
        }
      });

      var planetModifier = new Modifier({
        size: [100, 100],
        align: [0.5, 0.5],
        origin: [0.5, 0.5],
        transform: function() {
          return planetParticle.getTransform();
        }
      });

      this.add(planetModifier).add(this.planetSurface);
    }

    function _createSatellite() {
      var satelliteSurface = new Surface({
        properties: {
          backgroundColor: this.options.particleColors[Math.floor((Math.random() * this.options.particleColors.length))]
        }
      });

      var satelliteParticle = new Particle({
        position: [0, -100, 0]
      });

      physics.addBody(satelliteParticle);

      var satelliteModifier = new Modifier({
        size: [25, 25],
        align: [0.5, 0.5],
        origin: [0.5, 0.5],
        transform: function() {
          return satelliteParticle.getTransform();
        }
      });

      var gravity = new RepulsionForce({
        strength: this.options.gravity
      });
      
      physics.attach(gravity, satelliteParticle, planetParticle);
      satelliteParticle.setVelocity([0.1, 0, 0]);
      
      this.add(satelliteModifier).add(satelliteSurface);
    }

    function _addParticleButton() {
      this.addButton = new Surface({
        content: 'Add Particle',
        properties: {
          backgroundColor: 'green',
          textAlign: 'center',
          padding: '15px',
          border: '2px solid black',
          cursor: 'pointer'
        }
      });

      // Not enough time to position button properly
      var addParticleButtonModifier = new StateModifier({
        size: [200, 50],
        origin: [0.5, 0.5],
        align: [0.5, 0.6],

      });
      
      this.add(addParticleButtonModifier).add(this.addButton);   
    }

    // Clicking button adds particle/satellite to planet
    function _setListeners() {
      this.addButton.on('click', function() {
        _createSatellite.call(this);
      }.bind(this));
    }
    module.exports = AtomView;
  });