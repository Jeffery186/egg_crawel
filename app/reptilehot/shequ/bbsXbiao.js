"use strict";

// 腕表之家 近期十大热帖
const bbsXbiao = async (ctx) => {
    ctx.app.logger.info("腕表之家 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("http://bbs.xbiao.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".hot-box a");

        items.each((i, element) => {
            let title = $(element)
                .text()
                .replace(/[ ]|\n/g, "");

            let url = $(element).attr("href");

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "腕表之家",
                tag: "近期十大热帖",
                bigType: "社区",
            });
        });

        ctx.app.saveCrawel(`腕表之家 近期十大热帖`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = bbsXbiao;
