"use strict";

// taptap
const taptap = async (ctx) => {
    ctx.app.logger.info("taptap 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.taptap.com/top/download"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".taptap-top-card");
        items.each((i, element) => {
            let url = $(element).find(".top-card-middle a").attr("href");
            let cover = $(element).find(".card-left-image img").attr("src");

            let title = $(element)
                .find(".top-card-middle h4")
                .text()
                .replace("/n", "")
                .trim();
            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: `TapTap`,
                tag: "排行榜",
                bigType: "娱乐",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`TapTap 排行榜`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = taptap;
