"use strict";

//ZAKER 热点
const myzaker = async (ctx) => {
    ctx.app.logger.info("ZAKER 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.myzaker.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $("#contentList .content-block");

        items.each((i, element) => {
            let cover =
                "https:" + $(element).find(".pic").attr("data-original");

            let title = $(element).find(".article-content h2").text();

            let url =
                "https:" +
                $(element).find(".article-content h2").parent().attr("href");

            let author = $(element).find(".article-from").text();

            dataList.push({
                url,
                title,
                author,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: "ZAKER",
                tag: "热点",
                bigType: "综合",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`ZAKER 热点`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = myzaker;
