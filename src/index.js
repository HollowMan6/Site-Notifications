const webpush = require('./src/web-push.js');
const weather = require('./src/weather.js');

const subsinfo = process.env.SUBSINFO || process.env.INPUT_SUBSINFO;
const location = process.env.LOCATION || process.env.INPUT_LOCATION;
const title = process.env.TITLE || process.env.INPUT_TITLE;
const options = process.env.OPTIONS || process.env.INPUT_OPTIONS;

console.log("Try sending notifications...")

if (options) {
    webpush.pushNotification(subsinfo, title, JSON.parse(options));
} else {
    webpush.pushNotification(subsinfo, title);
}

console.log("\nTry sending weather forcast...")
weather.getAndPushWeather(subsinfo, location);
