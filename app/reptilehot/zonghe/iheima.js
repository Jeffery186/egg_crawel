"use strict";

// 黑马网 热门榜
const iheima = async (ctx) => {
    ctx.app.logger.info("黑马网 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("http://www.iheima.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".list .item-wrap");

        items.each((i, element) => {
            let cover = $(element).find(".pic img").attr("src");
            let title = $(element).find(".title").text();
            let href = $(element).find(".title").attr("href");
            let author = $(element).find(".author .name").text();
            let url = `http://www.iheima.com${href}`;

            dataList.push({
                url,
                title,
                cover,
                author,
                hash: ctx.helper.hash(url),
                reptileName: "黑马网",
                tag: "热门榜",
                bigType: "综合",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`黑马网 热门榜`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = iheima;
