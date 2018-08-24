const express =require ('express')
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingsFactory =require('./settings-bill');

const app = express();
const settingsBill = SettingsFactory();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
  let callCost =settingsBill.getCalls();
  let smsCost = settingsBill.getSmss();
  let warning = settingsBill.getWarning();
  let critical =settingsBill.getCritical();
  //get the totalS
  let   grandTotal = settingsBill.getTotals();
  let callSettings =settingsBill.getCall();
  let smsSettings = settingsBill.getSms();

  let color;
  if (grandTotal>=critical){
    color = "danger"
  }
else if (grandTotal>=warning){
    color = "warning"
  }

  // add your totals here...
  // use the totals in the template...
    res.render('index',{
      callCost,
      smsCost,
      warning,
      critical,
      callSettings,
      smsSettings,
      grandTotal,
      color
    });
});

app.post('/settings', function(req, res){

    let callCost = parseFloat(req.body.callCost);
    let smsCost = parseFloat(req.body.smsCost);
    let warning = parseFloat(req.body.warningLevel);
    let critical = parseFloat(req.body.criticalLevel);

    settingsBill.setCallCost(callCost);
    settingsBill.setSmsCost(smsCost);
    settingsBill.setWarning(warning);
    settingsBill.setCritical(critical);

  res.redirect('/');
  });

  app.post('/action', function(req, res){
     let action = req.body.actionType;
settingsBill.settingsLogic(action);
res.redirect('/');
    });

app.get('/actions', function(req, res){
    res.render('actions',{stampAction:settingsBill.getAction() });
    });

    app.get('/actions/:type', function(req, res){
   let temporary =req.params.type;
   settingsBill.getAction();
   res.render('actions',{stampAction:settingsBill.filter(temporary)});

      });

    //   color = '';
    //   if (totalS>=warningLevel){
    //     color = "warning"
    //   }
    // else if (totalS>=criticalLevel){
    //     color = "danger"
    //   }

const PORT =process.env.PORT || 3011;
app.listen(PORT,function(){
console.log("App started port:", PORT)
});
