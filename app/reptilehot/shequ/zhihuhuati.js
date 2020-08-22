"use strict";
const userAgent = require("../../util/user_agents");
const cheerio = require("cheerio");

// 知乎
const zhihuhuati = async (ctx) => {
    ctx.app.logger.info("知乎 抓取 => begin");
    const { page, brower } = await ctx.app.getPage();
    try {
        await Promise.all(
            ctx.helper
                .addCookies(
                    `_xsrf=sMv6jGtJwtHz4QNQMOl163qYpi4MxisN; _zap=986ca750-25b7-420e-a584-5d77fcd5094e; d_c0="ANAV_5jOdxGPTrhobZaNcE-MMa_GObPpbmc=|1592877889"; _ga=GA1.2.1823333848.1592877832; _gid=GA1.2.244804146.1593317315; Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49=1592877833,1593317315,1593317654; _gat_gtag_UA_149949619_1=1; capsion_ticket="2|1:0|10:1593326177|14:capsion_ticket|44:NjA2ZTRkOWYxMTkyNDIzNTg4MWEyY2Q1MTdmN2VhZmE=|064c4693996aa66115602c83c4cec92fc88416145b720f9f8245bb3c02f8916b"; SESSIONID=fi7ik6yaKA5OmBvQr9atqGpprEzNGcEUwNmLN6zv9Ff; JOID=V10dC055aeNrRA4YG3SJNXHmf2YHHw3UDy84bHoyKNskJExuRxZeFjhEAxUWrlOPIz9GpZQEFKcaJ5vsxB_xFYI=; osd=U1oWCkJ9buhqSAofEHWFMXbtfmoDGAbVAys_Z3s-LNwvJUBqQB1fGjxDCBQaqlSEIjNCop8FGKMdLJrgwBj6FI4=; z_c0="2|1:0|10:1593326179|4:z_c0|92:Mi4xV1ZDbUFnQUFBQUFBMEJYX21NNTNFU1lBQUFCZ0FsVk5ZNGpsWHdENm8zbmVFdHlIMF9tRUlLUmExRExoM3Y4amhB|3b0291d043695fb7ba83f8f460863bb1214ba8f7b3baaef3662736445f803d7c"; tst=r; Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49=1593326120; KLBRSID=d017ffedd50a8c265f0e648afe355952|1593326187|1593326175`,
                    "www.zhihu.com"
                )
                .map((pair) => {
                    return page.setCookie(pair);
                })
        );
        // 知乎热榜
        await Promise.all([
            page.setUserAgent(userAgent.random()),
            page.setJavaScriptEnabled(true), //  允许执行 js 脚本
            page.goto("https://www.zhihu.com/topic/19776749/top-answers", {
                waitUntil: "networkidle0",
            }),
            page.waitFor(2000),
        ]);

        let context = await page.content();
        let $ = cheerio.load(context, {
            ignoreWhitespace: true,
            normalizeWhitespace: true,
        });
        let dataList = [];
        const items = $(".List-item");

        items.each((i, element) => {
            let href = $(element).find("h2 a").attr("href");

            let title = $(element).find("h2 a").text();

            let heat = $(element)
                .find(".ContentItem-actions .VoteButton--up")
                .text();

            let url = `https://www.zhihu.com${href}`;

            dataList.push({
                url,
                title,
                heat,
                hash: ctx.helper.hash(url),
                reptileName: `知乎`,
                tag: "话题榜",
                bigType: "社区",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`知乎 话题榜`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};

module.exports = zhihuhuati;
