"use strict";

// 开源中国 热帖
const oschina = async (ctx) => {
    ctx.app.logger.info("开源中国 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.oschina.net/news");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".section .item .header");

        items.each((i, element) => {
            let url = $(element).attr("href");
            let title = $(element).text();

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "开源中国",
                tag: "热门资讯",
                bigType: "科技",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`开源中国 热门资讯`, dataList);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = oschina;
