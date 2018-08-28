// get a reference to the sms or call radio buttons
var billItemTypeWithSettings = document.querySelector(".billItemTypeWithSettings");

// get refences to all the settings fields
var warningLevelSetting = document.querySelector(".warningLevelSetting");
var callCostSettings = document.querySelector(".callCostSetting");
var smsCostSetting = document.querySelector(".smsCostSetting");
var criticalLevelSetting = document.querySelector(".criticalLevelSetting");

//get a reference to the add button
var settingsBillAddBtn = document.querySelector(".settingsBillAddBtn");

//get a reference to the 'Update settings' button
var updateSettingsBtn = document.querySelector(".updateSettings");
// console.log(callsTotalElem.innerHTML);


// create a variables that will keep track of all the settings
var callSettings =0;
var  smsSettings =0;
var totalS =0;

var callCost =0;
console.log(callCost);
var smsCost =0;
var warning =0;
var critical =0;

// create a variables that will keep track of all three totals.
var callTotalSettings = document.querySelector(".callTotalSettings");
var smsTotalSettings = document.querySelector(".smsTotalSettings");
var TotalSettings = document.querySelector(".totalSettings");
// console.log(TotalSettings);

function updateSettings(){
   callCost= parseFloat(callCostSettings.value);
   console.log(callCost);
   smsCost=parseFloat(smsCostSetting.value);
   warning=parseFloat(warningLevelSetting.value);
   critical=parseFloat(criticalLevelSetting.value);
}


function settingsBillTotal(){
    // get the value entered in the billType textfield
    var checkedSettingsBtn = document.querySelector("input[name='billItemTypeWithSettings']:checked");
    if (checkedSettingsBtn){
        var billItemTypeWithSettings = checkedSettingsBtn.value
        // billItemType will be 'call' or 'sms'
    }
    // update the correct total

    if (billItemTypeWithSettings === "call"){
      //console.log("siya");
      //console.log(callCost);
        callSettings += callCost;
        totalS += callCost;

        if (totalS > critical){
          var different = totalS - critical;
          callSettings -= different;
          totalS -= different;

        }
        console.log(callSettings)
        callTotalSettings.innerHTML = callSettings.toFixed(2);
        TotalSettings.innerHTML = totalS.toFixed(2);

    }
    else if (billItemTypeWithSettings === "sms"){
        smsSettings += smsCost;
        totalS += smsCost;

        if (totalS > critical){
          var different = totalS - critical;
          smsSettings -= different;
          totalS -= different;
}
}
          if (totalS >= warning){
                  // adding the danger class will make the text red
                  TotalSettings.classList.add("warning");

              }
           if (totalS >= critical){
                  TotalSettings.classList.add("danger");
              }
              if (totalS< critical){
                TotalSettings.classList.remove("danger");
              }
              if (totalS< warning){
                TotalSettings.classList.remove("warning");
              }


        smsTotalSettings.innerHTML = smsSettings.toFixed(2);
        TotalSettings.innerHTML = totalS.toFixed(2);

    //update the totals that is displayed on the screen.

}

settingsBillAddBtn.addEventListener('click', settingsBillTotal);
updateSettingsBtn.addEventListener('click',updateSettings);
//add an event listener for when the 'Update settings' button is pressed

//add an event listener for when the add button is pressed

//in the event listener get the value from the billItemTypeRadio radio buttons
// * add the appropriate value to the call / sms total
// * add the appropriate value to the overall total
// * add nothing for invalid values that is not 'call' or 'sms'.
// * display the latest total on the screen.
// * check the value thresholds and display the total value in the right color.
