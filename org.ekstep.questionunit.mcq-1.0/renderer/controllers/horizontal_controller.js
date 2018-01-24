// TODO: Controller for horizontalTemplate.html
'use strict';
angular.module('genie-canvas').controllerProvider.register("MCQRendererController", function($scope, $rootScope) {
  //var ctrl = this;
  $scope.showTemplate = true;
  $scope.question;
  $scope.selectedAns;
  $scope.events = {"show":"", "hide":"", "eval": ""};

  $scope.init = function() {
    $scope.cssPath = org.ekstep.pluginframework.pluginManager.resolvePluginResource("org.ekstep.questionunit.mcq", "1.0", "renderer/styles/style.css");
    $scope.pluginInstance = EkstepRendererAPI.getPluginObjs("org.ekstep.questionunit.mcq");
    $scope.pluginInstance.initPlugin($scope.pluginInstance);
    
    $scope.events.eval = $scope.pluginInstance._manifest.id + ":evaluate";
    $scope.events.show = $scope.pluginInstance._manifest.id + ":show";
    $scope.events.hide = $scope.pluginInstance._manifest.id + ":hide";
    
    $scope.removeEvents(); 
    $scope.registerEvents();  
    if(!$rootScope.isMCQRendererd){
      $rootScope.isMCQRendererd = true;
    }
    if(EventBus.hasEventListener($scope.events.eval)){
      if(EventBus.listeners[$scope.events.eval].length > 1)
        EventBus.removeEventListener($scope.events.eval, $scope.evalListener)
    }
  }

  $scope.registerEvents = function(){
    /**
     * renderer:questionunit.ftb:dispatch an event in question set with question data.
     * @event renderer:questionunit.ftb:dispatch
     * @memberof org.ekstep.questionunit.ftb
     */
    EkstepRendererAPI.addEventListener($scope.events.show, $scope.showEventListener);
    /**
     * renderer:questionunit.ftb:hide template on question set navigation.
     * @event renderer:questionunit.ftb:dispatch
     * @memberof org.ekstep.questionunit.ftb
     */
    EkstepRendererAPI.addEventListener($scope.events.hide, $scope.hideEventListener);
    /**
     * renderer:questionunit.ftb:question set call evalution using plugin instance.
     * @event renderer:questionunit.ftb:click
     * @memberof org.ekstep.questionunit.ftb
     */
    EkstepRendererAPI.addEventListener($scope.events.eval, $scope.evalListener);
  }

  $scope.removeEvents = function(){
    EkstepRendererAPI.removeEventListener($scope.events.hide, $scope.hideEventListener, undefined);
    EkstepRendererAPI.removeEventListener($scope.events.show, $scope.showEventListener, undefined);
    EkstepRendererAPI.removeEventListener($scope.events.eval, $scope.evalListener, undefined);
  }

  $scope.showEventListener = function(event){
    var ctrlScope = angular.element('#preview-mcq-horizontal').scope();
    ctrlScope.question = event.target;
    var qData=ctrlScope.question._currentQuestion.data.__cdata||ctrlScope.question._currentQuestion.data;
    var questionData = JSON.parse(qData);
    var qState = ctrlScope.question._currentQuestionState;
    if(qState && qState.val) {
      ctrlScope.selectedIndex = qState.val;
    }
    ctrlScope.questionObj = questionData;
    ctrlScope.showTemplate = true;
    ctrlScope.safeApply();
  }

  $scope.hideEventListener = function(event){
   // var ctrlScope = angular.element('#preview-mcq-horizontal').scope();
    // ctrlScope.showTemplate = false;
    // ctrlScope.safeApply();
    //code commented beause on click reply scope object not find
    $scope.showTemplate = false;
     $scope.safeApply();
    
  }

  $scope.evalListener = function(event){
    var ctrlScope = angular.element('#preview-mcq-horizontal').scope();
    
    var callback = event.target;
    ctrlScope.evaluate(callback);
    ctrlScope.safeApply();
  }

  $scope.selectedvalue = function(val, index) {
    $scope.selectedIndex = index;
    $scope.selectedAns = val.isCorrect;
    var state = {
        val: $scope.selectedIndex
    }
     $scope.generateItemResponse(val, index);
    EkstepRendererAPI.dispatchEvent('org.ekstep.questionset:saveQuestionState', state);
  }
  
  $scope.evaluate = function(callback) {
    var correctAnswer;
    var ctrlScope = angular.element('#preview-mcq-horizontal').scope();
    ctrlScope.questionObj.options.forEach(function(option) {
      if (option.isCorrect === ctrlScope.selectedAns) {
        correctAnswer = option.isCorrect;
      }
    });
    var result = {
        eval: correctAnswer,
        state: {
            val: ctrlScope.selectedIndex
        }
    }
    if(_.isFunction(callback)) {
      callback(result);
    }
    ctrlScope.selectedIndex = null;
  }
   $scope.generateItemResponse = function(val, index) {
        var edata = {
            "target":{
                "id": $scope.pluginInstance._manifest.id ? $scope.pluginInstance._manifest.id : "",
                "ver": $scope.pluginInstance._manifest.ver ? $scope.pluginInstance._manifest.ver : "1.0",
                "type": $scope.pluginInstance._manifest.type ? $scope.pluginInstance._manifest.type : "plugin"
            },
            "type": "CHOOSE",
            "values": [{ index: val.text }] ;
        }
        TelemetryService.itemResponse(edata);
    }

  $scope.telemetry = function(event){
    TelemetryService.interact("TOUCH", event.target.id, "TOUCH", {
      stageId: Renderer.theme._currentStage
    });
  }
});