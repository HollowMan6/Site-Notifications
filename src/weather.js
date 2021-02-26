const pushWeather = function (subsinfo, day0, data = "") {
    const day0 = hjson_day.HeWeather6[0].daily_forecast[0];
    const title = day0.cond_txt_d + "，" + hjson_day.HeWeather6[0].basic.location + "，" + hjson_day.HeWeather6[0].basic.admin_area;
    const options = {
        "requireInteraction": True,
        "vibrate": [200, 100, 200]
    };
    options.icon = encodeURI("https://github.com/zhuguohui/WeatherTextViewDemo/raw/master/weather/src/main/assets/weather/" +
        day0.cond_txt_d + ".png");
    options.body = "气温：" + day0.tmp_max + " -- " + day0.tmp_min + "\n";
    if (data) {
        const hjson_air = JSON.parse(data);
        if (hjson_air.HeWeather6[0].status == "ok") {
            options.body += "空气质量：" + hjson_air.HeWeather6[0].air_now_city.aqi + hjson_air.HeWeather6[0].air_now_city.qlty + "\n";
        }
    }
    options.body += "日间天气：" + day0.cond_txt_d + "\n";
    options.body += "夜间天气：" + day0.cond_txt_n + "\n";
    options.body += "湿度：" + day0.hum + "％\n";
    options.body += "风向：" + day0.wind_dir + "\n";
    options.body += "风力：" + day0.wind_sc + "\n";
    options.body += "UV指数：" + day0.uv_index;
    options.data = "https://www.qweather.com/weather/" + hjson_day.HeWeather6[0].basic.cid + ".html";
    const webpush = require('./webpush.js');
    webpush.pushNotification(subsinfo, title, options);
    console.log("Weather sending succeeded!")
}

const getAndPushWeather = function (subsinfo, location) {
    const https = require('https');
    if (location)
        https.get('https://free-api.heweather.net/s6/weather/forecast?location=' + location + '&key=90a2d6b5f3864f9cb2b5d591201e867a&lang=zh-hans', (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                const hjson_day = JSON.parse(data);
                if (hjson_day.HeWeather6[0].status == "ok") {
                    https.get('https://free-api.heweather.net/s6/air/now?location=' + hjson_day.HeWeather6[0].basic.parent_city + '&key=e8410d236ac043bbb9939bd536e2e646&lang=zh-hans', (resp) => {
                        let data = '';

                        resp.on('data', (chunk) => {
                            data += chunk;
                        });

                        resp.on('end', () => {
                            pushWeather(subsinfo, day0, data);
                        });
                    }).on("error", (err) => {
                        console.error("Error: " + err.message)
                        pushWeather(subsinfo, day0);
                    });
                } else {
                    throw new Error(hjson_day.HeWeather6[0].status);
                }
            });
        }).on("error", (err) => {
            throw new Error("Error: " + err.message);
        });
    else {
        console.log("LOCATION not set.")
    }
}