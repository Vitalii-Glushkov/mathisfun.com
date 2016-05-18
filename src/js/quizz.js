/**
 * Quizz Controller logics module
 */
(function () {
	angular.module('math-quizz', [])

	 /**
   * Quizz Controller is used to process the Quizz tab events
   */
	.controller('QuizzController', ['$scope', 'ReadinessService', 'GeneratorService', function ($scope, ReadinessService, GeneratorService) {
		$scope.question;
		this.answer;
		this.correctAnswer = 0;
		$scope.correctAnswerCounter = 0;
		$scope.wrongAnswerCounter = 0;

		/**
		 * Used to check the settings and the example readiness
		 * @return {Boolean} Used to bind functions logically
		 */
		this.checkIsReady = function() {
			this.answer = null;
			this.correctAnswer = 0;
			$scope.correctAnswerCounter = 0;
			$scope.wrongAnswerCounter = 0;
			
			this.isReady = ReadinessService.getReadinessServValue();

			if (this.isReady) {
				this.userQuizzExprObj = GeneratorService.getGeneratorServObject();
				this.questionInputEnabled();
				this.viewTheQuestion();
			}
			return true;
		};

		/**
		 * Used to view the next question
		 */
		this.viewTheQuestion = function() {
			$scope.question = this.userQuizzExprObj["mathExpression"];
			this.correctAnswer = this.userQuizzExprObj["correctAnswer"];
		};

		/**
		 * Used to check the answer according to the list of criterias: is a number, is an integer, less than or equal to 100 and greater than 0
		 * @param  {Number or String[IE9]} answ User's answer
		 * @return {Boolean}      If all the conditions are true then the returned value is true
		 */
		this.inputValidation = function(answ) {
			this.numberCheck = _.toNumber(answ);
			if ( _.isNaN(this.numberCheck) ) {
				$("#focusedInput").css("border-color", "#e9322d");
				return false;
			}

			this.integerCheck = _.isInteger(this.numberCheck);
			if (!this.integerCheck) {
				$("#focusedInput").css("border-color", "#e9322d");
				return false;
			}

			if (answ <= 0 || answ > 100) {
				$("#focusedInput").css("border-color", "#e9322d");
				return false;
			}

			return true;
		};

		/**
		 * Used to count the number of the correct/wrong answers
		 * @return {Boolean} Used to bind functions logically
		 */
		this.checkTheAnswer = function() {
			if ( this.inputValidation(this.answer) ) {
				$("#focusedInput").css("border-color", "rgba(82,168,236,0.8)");
				if (this.answer == this.correctAnswer) { $scope.correctAnswerCounter++; }
				else { $scope.wrongAnswerCounter++; }

				this.answer = null;

				return true;
			}
			else { return false; }
		};

		/**
		 * Used to get the next example
		 */
		this.getNextExample = function() {
			this.userQuizzExprObj = GeneratorService.getGeneratorServObject();
			this.viewTheQuestion();
		};

		/**
		 * Used to enable the user's input field
		 */
		this.questionInputEnabled = function() {
			$(".form-control").attr("disabled", false);
		};
	}]);
})();