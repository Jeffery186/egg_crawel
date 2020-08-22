"use strict";

//bilibili 专栏
const bilibilizl = async (ctx) => {
    ctx.app.logger.info("bilibili 专栏 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.bilibili.com/read/ranking#type=3",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".article-list li");

        items.each((i, element) => {
            let title = $(element).find(".article-left-block a").attr("title");

            let url = $(element)
                .find(".article-left-block a")
                .attr("href")
                .split("//")[1];

            let author = $(element).find(".nick-name").text();

            let heat = $(element).find(".view").text();

            dataList.push({
                url: `https://${url}`,
                title,
                heat,
                author,
                hash: ctx.helper.hash(url),
                reptileName: "bilibili",
                tag: "专栏",
                bigType: "娱乐",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`bilibili 专栏`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = bilibilizl;
