"use strict";
const cheerio = require("cheerio");
const userAgent = require("../util/user_agents");
const autoScroll = require("../util/autoScroll");

// 微信公众号
const wxgzh = async (ctx, search) => {
    ctx.app.logger.info(`微信公众号===${search}抓取 => begin`);
    const { page, brower } = await ctx.app.getPage();
    let dataList = [];
    try {
        await Promise.all(
            ctx.helper
                .addCookies(
                    `53gid2=11460440209008; 53gid0=11460440209008; 53gid1=11460440209008; 53uvid=1; onliner_zdfq72213613=0; visitor_type=old; acw_tc=76b20ff615962535763926879e6bb3b466724ad6bbb194b6703807ede824b4; _csrf-frontend=ee8178198f25578c724601a5f2e8991c0ef03f594d069ac007ad70fd169ac174a%3A2%3A%7Bi%3A0%3Bs%3A14%3A%22_csrf-frontend%22%3Bi%3A1%3Bs%3A32%3A%22sztO3HA2mv-cXq-xOROeMFspG2Ug_i3t%22%3B%7D; Hm_lvt_293b2731d4897253b117bb45d9bb7023=1596253809; 53revisit=1596253809244; 53kf_72213613_from_host=www.gsdata.cn; 53kf_72213613_land_page=http%253A%252F%252Fwww.gsdata.cn%252Fquery%252Fwx%253Fq%253D%2524%257BencodeURIComponent(search)%257D; kf_72213613_land_page_ok=1; _gsdataCL=WzAsIjE4NTE2ODk2MjE5IiwiMjAyMDA4MDExMTQ2NTQiLCIxYWQ2NGYxYmMzZjM4ZmQ1MThiZmU0ZWM5ZTk2ZDJhOSIsMjUxODMyXQ%3D%3D; _gsdataOL=251832%3B18516896219%3B%7B%220%22%3A%22%22%2C%221%22%3A%22%22%2C%222%22%3A%22%22%2C%223%22%3A%22%22%2C%224%22%3A%22%22%2C%225%22%3A%22%22%2C%2299%22%3A%2220200801%22%7D%3Be78903e023e77bc9b82cd1af83c99161; PHPSESSID=obrab14eq5otsd1hmdsjgajsl7; _identity-frontend=b066ad841f691c89b659351dbeef62dafd01cf5bdb269a3b1a5d95057965ecc0a%3A2%3A%7Bi%3A0%3Bs%3A18%3A%22_identity-frontend%22%3Bi%3A1%3Bs%3A28%3A%22%5B%22551572%22%2C%22test+key%22%2C604800%5D%22%3B%7D; 53kf_72213613_keyword=http%3A%2F%2Fwww.gsdata.cn%2Fquery%2Fwx%3Fq%3D%24%7BencodeURIComponent(search)%7D; Hm_lpvt_293b2731d4897253b117bb45d9bb7023=1596254028`,
                    "www.gsdata.cn"
                )
                .map((pair) => {
                    return page.setCookie(pair);
                })
        );

        // await Promise.all([
        //     page.setUserAgent(userAgent.random()),
        //     page.setJavaScriptEnabled(true), //  允许执行 js 脚本
        //     page.goto("http://www.gsdata.cn/", {
        //         waitUntil: "domcontentloaded",
        //     }),
        // ]);

        // await Promise.all([
        //     page.click(".loginModal-header a:nth-child(2)"),
        //     page.waitFor(2000),
        // ]);

        // await Promise.all([
        //     page.type(`input[type="text"]`, "18516896219"),
        //     page.type(`input[type="password"]`, "3JDsCCGLDC4gcn"),
        //     page.click(".loginform-btn"),
        //     page.waitForNavigation(),
        //     page.waitFor(2000),
        // ]);

        await Promise.all([
            page.setUserAgent(userAgent.random()),
            page.setJavaScriptEnabled(true), //  允许执行 js 脚本
            page.goto(
                `http://www.gsdata.cn/query/wx?q=${encodeURIComponent(search)}`,
                {
                    waitUntil: "domcontentloaded",
                }
            ),
            page.waitFor(2000),
        ]);

        // 找到对应的链接
        let context1 = await page.content();
        let $1 = cheerio.load(context1, {
            ignoreWhitespace: true,
            normalizeWhitespace: true,
        });

        let items1 = $1("#nickname");
        let pageUrl = "";
        let flag = false;
        items1.each((i, element) => {
            let text = $1(element).text();
            if (text === search && !flag) {
                flag = true;
                let url = $1(element).attr("href");
                pageUrl = `http://www.gsdata.cn${url}`;
            }
        });
        await Promise.all([
            page.setUserAgent(userAgent.random()),
            page.waitForNavigation(),
            page.goto(pageUrl, {
                waitUntil: "networkidle0",
            }),
        ]);

        let context = await page.content();
        let $ = cheerio.load(context, {
            ignoreWhitespace: true,
            normalizeWhitespace: true,
        });

        const items = $(".wxAti-li li");
        items.each((i, element) => {
            let url = $(element).find(".cr30").attr("href");

            let title = $(element).find(".cr30").text();

            let cover = $(element).find("#m_img").attr("src");

            let heat = $(element).find(".icon1-see").parent().text();

            dataList.push({
                url,
                title,
                cover,
                heat,
            });
        });
        ctx.app.logger.info(`微信公众号===${search}抓取 => end`);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
    return dataList;
};
module.exports = wxgzh;
