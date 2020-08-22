"use strict";

// 有格调 最新
const ugediao = async (ctx) => {
    ctx.app.logger.info("有格调 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.ugediao.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".list-home .list-item");

        items.each((i, element) => {
            let url = $(element).find(".media-content").attr("href");

            let title = $(element)
                .find("a")
                .text()
                .replace(/[ ]|\n/g, "");

            let cover = $(element)
                .find(".media-content")
                .attr("style")
                .split("(")[1]
                .split(")")[0];

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "有格调",
                tag: "最新",
                bigType: "娱乐",
            });
        });

        ctx.app.saveCrawel(`有格调 最新`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = ugediao;
