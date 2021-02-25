#!/usr/bin/env python
# -*-coding:utf-8-*-
# by 'hollowman6' from Lanzhou University(兰州大学)

import requests
import webpush
import json
import os
from urllib.request import quote

# Get the weather report
r_day = requests.get('https://free-api.heweather.net/s6/weather/forecast?location=' +
                     os.environ['LOCATION'] + '&key=90a2d6b5f3864f9cb2b5d591201e867a&lang=zh-hans')
r_air = requests.get('https://free-api.heweather.net/s6/air/now?location=' +
                     os.environ['LOCATION'] + '&key=e8410d236ac043bbb9939bd536e2e646&lang=zh-hans')

# Use json to parse
hjson_day = json.loads(r_day.text)
hjson_air = json.loads(r_air.text)

# Push weather report
if hjson_day['HeWeather6'][0]['status'] == "ok":
    day0 = hjson_day['HeWeather6'][0]['daily_forecast'][0]
    title = day0['cond_txt_d'] + "，" + hjson_day['HeWeather6'][0]['basic']['location'] + \
        "，" + hjson_day['HeWeather6'][0]['basic']['admin_area']
    options = {"requireInteraction": True, "vibrate": [200, 100, 200]}
    options['icon'] = quote("https://github.com/zhuguohui/WeatherTextViewDemo/raw/master/weather/src/main/assets/weather/" + \
        day0['cond_txt_d'] + ".png", safe=";/?:@&=+$,", encoding="utf-8")
    options['body'] = "气温："+day0['tmp_max']+" -- "+day0['tmp_min']+"\n"
    if hjson_air['HeWeather6'][0]['status'] == "ok":
        options['body'] += "空气质量："+hjson_air['HeWeather6'][0]['air_now_city']['aqi'] + \
            hjson_air['HeWeather6'][0]['air_now_city']['qlty']+"\n"
    options['body'] += "日间天气："+day0['cond_txt_d']+"\n"
    options['body'] += "夜间天气："+day0['cond_txt_n']+"\n"
    options['body'] += "湿度："+day0['hum']+"％\n"
    options['body'] += "风向："+day0['wind_dir']+"\n"
    options['body'] += "风力："+day0['wind_sc']+"\n"
    options['body'] += "UV指数："+day0['uv_index']+"\n"
    options['data'] = "https://www.qweather.com/weather/" + \
        hjson_day['HeWeather6'][0]['basic']['cid'] + ".html"
    webpush.pushNotification(title, json.dumps(options))
else:
    raise Exception(hjson_day['HeWeather6'][0]['status'])
