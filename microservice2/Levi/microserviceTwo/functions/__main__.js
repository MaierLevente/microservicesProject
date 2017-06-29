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

var kapuhozKapcsolodva = false;
var kapuStatusza;

client.on('connect', () => {  
  client.subscribe('kapu/kapcsolatLetrehozva')
  client.subscribe('kapu/statusz')
})

client.on('message', (topic, message) => {  

  if(topic === 'kapu/kapcsolatLetrehozva') {
    kapuhozKapcsolodva = (message.toString() === 'true');
    //callback(null, 'Kapuhoz kapcsolodva: ' + kapuhozKapcsolodva);

  } else if(topic === 'kapu/statusz') {
    kapuStatusza = message.toString();
    //callback(null, 'Kapu statusza: ' + kapuStatusza);

    if(kapuhozKapcsolodva == true && kapuStatusza == 'zárva'){
      kaputKinyitni();
    } else if(kapuhozKapcsolodva == true && kapuStatusza == 'nyitva'){
      callback(null, 'Taviranyito Microservice: Parancs el volt kuldve es a kapu ki van nyitva');
    }
  }

  function kaputKinyitni () {  
      client.publish('kapu/nyitas', 'true');
  }
})

console.log('Microservice 2 started');

};
