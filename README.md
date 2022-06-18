# homebridge-http-webhooks
A http plugin with support of webhooks for [Homebridge](https://github.com/nfarina/homebridge).

The plugin gets its states from any system that is calling the url to trigger a state change.

Currently supports contact, motion, occupancy, smoke sensors, switches, push buttons, lights (only on/off and brightness), temperature sensors, humidity sensors, thermostats, CO2 sensors and leak sensors.

# Installation
1. Install homebridge using: `npm install -g homebridge`
2. Install this plugin using: `npm install -g homebridge-http-webhooks`
3. Update your configuration file. See sample-config.json snippet below.

# Retrieve state
To retrieve the current state you need to call the url `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToTrigger`
The returned JSON format is:
```
    {
        "success": true,
        "state": cachedState
    }
```

# Trigger change for boolean accessory
To trigger a change of a boolean accessory you need to call the url `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToTrigger&state=NEWSTATE`

## Contact sensor
For contact sensors the value for `NEWSTATE` is either `true` for contact or `false` for no contact. If `autoRelease` is used, than the state will be released after `autoReleaseTime`, if not set 5 seconds.

## Motion sensor
For motion sensors the value for `NEWSTATE` is either `true` for motion detection or `false` for no motion. If `autoRelease` is used, than the state will be released `autoReleaseTime`, if not set 5 seconds.

## Occupancy sensor
For occupancy sensors the value for `NEWSTATE` is either `true` for occupancy detection or 'false' for no occupancy. If `autoRelease` is used, than the state will be released `autoReleaseTime`, if not set 5 seconds.

## Smoke sensor
For smoke sensors the value for `NEWSTATE` is either `true` for smoke detection or `false` for no smoke.

## Switch
For switches the value for `NEWSTATE` is either `true` for on or `false` for off.

## Push button
For push buttons the value for `NEWSTATE` is `true`. The button will be released automatically.

## Light
For lights the value for `NEWSTATE` is either `true` for on or `false` for off.

## Outlet
For outlets the value for `NEWSTATE` is either `true` for on or `false` for off.

### Outlet in use
For outlets the additional state `stateOutletInUse` is available. The value for `NEWSTATE` is either `true` for on or `false` for off and
can be changed by calling the url `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToTrigger&stateOutletInUse=NEWSTATE`

## Fanv2
For fanv2 the value for `NEWSTATE` is either `true` for on or `false` for off.

## Valve
For valves/faucets the value for `NEWSTATE` is either `true` for on or `false` for off.

### Valve fault state
For valves the additional state `statusFault` is available. The value for `NEWSTATE` is either `true` for on or `false` for off and
can be changed by calling the url `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToTrigger&statusFault=NEWSTATE`

# Trigger action

## Switch
For switches you can call the url from any system to switch the switch on or off.

## Push button
For push buttons you can call the url from any system to push the button. The button will be released automatically.

## Light
For lights you can call the url from any system to switch the light on or off.

## Outlet
For outlets you can call the url from any system to switch the outlet on or off.

## Fanv2
For fanv2 you can call the url from any system to switch the fanv2 on or off.

# Update a numeric accessory
To update a numeric accessory you need to call the url `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToUpdate&value=NEWVALUE`

## Temperature sensor
For temperature sensors the value for `NEWVALUE` is the new temperature reading.

## Light sensor
For light sensors the value for `NEWVALUE` is the new light intensity in lux (as float).

## Humidity sensor
For humidity sensors the value for `NEWVALUE` is the new relative humidity percentage reading.

## Air Quality sensor
For air quality sensors the value for `NEWVALUE` is the new air quality value (Between 1-5, 1 Excellent).

## CO2 Sensor
For a CO2 sensor the value for `NEWVALUE` is the new PPM reading.

## Leak sensor
For leak sensors the value for `NEWVALUE` is the new leak state value (1 for leak, 0 for dry).

## Light (brightness)
For light brightness the value for `NEWVALUE` is the new light brightness (as integer, between 0 and 100 with respect to brightness factor).

# Thermostat
To update a thermostat you can update four different values:
* Current temperature reading: `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToUpdate&currenttemperature=NEWVALUE`
* Target temperature: `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToUpdate&targettemperature=NEWVALUE`
* Current state (Off=0 / Heating=1 / Cooling=2): `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToUpdate&currentstate=NEWVALUE`
* Target state (Off=0 / Heat=1 / Cool=2 / Auto=3): `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToUpdate&targetstate=NEWVALUE`

# Security System
To update the state of security, you can update two different values:
* Current state (Stay=0 / Away=1 / Night=2 / Disarmed=3 / Triggered=4): `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToUpdate&currentstate=NEWVALUE`
* Target state (Stay=0 / Away=1 / Night=2 / Disarm=3): `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToUpdate&targetstate=NEWVALUE`

# Garage Door opener
To update a garage door opener you can update three different values:
* Current door state (Open=0 / Closed=1 / Opening=2 / Closing=3 / Stopped=4): `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToUpdate&currentdoorstate=NEWVALUE`
* Target door state (Open=0 / Closed=1): `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToUpdate&targetdoorstate=NEWVALUE`
* Obstruction detected (No=0 / Yes=1): `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToUpdate&obstructiondetected=NEWVALUE`

# Stateless switch
Stateless switches requires 3 parameters accessoryId, buttonName and the event to trigger:
* Single press = 0
* Double press = 1
* Long press = 2

`http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToUpdate&buttonName=theButtonName&event=EVENT`

# Lock mechanism
To update a lock mechanism you can update two different values:

* Current lock state (unsecured=0 / secured=1 / jammed=2 / unknown=3): `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToUpdate&lockcurrentstate=NEWVALUE`
* Target lock state (unsecured=0 / secured=1): `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToUpdate&locktargetstate=NEWVALUE`

# Window Coverings
To update a window coverings you can update three different values:
* Current position (%): `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToUpdate&currentposition=%s` (%s is replaced by corresponding current position)
* Target position (%): `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToUpdate&targetposition=%s` (%s is replaced by corresponding target position)
Setting of target position you can realize by send link to: open, 20%, 40%, 60% 80% and close
* Position State (Decreasing=0 / Increasing=1 / Stopped=2): `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToUpdate&positionstate=0 (1 or 2)` (position state is not mandatory and not fully tested yet)

If you dont use callbacks to let your covering give feedback of current position back to homekit you can set "auto_set_current_position" to true.

# Fanv2
To update a fanv2 you can update five different values:
* Rotation Speed (%): `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToUpdate&speed=%s` (%s is replaced by fan's rotation speed)
* Swing Mode (DISABLED=0 / ENABLED=1): `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToUpdate&swingMode=0 (or 1)` (To use this feature, "enableSwingModeControls" in confing must be set to true.)
* Rotation Direction (CLOCKWISE=0 / COUNTER_CLOCKWISE=1): `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToUpdate&rotationDirection=0 (or 1)`
* Lock Physical Controls (DISABLED=0 / ENABLED=1): `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToUpdate&lockstate=0 (or 1)` (To use this feature, "enableLockPhysicalControls" in confing must be set to true.)
* Target Fan State (MANUAL=0 / AUTO=1): `http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToUpdate&targetState=0 (or 1)`(To use this feature, "enableTargetStateControls" in confing must be set to true.)

## Valves
For valves/faucets you can call the url from any system to switch the valve on or off.

# Configuration
Example config.json:
```
    {
    	"platforms": [{
    		"platform": "HttpWebHooks",
    		"webhook_port": "51828",
    		"webhook_listen_host": "::",
    		"webhook_enable_cors": true, 
    		"cache_directory": "./.node-persist/storage", 
    		"http_auth_user": "test", 
    		"http_auth_pass": "test", 
    		"https": true, 
    		"https_keyfile": "/pathToKeyFile/server.key", 
    		"https_certfile": "/pathToKeyFile/server.cert", 
    			"id": "switch1",
    			"name": "Switch name 1",
    			"rejectUnauthorized": false, 
    			"on_url": "your url to switch the switch on", 
    			"on_method": "GET",
    			"on_body": "{ \"on\" : true }",
    			"on_headers": "{\"Authorization\": \"Bearer ABCDEFGH\", \"Content-Type\": \"application/json\"}", 
    			"off_url": "your url to switch the switch off", 
    			"off_method": "GET", 
    			"off_body": "{ \"on\": false }", 
    			"off_headers": "{\"Authorization\": \"Bearer ABCDEFGH\", \"Content-Type\": \"application/json\"}" 
    		}],
    		"pushbuttons": [{
    			"id": "pushbutton1",
    			"name": "Push button name 1",
    			"rejectUnauthorized": false,
    			"push_url": "your url to be called on push", 
    			"push_method": "GET", 
    			"push_body": "{ \"push\": true }",
    			"push_headers": "{\"Authorization\": \"Bearer ABCDEFGH\", \"Content-Type\": \"application/json\"}" 
    		}],
    		"statelessswitches": [{
    			"id": "statelessswitch1",
    			"name": "Stateless Switch 1",
    			"buttons": [ 
    				{
    					"name": "Buttonq", 
    					"double_press": false,
    					"long_press": false
    				}
    			]
    		}
            ]
    }
```

## Cache directory storage (cache_directory)
The cache directory is used to cache the state of the accessories. It must point to a **valid** and **empty** directory and the user that runs homebridge must have **write access**.

## HTTPS
If you want to create a secure connection for the webhooks you need to enable it by setting *https* to true. Then a self signed
ssl certificate will be created automatically and a secure connection will be used. If you want to use your own generated ssl
certificate you can do this by setting the values for *https_keyfile* and *https_certfile* to the corresponding file paths.
