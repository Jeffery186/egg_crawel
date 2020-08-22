"use strict";

// IT之家  日榜
const ithome = async (ctx) => {
    ctx.app.logger.info("IT之家 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://m.ithome.com/rankm/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".rank-box:nth-child(2) a");

        items.each((i, element) => {
            let url = $(element).attr("href");

            let title = $(element).find(".plc-title").text();

            let cover = $(element).find("img").attr("src");

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "IT之家",
                tag: "日榜",
                bigType: "科技",
            });
        });

        ctx.app.saveCrawel("IT之家 日榜", dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = ithome;
