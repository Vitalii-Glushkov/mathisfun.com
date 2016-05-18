/**
 * Services definitions logics module
 */
(function () {
	var app = angular.module('math', ['math-panel', 'math-settings', 'math-generator', 'math-quizz']);

  /**
   * Settings Service is used to make user's settings available through application's modules 
   */
	app.factory('SettingsService', function() {
		this.settingsServArray = [];

  	return {
      /**
       * Used to get the array of Settings values
       * @return {Array} Array of Settings values {type Object}
       */
  		getSettingsServArray: function () {
            return this.settingsServArray;
        },
      /**
       * Used to assign Settings values to the Service's local variable
       * @param {Array} array Array of Settings values
       */
      setSettingsServArray: function (array) {
          this.settingsServArray = array;
      }
  	};
	});

  /**
   * Generator Service is used to generate example object and to make it available through application's modules 
   */
  app.factory('GeneratorService', function() {
    this.generatorServObject = {};

    return {
      /**
       * Used to get the example object
       * @return {Object} Example object
       */
      getGeneratorServObject: function () {
            return this.generatorServObject;
        },
      /**
       * Used to assign example object to the Service's local variable
       * @param {Object} object Example object
       */
      setGeneratorServObject: function (object) {
          this.generatorServObject = object;
      }
    };
  });

  /**
   * Readiness Service is used to make the readiness flag available through applications modules
   */
	app.factory('ReadinessService', function() {
		this.isReady = false;

  	return {
      /**
       * Used to get the readiness flag
       * @return {Boolean} The readiness flag value
       */
  		getReadinessServValue: function () {
            return this.isReady;
        },
      /**
       * Used to set the readiness flag
       * @param {Boolean} bool The flag value setting
       */
      setReadinessServValue: function (bool) {
          this.isReady = bool;
      }
  	};
	});
})();