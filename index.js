var HttpWebHookSwitchAccessory = require('./src/homekit/accessories/HttpWebHookSwitchAccessory');
var HttpWebHookPushButtonAccessory = require('./src/homekit/accessories/HttpWebHookPushButtonAccessory');
var HttpWebHookStatelessSwitchAccessory = require('./src/homekit/accessories/HttpWebHookStatelessSwitchAccessory');

module.exports = function(homebridge) {
  homebridge.registerAccessory("homebridge-http-webhooks", "HttpWebHookSwitch", HttpWebHookSwitchAccessory);
  homebridge.registerAccessory("homebridge-http-webhooks", "HttpWebHookPushButton", HttpWebHookPushButtonAccessory);
   "HttpWebHookStatelessSwitch", HttpWebHookStatelessSwitchAccessory);
};
