"use strict";

// 猎云网 热点快讯
const lieyunwang = async (ctx) => {
    ctx.app.logger.info("猎云网 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.lieyunwang.com/news/index?hot=1"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".news1-items");

        items.each((i, element) => {
            let url = $(element).find(".news1-link").attr("href");

            if (url) {
                let title = $(element).find(".news1-title").text();

                dataList.push({
                    url,
                    title,
                    hash: ctx.helper.hash(url),
                    reptileName: "猎云网",
                    tag: "热点快讯",
                    bigType: "综合",
                    createDate: +new Date(),
                });
            }
        });
        ctx.app.saveCrawel(`猎云网 热点快讯`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = lieyunwang;
