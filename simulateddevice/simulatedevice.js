var clientFromConnectionString = require('azure-iot-device-amqp').clientFromConnectionString;
var Message = require('azure-iot-device').Message;


// var connectionString = 'HostName={folio3-iot-hub-test.azure-devices.net};DeviceId=myFirstNodeDevice;SharedAccessKey={VOiURzjXf3D1iqr22kWY7aZoTYseG9nluZZaoYXdVvM=}';
var connectionString = 'HostName=folio3-iot-hub-test.azure-devices.net;DeviceId=myFirstNodeDevice;SharedAccessKeyName=iothubowner;SharedAccessKey=VOiURzjXf3D1iqr22kWY7aZoTYseG9nluZZaoYXdVvM=';

var client = clientFromConnectionString(connectionString);

function printResultFor(op) {
    return function printResult(err, res) {
          if (err) console.log(op + ' error: ' + err.toString());
        if (res) console.log(op + ' status: ' + res.constructor.name);
    };
}
var connectCallback = function (err) {
    if (!err) {
        console.log('Client connected');

        // Create a message and send it to the IoT Hub every second
        setInterval(function(){
            var temperature = 20 + (Math.random() * 15);
            var humidity = 60 + (Math.random() * 20);
            var data = JSON.stringify({ deviceId: 'myFirstNodeDevice', temperature: temperature, humidity: humidity });
            // console.log('yahan pr');
            console.log('');
            var message = new Message(data);
            message.properties.add('temperatureAlert', (temperature > 30) ? 'true' : 'false');
            console.log("Sending message: " + message.getData());
            client.sendEvent(message, printResultFor('send'));
            // client.sendEvent(message, function(){ client.close(); });
        }, 1000);


    } else {
        console.log('Could not connect: ' + err);
    }
};

client.open(connectCallback);