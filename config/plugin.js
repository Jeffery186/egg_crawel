"use strict";

/** @type Egg.EggPlugin */
module.exports = {
    // had enabled by egg
    // static: {
    //   enable: true,
    // }
    mongoose: {
        enable: false,
        package: "egg-mongoose",
    },
    cache: {
        enable: true,
        package: "egg-cache",
    },
    mysql: {
        enable: true,
        package: "egg-mysql",
    },
};
