"use strict";

// 游民星空 热点新闻排行
const gamersky = async (ctx) => {
    ctx.app.logger.info("游民星空 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.gamersky.com/news/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".Mid2Rtxt a");

        items.each((i, element) => {
            let url = $(element).attr("href");

            let title = $(element)
                .text()
                .replace(/[ ]|\n/g, "");

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "游民星空",
                tag: "热点新闻排行",
                bigType: "娱乐",
            });
        });

        ctx.app.saveCrawel(`游民星空 热点新闻排行`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = gamersky;
