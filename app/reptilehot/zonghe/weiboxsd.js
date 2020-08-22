"use strict";

//微博
const weiboxsd = async (ctx) => {
    ctx.app.logger.info("微博新时代 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://s.weibo.com/top/summary?cate=socialevent"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        // 微博新时代
        let dataListXsd = [];
        const itemsXsd = $(".data tbody td:nth-child(2)");

        itemsXsd.each((i, element) => {
            let href = $(element).find("a").attr("href");
            let title = $(element).find("a").text();
            let url = `https://s.weibo.com${href}`;
            dataListXsd.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "微博",
                tag: "新时代",
                bigType: "综合",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`微博 新时代`, dataListXsd);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = weiboxsd;
