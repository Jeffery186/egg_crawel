"use strict";

// 360搜索实时热点
const sosuo360 = async (ctx) => {
    ctx.app.logger.info("360搜索 实时热点 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://m.news.so.com/hotnews?src=home_hotnews"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".show .hot-item");

        items.each((i, element) => {
            let url = $(element).find("a").attr("href");

            let heat = $(element).find(".score").text();

            let title = $(element).find("a span").text();
            dataList.push({
                url,
                title,
                heat,
                hash: ctx.helper.hash(url),
                reptileName: `360搜索`,
                tag: "实时热点",
                bigType: "综合",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`360搜索 实时热点`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = sosuo360;
