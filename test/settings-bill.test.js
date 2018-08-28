let assert = require("assert");
let settingsBill = require("../settings-bill");

describe('settings-bill', function() {

  it('Update the appropriate smsTotal.', function() {
    var settingsB = settingsBill();
    settingsB.setSmsCost(0.75);
    settingsB.settingsLogic('sms');
    assert.equal(settingsB.getSms(), 0.75);

  });

  it('Update the appropriate callsTotal.', function() {
    var settingsB = settingsBill()
    settingsB.setCallCost(2.75);
    settingsB.settingsLogic('call')
    assert.equal(settingsB.getCall(), 2.75);

  });
  it('should calculate total amount of sms&call.', function() {
    var settingsB = settingsBill()
    settingsB.setCallCost(2.75);
    settingsB.setSmsCost(0.75);
    settingsB.settingsLogic('call')
    settingsB.settingsLogic('call')
    settingsB.settingsLogic('sms');
    settingsB.settingsLogic('sms');
    settingsB.settingsLogic('call')
    settingsB.settingsLogic('call')
    assert.equal(settingsB.getCall(), 11);

  });
  it('test if reached warning level' , function(){
    var settingsB = settingsBill()
    // settingsB.settingsLogic('call')
    // settingsB.settingsLogic('sms');

    settingsB.setCallCost(2.75);
    settingsB.setSmsCost(0.75);
    settingsB.setWarning(5);
    settingsB.setCritical(10);
    // assert.equal(settingsB.ReachedWarning(),false);
    settingsB.settingsLogic('sms');
    settingsB.settingsLogic('call')
    settingsB.settingsLogic('call');
    settingsB.settingsLogic('call');
    settingsB.settingsLogic('sms');
      settingsB.settingsLogic('sms');
        settingsB.settingsLogic('sms');

    // assert.equal(settingsB.ReachedWarning(),true);

    assert.equal(settingsB.getTotals(),10.50);

  });

  // it('test if reaches critical level' , function(){
  //   var settingsB = settingsBill()
  //   settingsB.settingsLogic('call')
  //   settingsB.settingsLogic('sms');
  //   assert.equal(settingsB.ReachedCritical(), true);
  //   settingsB.settingsLogic('sms');
  //   settingsB.settingsLogic('call')
  //   settingsB.settingsLogic('sms');
  //   settingsB.settingsLogic('sms');
  //   settingsB.settingsLogic('call')
  //   settingsB.settingsLogic('call')
  //   settingsB.settingsLogic('sms');
  //   settingsB.settingsLogic('sms');
  //   settingsB.settingsLogic('call')
  //   settingsB.settingsLogic('call')
  //   settingsB.settingsLogic('call')
  //   settingsB.settingsLogic('call')
  //
  //   assert.equal(settingsB.ReachedCritical(),true );
  //
  //
  //   });

});
