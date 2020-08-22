"use strict";

// v2ex
const v2ex = async (ctx) => {
    ctx.app.logger.info("v2ex 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.v2ex.com/?tab=hot");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".box .item_title a");
        items.each((i, element) => {
            let title = $(element).text();

            let href = $(element).attr("href").split("#")[0];

            let url = `https://www.v2ex.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: `v2ex`,
                tag: "最热",
                bigType: "社区",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`v2ex 最热`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};

module.exports = v2ex;
