"use strict";

// 黑客派
const gubaEastmoney = async (ctx) => {
    ctx.app.logger.info("黑客派 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://hacpai.com/top",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".module-list .title");

        items.each((i, element) => {
            let title = $(element).text();

            let url = $(element).attr("href");

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "黑客派",
                tag: "近期热议",
                bigType: "社区",
            });
        });
        ctx.app.saveCrawel(`黑客派 近期热议`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = gubaEastmoney;
