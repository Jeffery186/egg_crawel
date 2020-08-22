"use strict";

//微博
const weibo = async (ctx) => {
    ctx.app.logger.info("微博 热搜榜 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://s.weibo.com/top/summary");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        // 微博热搜

        let dataList = [];
        const items = $(".data tbody td:nth-child(2)");

        items.each((i, element) => {
            let href = $(element).find("a").attr("href");
            let title = $(element).find("a").text();
            let heat = $(element).find("span").text();

            let url = `https://s.weibo.com${href}`;
            if (heat) {
                dataList.push({
                    url,
                    title,
                    heat,
                    hash: ctx.helper.hash(url),
                    reptileName: "微博",
                    tag: "热搜榜",
                    bigType: "综合",
                    createDate: +new Date(),
                });
            }
        });

        ctx.app.saveCrawel(`微博 热搜榜`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = weibo;
