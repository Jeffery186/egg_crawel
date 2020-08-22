"use strict";

// 最美应用 最新
const zuimeia = async (ctx) => {
    ctx.app.logger.info("最美应用 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("http://zuimeia.com/?platform=1");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".left-side section");

        items.each((i, element) => {
            let href = $(element).find(".app-title").attr("href");

            let title = $(element).find(".app-title h1").text();

            let cover = $(element).find(".article-img").attr("src");

            let url = `http://zuimeia.com${href}`;

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: `最美应用`,
                tag: "最新",
                bigType: "科技",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`最美应用 最新`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = zuimeia;
