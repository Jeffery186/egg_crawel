"use strict";

// TeachWeb
const techweb = async (ctx) => {
    ctx.app.logger.info("TeachWeb 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("http://www.techweb.com.cn/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".ranking_con li");
        items.each((i, element) => {
            let url = $(element).find("a").attr("href");

            let title = $(element).find("a").text();

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: `TeachWeb`,
                tag: "排行榜",
                bigType: "科技",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`TeachWeb 排行榜`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = techweb;
