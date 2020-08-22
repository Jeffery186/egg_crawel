"use strict";

// 豆瓣 24小时话题趋势
const doubanhuati = async (ctx) => {
    ctx.app.logger.info("豆瓣 24小时话题趋势 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.douban.com/gallery/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        //24小时话题趋势 · · · · · ·
        let ftList = [];
        const dbft = $(".trend li");
        dbft.each((i, element) => {
            let url, cover, title, heat;
            url = $(element).find("a").attr("href");

            heat = $(element).find("span").text();

            title = $(element).find("a").text();

            ftList.push({
                url,
                title,
                heat,
                hash: ctx.helper.hash(url),
                reptileName: "豆瓣",
                tag: "24小时话题趋势",
                bigType: "娱乐",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`豆瓣 24小时话题趋势`, ftList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = doubanhuati;
