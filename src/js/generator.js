/**
 * Example Generator logics module
 */
(function () {
	angular.module('math-generator', [])

	/**
   * Generator Controller is used to generate math example according to user settings and to share it over the application as an array
   */
	.controller('GeneratorController', ['SettingsService', 'ReadinessService', 'GeneratorService', function(SettingsService, ReadinessService, GeneratorService) {
		this.suitableExample;
		this.suitableExampleFlag;

		/**
		 * Used to check whether the answer is suitable according to the task restrictions
		 * @param  {Number} answer Answer value to check
		 */
		this.checkForSuitability = function(answer) {
			if (_.isInteger(answer) && answer <= 100 && answer >= 1) {
						this.suitableExampleFlag = false;
						ReadinessService.setReadinessServValue(true);
					}
		};

		/**
		 * Used to generate an example and the answer for it
		 * @param  {String} operation Type of the mathematical operation
		 */
		this.generateExampleAndAnswer = function (operation) {
				while (this.suitableExampleFlag) {
					this.exampleFirstOperator = _.random(1, 100);
					this.exampleSecondOperator = _.random(1, 100);
					
					if (operation == "isAddition") {
						this.suitableExampleAnswer = _.add(this.exampleFirstOperator, this.exampleSecondOperator);
						this.suitableExample = {"mathExpression": this.exampleFirstOperator + " + " + this.exampleSecondOperator + " = ", "correctAnswer": this.suitableExampleAnswer};
					}
					else if (operation == "isSubtraction") {
						this.suitableExampleAnswer = _.subtract(this.exampleFirstOperator, this.exampleSecondOperator); 
						this.suitableExample = {"mathExpression": this.exampleFirstOperator + " - " + this.exampleSecondOperator + " = ", "correctAnswer": this.suitableExampleAnswer};
					}
					else if (operation == "isMultiplication") {
						this.suitableExampleAnswer = _.multiply(this.exampleFirstOperator, this.exampleSecondOperator);
						this.suitableExample = {"mathExpression": this.exampleFirstOperator + " x " + this.exampleSecondOperator + " = ", "correctAnswer": this.suitableExampleAnswer};
					}
					else if (operation == "isDivision") {
						this.suitableExampleAnswer = _.divide(this.exampleFirstOperator, this.exampleSecondOperator);
						this.suitableExample = {"mathExpression": this.exampleFirstOperator + " / " + this.exampleSecondOperator + " = ", "correctAnswer": this.suitableExampleAnswer};
					}
					else { return false; }
					
						this.checkForSuitability(this.suitableExampleAnswer);
				}
		};

		/**
		 * Used to randomly generate an example
		 * @return {Boolean} Used to bind the functions logically
		 */
		this.generateExampleRandom = function () {
			ReadinessService.setReadinessServValue(false);
			this.userMathOperationSet = SettingsService.getSettingsServArray();
			// console.log(_.isEmpty(this.userMathOperationSet));
			// if (_.isEmpty(this.userMathOperationSet)) { return false; }
			// console.log("after");
			this.suitableExampleFlag = true;

			this.userMathOperationSetRandomised = _.shuffle(this.userMathOperationSet);
			this.typeOfGeneratedExample = _.head(this.userMathOperationSetRandomised);
			this.generateExampleAndAnswer(this.typeOfGeneratedExample);
			
			GeneratorService.setGeneratorServObject(this.suitableExample);
			return true;
		};
	}]);
})();