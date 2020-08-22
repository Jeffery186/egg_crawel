"use strict";

// 爱思想 每日文章排行
const aisixiang = async (ctx) => {
    ctx.app.logger.info("爱思想 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://www.aisixiang.com/toplist/index.php?id=1&period=1",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".tips a");

        items.each((i, element) => {
            let href = $(element).attr("href");

            let title = $(element).text();

            let url = `http://www.aisixiang.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "爱思想",
                tag: "每日文章排行",
                bigType: "综合",
            });
        });
        ctx.app.saveCrawel(`爱思想 每日文章排行`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = aisixiang;
