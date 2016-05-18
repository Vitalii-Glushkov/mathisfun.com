/**
 * Panels processing logics module
 */
(function () {
	angular.module('math-panel', [])

	 /**
   * Panel Controller is used to organise tabs controll code 
   */
	.controller('PanelController', function() {
		this.tab = 1;

    /**
     * Used to switch between the tabs
     * @param  {Number} setTab Value that is used to switch between the tabs
     */
		this.selectTab = function(setTab) {
			this.tab = setTab;
		};

    /**
     * Used to mark tab as selected
     * @param  {Number}  checkTab Tab selection indicator
     * @return {Boolean}          Value used to mark tab as selected 
     */
		this.isSelected = function(checkTab) {
			return this.tab === checkTab;
		};
	});
})();