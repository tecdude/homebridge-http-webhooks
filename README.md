# homebridge-http-webhooks
A [Homebridge](https://github.com/homebridge/homebridge) plugin that can post to Discord webhooks.

Currently supports switches and push buttons.

# Installation
1. Install homebridge using: `npm install -g homebridge`
2. Install this plugin using: `npm install -g homebridge-discord`
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

## Switch
For switches the value for `NEWSTATE` is either `true` for on or `false` for off.

## Push button
For push buttons the value for `NEWSTATE` is `true`. The button will be released automatically.

# Trigger action

## Switch
For switches you can call the url from any system to switch the switch on or off.

## Push button
For push buttons you can call the url from any system to push the button. The button will be released automatically.


# Stateless switch
Stateless switches requires 3 parameters accessoryId, buttonName and the event to trigger:
* Single press = 0
* Double press = 1
* Long press = 2

`http://yourHomebridgeServerIp:webhook_port/?accessoryId=theAccessoryIdToUpdate&buttonName=theButtonName&event=EVENT`

# Configuration
Example config.json:
```
    {
    	"platforms": [{
    		"platform": "Discord",
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
    					"name": "Button1", 
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
