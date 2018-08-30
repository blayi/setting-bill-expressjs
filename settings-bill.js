var moment = require('moment');
module.exports  = function SettingsFactory() {


    var callSettings = 0;
    var smsSettings = 0;
    var totalS = 0;

    var callCost = 2;
    var smsCost = 1;
    var warning = 10;
    var critical = 30;
    var stampMap=[];


    var settingsLogic = function(billType) {

if (totalS < critical) {
  if (billType === "sms") {
    smsSettings += smsCost;
    totalS += smsCost;


  }
  if (billType === "call") {
    callSettings += callCost;
    totalS += callCost;


  }
}
      storeTime(billType);
    }

     var getAction = function(){
       for (var i = 0; i < stampMap.length; i++) {
         let ment = moment(stampMap[i].timestamp).fromNow();
         stampMap[i].ago = ment;
       }
       return stampMap;
     }
      //getting totals
      var getCall = function() {
        return callSettings.toFixed(2);
      }
      var getSms = function() {
        return smsSettings.toFixed(2);
      }
      var getTotals = function() {
        return smsSettings + callSettings;
      }
///////////////////////////////////////////////////

      //getting settings values
      var getCalls = function() {
        return callCost;
      }
      var getSmss = function() {
        return smsCost;
      }
      var getWarning = function() {
        return warning;
      }
      var getCritical = function() {
        return critical;
      }

/////////////////////////////////////////
        //setters

      var setCallCost = function(value) {
        callCost = parseFloat(value);
      }
      var setSmsCost = function(value) {
        smsCost = parseFloat(value);
      }
      var setWarning = function(value) {
        warning = parseFloat(value);
      }
      var setCritical = function(value) {
        critical = parseFloat(value);
      }
////////////////////////////////////////////////
      var ReachedWarning = function() {
       return getTotals() >= getWarning();
      }

      var ReachedCritical = function() {
      return  getTotals() >=getCritical();
      }

      var storeTime = function(value){
        let d = new Date ();
        if (value==="call"){

          stampMap.unshift({
            type: "call",
            price: getCalls(),
            timestamp:d
          })
        }
        else if ( value==="sms")(
          stampMap.unshift({
            type: "sms",
            price: getSmss(),
            timestamp:d
          })
        )
      }
    var filter = function(value) {
  let temp = [];
  for (var i = 0; i < stampMap.length; i++) {
    if (stampMap[i].type === value) {
      temp.push(stampMap[i]);
    }

  }
return temp ;
}

      return {
        settingsLogic,
        getCall,
        getCalls,
        getSms,
        getSmss,
        getWarning,
        getCritical,
        getTotals,
        setCallCost,
        setSmsCost,
        setWarning,
        setCritical,
        ReachedWarning,
        ReachedCritical,
        storeTime,
        getAction,
        filter

      }
    }
