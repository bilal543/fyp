'use strict';

var iothub = require('azure-iothub');

// var connectionString = '{iothubowner}';
var connectionString = 'HostName=folio3-iot-hub-test.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=VOiURzjXf3D1iqr22kWY7aZoTYseG9nluZZaoYXdVvM=';

var registry = iothub.Registry.fromConnectionString(connectionString);

var device = {
    deviceId: 'myFirstNodeDevice'
};

registry.create(device, function(err, deviceInfo, res) {
    if (err) {
        registry.get(device.deviceId, printDeviceInfo);
    }
    if (deviceInfo) {
        printDeviceInfo(err, deviceInfo, res)
    }
});

function printDeviceInfo(err, deviceInfo, res) {
    if (deviceInfo) {
        console.log('Device ID: ' + deviceInfo.deviceId);
        console.log('Device key: ' + deviceInfo.authentication.symmetricKey.primaryKey);
    }
}
