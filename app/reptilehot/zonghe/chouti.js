"use strict";

//抽屉 新热榜
const chouti = async (ctx) => {
    ctx.app.logger.info("抽屉 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://m.chouti.com/all/hot");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".link-info");

        items.each((i, element) => {
            let url = $(element).attr("href");

            let title = $(element).find(".link-title").text();

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "抽屉",
                tag: "新热榜",
                bigType: "综合",
            });
        });
        ctx.app.saveCrawel(`抽屉 新热榜`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = chouti;
