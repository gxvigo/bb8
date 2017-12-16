var iotf = require("./");

var sphero = require("../sphero");
var orb = sphero("c40e76bcb28f4acf99e11c367b9ce47e");

//var orb = sphero("CF:A7:6A:4A:27:51");

var appClientConfig = {
  org: 'cvdsbz',
  id: 'tribecabb802',
  "auth-key": 'a-cvdsbz-z15otdggrh',
  "auth-token": 'yGbTw_(byoe+6MDfyz'
};

var appClient = new iotf.IotfApplication(appClientConfig);

//setting the log level to trace. By default its 'warn'
appClient.log.setLevel('info');




orb.connect(function(){
	orb.color({ red: 0, green: 205, blue: 25 });
  orb.detectCollisions();

});
  
  appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {
  console.log("Device Event from :: "+deviceType+" : "+deviceId+" of event "+eventType+" with payload : "+payload);
  pl = JSON.parse(payload);
  push = pl.push;
  pull = pl.pull;
  neutral = pl.neutral;
  	if(push > 2){
  		orb.roll(push, 0);
  	}
  	if(pull > 2){
  		orb.roll(pull, 180);
  	}
  	if(neutral > 2){
  		orb.roll(0, 0);
  	}


});

orb.on("collision", function(data) {
		console.log("collided");

    orb.color("red");
    orb.roll(0, 0);
    appClient.publishDeviceCommand("bb8","tribecabb801", "move", "json", '{"5":"neu"}');
    setTimeout(function() {
      orb.color({ red: 255, green: 0, blue: 255 });
    }, 100);
    push = 0;
    pull = 0;
    neu = 0;
  });







appClient.connect();

appClient.on("connect", function () {

        appClient.subscribeToDeviceEvents();
        appClient.publishDeviceCommand("bb8","tribecabb801", "move", "json", '{"5":"neu"}');
});

var push = 0 ;
var pull = 0;
var neu = 0;





