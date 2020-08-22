"use strict";
const { inspect } = require("util");
const { parse, resolve, format } = require("url");
const crypto = require("crypto");
const pick = require("lodash/pick");
const trim = require("lodash/trim");
const startsWith = require("lodash/startsWith");
const some = require("lodash/some");
const includes = require("lodash/includes");
const isPlainObject = require("lodash/isPlainObject");
const isString = require("lodash/isString");
const isFunction = require("lodash/isFunction");
const isRegExp = require("lodash/isRegExp");

const PICKED_OPTION_FIELDS = ["url", "device", "userAgent", "extraHeaders"];
const MAX_KEY_LENGTH = 10;

module.exports = {
    /**
     * @param {!number} milliseconds
     * @return {!Promise}
     */
    delay(milliseconds) {
        return new Promise((_resolve) => setTimeout(_resolve, milliseconds));
    },

    /**
     * @param {!string} src
     * @return {!string}
     */
    hash(src) {
        const md5hash = crypto.createHash("md5");
        md5hash.update(src, "utf8");
        return md5hash.digest("hex");
    },

    /**
     * @param {!Object} options
     * @return {!string}
     */
    generateKey(options) {
        const json = JSON.stringify(
            pick(options, PICKED_OPTION_FIELDS),
            Helper.jsonStableReplacer
        );
        return Helper.hash(json).substring(0, MAX_KEY_LENGTH);
    },

    /**
     * @param {!string} key
     * @param {?*} val
     * @return {!Object}
     */
    jsonStableReplacer(key, val) {
        if (!isPlainObject(val)) return val;
        return Object.keys(val)
            .sort()
            .reduce((obj, _key) => {
                obj[_key] = val[_key];
                return obj;
            }, {});
    },

    /**
     * @param {!string} url
     * @param {!string} baseUrl
     * @return {!string}
     */
    resolveUrl(url, baseUrl) {
        url = trim(url);
        if (!url) return null;
        if (startsWith(url, "#")) return null;
        const { protocol } = parse(url);
        if (includes(["http:", "https:"], protocol)) {
            return url.split("#")[0];
        } else if (!protocol) {
            // eslint-disable-line no-else-return
            return resolve(baseUrl, url).split("#")[0];
        }
        return null;
    },

    /**
     * @param {!string} value
     * @param {!string=} separator
     * @return {!string}
     */
    escapeQuotes(value, separator = ",") {
        if (value === null || value === undefined) return "";
        const regExp = new RegExp(`["${separator}\\r\\n]`);
        if (regExp.test(value)) return `"${value.replace(/"/g, '""')}"`;
        return value;
    },

    /**
     * @param {!string} url
     * @return {!string}
     * @private
     */
    getRobotsUrl(url) {
        const { protocol, host } = parse(url);
        return format({ protocol, host, pathname: "/robots.txt" });
    },

    // Ported from http://en.cppreference.com/w/cpp/algorithm/lower_bound
    lowerBound(array, value, comp) {
        let first = 0;
        let count = array.length;
        while (count > 0) {
            const step = (count / 2) | 0;
            let it = first + step;
            if (comp(array[it], value) <= 0) {
                it += 1;
                first = it;
                count -= step + 1;
            } else {
                count = step;
            }
        }
        return first;
    },

    /**
     * @param {!Array<!string|RegExp>} domains
     * @param {!string} hostname
     * @return {!boolean}
     */
    checkDomainMatch(domains, hostname) {
        return some(domains, (domain) => {
            if (isRegExp(domain)) return domain.test(hostname);
            return domain === hostname;
        });
    },

    /**
     * @param {!string} sitemapXml
     * @return {!Array<!string>}
     */
    getSitemapUrls(sitemapXml) {
        const urls = [];
        sitemapXml.replace(/<loc>([^<]+)<\/loc>/g, (_, url) => {
            const unescapedUrl = Helper.unescape(url);
            urls.push(unescapedUrl);
            return null;
        });
        return urls;
    },

    /**
     * @param {!string} src
     * @return {!string}
     */
    unescape(src) {
        return src
            .replace(/&amp;/g, "&")
            .replace(/&apos;/g, "'")
            .replace(/&quot;/g, '"')
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
    },

    /**
     * @param {!Object} classType
     */
    tracePublicAPI(classType) {
        const className = classType.prototype.constructor.name.toLowerCase();
        const debugClass = debug(`hccrawler:${className}`);
        Reflect.ownKeys(classType.prototype).forEach((methodName) => {
            if (
                methodName === "constructor" ||
                !isString(methodName) ||
                startsWith(methodName, "_")
            ) {
                return;
            }
            const method = Reflect.get(classType.prototype, methodName);
            if (!isFunction(method)) return;
            Reflect.set(classType.prototype, methodName, function (...args) {
                const argsText = args.map(Helper.stringifyArgument).join(", ");
                debugClass(`${methodName}(${argsText})`);
                return method.call(this, ...args);
            });
        });
        if (classType.Events) {
            const method = Reflect.get(classType.prototype, "emit");
            Reflect.set(classType.prototype, "emit", function (event, ...args) {
                const argsText = [JSON.stringify(event)]
                    .concat(args.map(Helper.stringifyArgument))
                    .join(", ");
                debugClass(`emit(${argsText})`);
                return method.call(this, event, ...args);
            });
        }
    },

    /**
     * @param {!Object} arg
     * @return {!string}
     */
    stringifyArgument(arg) {
        return inspect(arg)
            .split("\n")
            .map((line) => trim(line))
            .join(" ");
    },
    /**
     * 设置cookie
     * @param {string} cookies_str
     * @param {string} domain
     */
    addCookies(cookies_str, domain) {
        const cookies = cookies_str.split(";").map((pair) => {
            const name = pair.trim().slice(0, pair.trim().indexOf("="));
            const value = pair.trim().slice(pair.trim().indexOf("=") + 1);
            return { name, value, domain };
        });

        return cookies;
    },
};
