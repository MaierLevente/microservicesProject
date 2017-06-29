/**
* A basic Hello World function
* @param {string} name Who you're saying hello to
* @returns {string}
*/
module.exports = (name = 'world', context, callback) => {

const mqtt = require('mqtt')  
const client = mqtt.connect('mqtt://broker.hivemq.com')

var garageState = ''  
var connected = false

client.on('connect', () => {  
  client.subscribe('garage/connected')
})

client.on('message', (topic, message) => {  
  if(topic === 'garage/connected') {
    connected = (message.toString() === 'true');

  }
})


};
