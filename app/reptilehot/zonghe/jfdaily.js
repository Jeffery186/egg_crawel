"use strict";

//上观 今日文章排行
const jfdaily = async (ctx) => {
    ctx.app.logger.info("上观 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.jfdaily.com/home");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $("#ajaxnewsrank1 li");

        items.each((i, element) => {
            let href = $(element).find("a").attr("href");

            let title = $(element).find("a").text();

            let url = `https://www.jfdaily.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "上观",
                bigType: "综合",
                tag: "今日文章排行",
            });
        });
        ctx.app.saveCrawel("上观 今日文章排行", dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = jfdaily;
