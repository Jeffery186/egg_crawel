"use strict";

// github trending today
const github = async (ctx) => {
    ctx.app.logger.info("github 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://github.com/trending");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".Box .Box-row");

        items.each((i, element) => {
            let href = $(element).find(".lh-condensed a").attr("href");

            let heat = $(element)
                .find(".muted-link")
                .first()
                .text()
                .replace(/[ ]|\n/g, "");

            let title = $(element)
                .find(".lh-condensed a")
                .text()
                .replace(/[ ]|\n|,/g, "");

            let url = `https://github.com${href}`;
            dataList.push({
                url,
                title,
                heat,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "github",
                tag: "trending today",
                bigType: "科技",
            });
        });
        ctx.app.saveCrawel(`github trendingToday`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = github;
