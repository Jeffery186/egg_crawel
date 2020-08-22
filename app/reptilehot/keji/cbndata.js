"use strict";

//CBNData 热门排行
const cbndata = async (ctx) => {
    ctx.app.logger.info("CBNData 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://cbndata.com/information");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".cp-information-hot-item-wrapper a");

        items.each((i, element) => {
            let title = $(element).find(".ext-ln3").text();

            let href = $(element).attr("href");

            let url = `https://cbndata.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "CBNData",
                tag: "热门排行",
                bigType: "科技",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`CBNData 热门排行`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = cbndata;
