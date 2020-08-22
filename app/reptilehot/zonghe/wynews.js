"use strict";

// 网易新闻
const wynews = async (ctx) => {
    ctx.app.logger.info("网易新闻 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://news.163.com/special/0001386F/rank_whole.html"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        // 网易新闻 24h点击排行
        let dataListL = [];
        const itemsL = $(".left .active:nth-child(2) tr");

        itemsL.each((i, element) => {
            let url = $(element).find("a").attr("href");

            let title = $(element).find("a").text();

            if (title) {
                let heat = $(element).find(".cBlue").text();

                dataListL.push({
                    url,
                    title,
                    heat,
                    hash: ctx.helper.hash(url),
                    reptileName: "网易新闻",
                    tag: "24h点击排行",
                    bigType: "综合",
                    createDate: +new Date(),
                });
            }
        });
        ctx.app.saveCrawel(`网易新闻 24h点击排行`, dataListL);

        //网易新闻 今日跟贴榜
        let dataListR = [];
        const itemsR = $(".right .active:nth-child(2) tr");

        itemsR.each((i, element) => {
            let url = $(element).find("a").attr("href");

            let title = $(element).find("a").text();

            if (title) {
                let heat = $(element).find(".cBlue").text();

                dataListR.push({
                    url,
                    title,
                    heat,
                    hash: ctx.helper.hash(url),
                    reptileName: "网易新闻",
                    tag: "今日跟贴榜",
                    bigType: "综合",
                    createDate: +new Date(),
                });
            }
        });
        ctx.app.saveCrawel(`网易新闻 今日跟贴榜`, dataListR);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = wynews;
