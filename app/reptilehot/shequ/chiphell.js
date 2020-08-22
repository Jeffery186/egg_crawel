"use strict";

// Chiphell
const chiphell = async (ctx) => {
    ctx.app.logger.info("Chiphell 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.chiphell.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $("#frameZ3L5I7 li");

        items.each((i, element) => {
            let href = $(element).find("a").attr("href");

            let title = $(element).find("a").text();

            let url = `https://www.chiphell.com/${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "Chiphell",
                bigType: "社区",
                tag: "快讯",
            });
        });
        ctx.app.saveCrawel(`Chiphell 快讯`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = chiphell;
