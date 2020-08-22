"use strict";

//新京报 一天排行榜
const bjnews = async (ctx) => {
    ctx.app.logger.info("新京报 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://www.bjnews.com.cn/realtime"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".tdnews_mian div:nth-child(1) li");

        items.each((i, element) => {
            let title = $(element).find("a").text();

            let url = $(element).find("a").attr("href");

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "新京报",
                tag: " 一天排行榜",
                bigType: "综合",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`新京报 一天排行榜`, dataList);

        let dataListr = [];
        const itemsr = $(".Hotspot_list a");

        itemsr.each((i, element) => {
            let title = $(element).text();

            let url = $(element).attr("href");

            dataListr.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "新京报",
                tag: "热点",
                bigType: "综合",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`新京报 热点`, dataListr);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = bjnews;
