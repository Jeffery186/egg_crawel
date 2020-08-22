"use strict";

// 产品壹佰 周榜
const chanpin100 = async (ctx) => {
    ctx.app.logger.info("产品壹佰 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://www.chanpin100.com/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(`.rank-list a`);

        items.each((i, element) => {
            let href = $(element).attr("href");
            let title = $(element)
                .attr("title")
                .replace(/[ ]|\n/g, "");

            let url = `http://www.chanpin100.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "产品壹佰",
                tag: "周榜",
                bigType: "科技",
            });
        });
        ctx.app.saveCrawel(`产品壹佰 周榜`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = chanpin100;
