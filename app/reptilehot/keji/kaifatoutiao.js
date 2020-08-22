"use strict";

// 开发者头条 热门文章
const kaifatoutiao = async (ctx) => {
    ctx.app.logger.info("开发者头条 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://toutiao.io/posts/hot/7");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".post");

        items.each((i, element) => {
            let href = $(element).find(".title a").attr("href");

            let title = $(element).find(".title a").attr("title");

            let url = `https://toutiao.io${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "开发者头条",
                tag: "热门文章",
                bigType: "科技",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel("开发者头条 热门文章", dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = kaifatoutiao;
