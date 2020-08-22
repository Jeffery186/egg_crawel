"use strict";

// 牛科技 热门文章
const nkj = async (ctx) => {
    ctx.app.logger.info("牛科技 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.nkj.cn/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".widget_suxingme_post li");

        items.each((i, element) => {
            let url = $(element).find("a").attr("href");

            let cover = $(element).find("a img").attr("data-original");

            let title = $(element).find("a").attr("title");

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: `牛科技`,
                tag: "热门文章",
                bigType: "科技",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`牛科技 热门文章`, dataList);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = nkj;
