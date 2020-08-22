"use strict";

// 爱范儿快讯
const aifan = async (ctx) => {
    ctx.app.logger.info("爱范儿 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.ifanr.com/digest");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".buzz-list .buzz-node-card");

        items.each((i, element) => {
            let url = $(element).find(".buzz-node_meta_link a").attr("href");

            if (url) {
                let title = $(element).find(".buzz-node_title").text();

                dataList.push({
                    url,
                    title,
                    hash: ctx.helper.hash(url),
                    createDate: +new Date(),
                    reptileName: "爱范儿",
                    bigType: "科技",
                    tag: "快讯",
                });
            }
        });

        ctx.app.saveCrawel(`爱范儿`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = aifan;
