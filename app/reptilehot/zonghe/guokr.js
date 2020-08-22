"use strict";

// 果壳网 热门
const guokr = async (ctx) => {
    ctx.app.logger.info("果壳网 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.guokr.com/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".article-list li");

        items.each((i, element) => {
            let href = $(element).find("a").attr("href");

            let title = $(element).find("a").text();

            let url = `https://www.guokr.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "果壳网",
                tag: "热门",
                bigType: "综合",
            });
        });
        ctx.app.saveCrawel(`果壳网 热门`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = guokr;
