var iotf = require("ibmiotf");

var sphero = require("sphero");
var orb = sphero("2716d1f08a5842b7ac37502a273772df");   // from noble/examples/advertisement-discovery.js

var push = 0;
var pull = 0;
var neu = 0;

//var orb = sphero("CF:A7:6A:4A:27:51");

var appClientConfig = {
  org: '4v2p8m',  // org from IBMIOT Device
  id: 'giovannibb8',  // org from IBMIOT Device
  "auth-key": 'a-4v2p8m-k88ktxgn2w',   // API Key from IBMIOT App
  "auth-token": '11!69DQZr1EuyGIuqR'   // Auth token from IBMIOT App
};

var appClient = new iotf.IotfApplication(appClientConfig);

//setting the log level to trace. By default its 'warn'
appClient.log.setLevel('info');

// Connect to bb8
orb.connect(function () {
  orb.color({ red: 0, green: 205, blue: 25 });
  orb.detectCollisions();
});

// Listener to IbmIot
appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {
  console.log("Device Event from :: " + deviceType + " : " + deviceId + " of event " + eventType + " with payload : " + payload);
  pl = JSON.parse(payload);
  push = pl.push;
  pull = pl.pull;
  neutral = pl.neu;
  if (push > 2) {
    orb.roll(push, 0);
  }
  if (pull > 2) {
    orb.roll(pull, 180);
  }
  if (neutral > 2) {
    orb.roll(0, 0);
  }
});

orb.on("collision", function (data) {
  console.log("collided");
  orb.color("red");
  orb.roll(0, 0);
  appClient.publishDeviceCommand("bb8", "giovannibb8", "move", "json", '{"5":"neu"}');
  setTimeout(function () {
    orb.color({ red: 255, green: 0, blue: 255 });
  }, 100);
  push = 0;
  pull = 0;
  neu = 0;
});



appClient.connect();

appClient.on("connect", function () {
  appClient.subscribeToDeviceEvents();
  appClient.publishDeviceCommand("bb8", "giovannibb8", "move", "json", '{"5":"neu"}');
});






