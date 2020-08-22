"use strict";

//凤凰网 要闻
const ifeng = async (ctx) => {
    ctx.app.logger.info("凤凰网 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("http://news.ifeng.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(`div[class*="topNews"] h3`);

        items.each((i, element) => {
            let title = $(element).find("a").text();

            let url = $(element).find("a").attr("href");

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "凤凰网",
                tag: "要闻",
                bigType: "综合",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`凤凰网 要闻`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = ifeng;
