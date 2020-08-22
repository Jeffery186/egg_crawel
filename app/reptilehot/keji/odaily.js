"use strict";

// 星球日报 日榜
const odaily = async (ctx) => {
    ctx.app.logger.info("星球日报 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.odaily.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(`._2xoas7mT .HddbPaS4`);

        items.each((i, element) => {
            let href = $(element).find("h5 a").attr("href");

            let title = $(element)
                .find("h5 a")
                .text()
                .replace(/[ ]|\n/g, "");

            let cover = $(element).find("img").attr("src");

            let url = `https://www.odaily.com${href}`;

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "星球日报",
                tag: "日榜",
                bigType: "科技",
            });
        });
        ctx.app.saveCrawel(`星球日报 日榜`, dataList);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = odaily;
