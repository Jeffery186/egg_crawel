"use strict";

//懂球帝热门新闻
const dongqiudi = async (ctx) => {
    ctx.app.logger.info("懂球帝 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.dongqiudi.com/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".hot-news-list a");

        items.each((i, element) => {
            let title = $(element).text();

            let href = $(element).attr("href");

            let url = `https://www.dongqiudi.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "懂球帝",
                tag: "热门新闻",
                bigType: "娱乐",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`懂球帝 热门新闻`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = dongqiudi;
