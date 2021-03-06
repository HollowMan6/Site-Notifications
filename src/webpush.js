"use strict";

const pushNotification = function (subsinfo, title, options = {}) {
  const webpush = require("web-push");
  webpush.setVapidDetails(
    "mailto:hollowman@hollowman.ml",
    "BOHSZycLLiXBjp0djrpD6vbzVX4g7D1QcW4cb1UonDcDYu6ewOXJ4qcz-e3J3d2VpjHgm0tHnZRjoGTv7SRJl7M",
    "tUCZ-8DGMlUhr3ntyN4PQoDbALJSBnv8yZXhi4XX1iI"
  );
  if (subsinfo) {
    if (title) {
      options.title = title;
      webpush
        .sendNotification(JSON.parse(subsinfo), JSON.stringify(options))
        .then(function (data) {
          console.log("Successfully sent!");
          console.log(data);
        })
        .catch(function (err) {
          try {
            var core = require("@actions/core");
            core.setFailed(err);
          } catch (error) {
            console.log(err, error);
            process.exit(1);
          }
        });
    } else {
      console.log("TITLE not set.");
    }
  } else {
    throw new Error("SUBSINFO not set!");
  }
};

module.exports = {
  pushNotification: pushNotification,
};
