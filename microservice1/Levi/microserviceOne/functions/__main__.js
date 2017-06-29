/**
* A basic Hello World function
* @param {string} name Who you're saying hello to
* @returns {string}
*/
module.exports = (name = 'world', context, callback) => {

var mqtt = require('mqtt');
var options = {
    port: 15139,
    host: 'mqtt://m21.cloudmqtt.com',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'wvyntdpz',
    password: 'bFWNurIN-Slw',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};
var client = mqtt.connect('mqtt://m21.cloudmqtt.com', options);

var statusz = 'zárva';

// Itt kapcsolodunk a borkerhez
client.on('connect', function() { 

	client.publish('kapu/kapcsolatLetrehozva', 'true');
	kapuStatuszKuldes();

	client.subscribe('kapu/nyitas');
	client.on('message', (topic, message) => {  
		if(topic === 'kapu/nyitas') {
    		kaputNyitni = (message.toString() === 'true');
    		if(kaputNyitni){
    			setTimeout(() => { kaputKinyitni();}, 5000);
    		}
  	}
})
	function kapuStatuszKuldes () {  
  		client.publish('kapu/statusz', statusz);
	}
	
	function kaputKinyitni () {  
		statusz = 'nyitva';
  		kapuStatuszKuldes();
  		callback(null, 'Kapu Microservice: Kapu kinyitva');
	}

  // 			  Ez a topic    Ez az üzenet a topichoz
  /*client.publish('garageDoorStatus', 'CLOSED', function() {
    console.log("Message is published");
    //client.end(); // Close the connection when published
    callback(null, `hello World`);
  });

  client.publish('q', 'my message', function() {
    console.log("Message is published");
    //client.end(); // Close the connection when published
  });

  client.publish('f', 'my message', function() {
    console.log("Message is published");
    //client.end(); // Close the connection when published
  });*/
});

console.log('Interesting');

};