"use strict";

// hellogithub
const hellogithub = async (ctx) => {
    ctx.app.logger.info("hellogithub 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://hellogithub.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $("#volume option");

        items.each((i, element) => {
            let href = $(element).attr("value");
            let title = $(element).text();
            let url = `https://hellogithub.com${href}`;
            dataList.push({
                url,
                title: `hellogithub第${title}期`,
                hash: ctx.helper.hash(url),
                reptileName: "hellogithub",
                bigType: "社区",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`hellogithub`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = hellogithub;
