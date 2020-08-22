"use strict";

// 值得买 今日热门好文
const zhidemaihaowen = async (ctx) => {
    ctx.app.logger.info("值得买 今日热门好文 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://news.smzdm.com/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        // 值得买 今日热门好文
        let dataList = [];

        const items = $(".list");

        items.each((i, element) => {
            let url = $(element).find(".itemName a").attr("href");

            let cover = $(element).find("img").attr("src");

            let title = $(element).find(".itemName a").text();

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: `值得买`,
                tag: "今日热门好文",
                bigType: "购物",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`值得买 今日热门好文`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = zhidemaihaowen;
