"use strict";

//火星财经24h热门
const huoxing24 = async (ctx) => {
    ctx.app.logger.info("火星财经 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://www.huoxing24.com/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".news-sort-box .list-box");

        items.each((i, element) => {
            let title = $(element).find("a").attr("title");

            let url = $(element).find("a").attr("href");

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "火星财经",
                tag: "24h热门",
                bigType: "综合",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`火星财经 24h热门`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = huoxing24;
