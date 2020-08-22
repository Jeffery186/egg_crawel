"use strict";

// 投资界 日排行
const pedaily = async (ctx) => {
    ctx.app.logger.info("投资界 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.pedaily.cn/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".list-hot li");

        items.each((i, element) => {
            let url = $(element).find("a").attr("href");

            let title = $(element).find("a").text();

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "投资界",
                tag: "日排行",
                bigType: "综合",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`投资界 日排行`, dataList);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = pedaily;
