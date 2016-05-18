/**
 * Settings logics module
 */
(function () {
	angular.module('math-settings', [])

	/**
   * Settings Controller is used to process User's settings selection
   */
	.controller('SettingsController', ['SettingsService', 'ReadinessService', function(SettingsService, ReadinessService) {
		this.mathOperationSet = {};
		this.isAddition = false;
		this.isSubtraction = false;
		this.isMultiplication = false;
		this.isDivision = false;

		/**
		 * Used as the readiness check before sharing the array of settings values and the readiness flag
		 */
		this.checkForEmptiness = function(userSet) {
			if ( !_.isEmpty(userSet) ) {
				SettingsService.setSettingsServArray(userSet);
				ReadinessService.setReadinessServValue(true);
			}
		};

		/**
		 * Used to process User's settings selection and to set the array of settings values and the readiness flag
		 */
		this.addMathOperation = function () {
			this.mathOperationSet = _.defaults({"isAddition": this.isAddition, "isSubtraction": this.isSubtraction, "isMultiplication": this.isMultiplication, "isDivision": this.isDivision});
			
			/**
			 * This block of code is used to process User's math operation set object and to save the object's properties equal to [true] into the this.userMathOperationSet array
			 */
			this.userMathOperationSet = [];
			for (var i = 0; i < 4; i++) {
				this.operationIsTrueTemp = _.findKey(this.mathOperationSet, function(o) { return o === true; });
				if (this.operationIsTrueTemp) { this.userMathOperationSet = _.concat(this.userMathOperationSet, this.operationIsTrueTemp); }
				this.mathOperationSet = _.omit(this.mathOperationSet, [this.operationIsTrueTemp]);
			}

			this.checkForEmptiness(this.userMathOperationSet);
		};
	}]);
})();