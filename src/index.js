'use strict';

const core = require('@actions/core');
const webpush = require('./webpush.js');
const weather = require('./weather.js');

const subsinfo = process.env.SUBSINFO || core.getInput('SUBSINFO');
const location = process.env.LOCATION || core.getInput('LOCATION');
const title = process.env.TITLE || core.getInput('TITLE');
const options = process.env.OPTIONS || core.getInput('OPTIONS');

console.log("Try sending notifications...")
try {
    if (options) {
        webpush.pushNotification(subsinfo, title, JSON.parse(options));
    } else {
        webpush.pushNotification(subsinfo, title);
    }
    console.log("\nTry sending weather forcast...")
    weather.getAndPushWeather(subsinfo, location);
} catch (error) {
    core.setFailed(error.message);
}