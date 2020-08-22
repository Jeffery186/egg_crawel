/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = (exports = {});

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + "_1575687479493_5353";

    // add your middleware config here
    config.middleware = [];

    // config.mongoose = {
    //     url: "mongodb://127.0.0.1/crawel",
    //     options: {
    //         keepAlive: 1,
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //         useFindAndModify: false,
    //         auth: { authSource: "admin" },
    //         user: "admin",
    //         pass: "123456"
    //     }
    //     // mongoose global plugins, expected a function or an array of function and options
    //     // plugins: [createdPlugin, [updatedPlugin, pluginOptions]]
    // };

    config.cache = {
        default: "memory",
        stores: {
            memory: {
                driver: "memory",
                max: 100,
                ttl: 0,
            },
        },
    };

    config.mysql = {
        // 单数据库信息配置
        client: {
            // host
            host: "127.0.0.1",
            // 端口号
            port: "3306",
            // 用户名
            user: "root",
            // 密码
            password: "**********",
            // 数据库名
            database: "egg_crawel",
            // 数据类型
            charset: "utf8mb4_general_ci",
            // 时区选择
            timezone: "+08:00",
            // 强制日期类型(TIMESTAMP, DATETIME, DATE)以字符串返回，而不是一javascript Date对象返回. (默认: false)
            dateStrings: true,
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
    };

    config.alinode = {
        enable: true,
        appid: "2317",
        secret: "018788ea0ad4f2cd20c1328dc24c17e399d35b3a",
    };

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    return {
        ...config,
        ...userConfig,
    };
};
