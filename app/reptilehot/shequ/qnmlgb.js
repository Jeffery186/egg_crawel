"use strict";

// 瓦斯阅读 24h热门
const qnmlgb = async (ctx) => {
    ctx.app.logger.info("瓦斯阅读 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://qnmlgb.tech/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".hot-a");

        items.each((i, element) => {
            let url = $(element).attr("href");

            let title = $(element).text();

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: `瓦斯阅读`,
                tag: "24h热门",
                bigType: "社区",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`瓦斯阅读 24h热门`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = qnmlgb;
