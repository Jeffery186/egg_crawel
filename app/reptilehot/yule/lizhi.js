"use strict";

// 荔枝 热榜
const lizhi = async (ctx) => {
    ctx.app.logger.info("荔枝 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.lizhi.fm/hot/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".allRadioList .radio_list");
        items.each((i, element) => {
            let title = $(element)
                .find(".radioName a")
                .text()
                .replace(/[ ]|\n/g, "");

            let url = "https:" + $(element).find(".radioName a").attr("href");

            let cover = $(element).find("img").attr("src");

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "荔枝",
                tag: "热榜",
                bigType: "娱乐",
            });
        });

        ctx.app.saveCrawel(`荔枝 热榜`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = lizhi;
