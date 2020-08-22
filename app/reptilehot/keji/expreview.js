"use strict";

// 超能网 - 科技生活第一站
const expreview = async (ctx) => {
    ctx.app.logger.info("超能网 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.expreview.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".tabBox .tab1_1 a");
        items.each((i, element) => {
            let href = $(element).attr("href");
            let title = $(element).text();

            dataList.push({
                url: `https:${href}`,
                title,
                cover,
                hash: ctx.helper.hash(`https:${href}`),
                createDate: +new Date(),
                reptileName: "超能网",
                tag: "日榜",
                bigType: "科技",
            });
        });
        ctx.app.saveCrawel(`超能网 日榜`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = expreview;
