var EventHubClient = require('azure-event-hubs').Client;
var ee = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;
var amqp = require('amqp-connection-manager');

var connection = amqp.connect(['amqp://localhost']);

//var connectionString = 'HostName={folio3-iot-hub-test.azure-devices.net;DeviceId=myFirstNodeDevice;SharedAccessKey={yourdevicekey}';
var connectionString = 'HostName=folio3-iot-hub-test.azure-devices.net;DeviceId=myFirstNodeDevice;SharedAccessKeyName=iothubowner;SharedAccessKey=VOiURzjXf3D1iqr22kWY7aZoTYseG9nluZZaoYXdVvM=';
var printError = function (err) {
    console.log(err.message);
};


var printMessage = function (message) {
    console.log('Message received: ');
    console.log(JSON.stringify(message.body));
    console.log('');
};

// var client = clientFromConnectionString(connectionString);
var client = EventHubClient.fromConnectionString(connectionString);
client.open()
    .then(client.getPartitionIds.bind(client))
    .then(function (partitionIds) {
        return partitionIds.map(function (partitionId) {
            return client.createReceiver('$Default', partitionId, { 'startAfterTime' : Date.now()
            }).then(function(receiver) {
                console.log('Created partition receiver: ' + partitionId);
                receiver.on('errorReceived', printError);
                receiver.on('message', printMessage);
            });
        });
    })
    .catch(printError);
