"use strict";

// 36kr
const hot36kr = async (ctx) => {
    ctx.app.logger.info("36氪 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://36kr.com/hot-list/catalog",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;

    try {
        let dataList = [];
        const items = $(".article-list .kr-shadow-wrapper");

        items.each((i, element) => {
            let href = $(element).find(".article-item-title a").attr("href");

            let title = $(element).find(".article-item-title a").text();

            let cover = $(element).find(".article-item-pic img").attr("src");

            let url = `https://36kr.com${href}`;

            dataList.push({
                url,
                cover,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "36氪",
                tag: "48h热榜",
                bigType: "科技",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`36氪 48h热榜`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = hot36kr;
