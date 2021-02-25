#!/usr/bin/env python
# -*-coding:utf-8-*-
# by 'hollowman6' from Lanzhou University(兰州大学)

from pywebpush import webpush, WebPushException
import os
import sys
import json

subsInfo = os.environ['SUBSINFO']


def pushNotification(title, options={}):
    if subsInfo:
        data = {}
        if options:
            data = json.loads(options)
        data["title"] = title
        try:
            webpush(
                subscription_info=json.loads(subsInfo),
                data=data,
                vapid_private_key="tUCZ-8DGMlUhr3ntyN4PQoDbALJSBnv8yZXhi4XX1iI",
                vapid_claims={
                    "sub": "mailto:hollowman@hollowman.ml",
                }
            )
        except WebPushException as ex:
            print("I'm sorry, but: {}", repr(ex))
            # Mozilla returns additional information in the body of the response.
            if ex.response and ex.response.json():
                extra = ex.response.json()
                print("Remote service replied with a {}:{}, {}",
                      extra.code,
                      extra.errno,
                      extra.message
                      )


if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        pushNotification(sys.argv[1], sys.argv[2])
    else:
        pushNotification(sys.argv[1])
