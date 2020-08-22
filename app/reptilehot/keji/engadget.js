"use strict";

// Engadget 最新消息 中国版 - 消费性电子产品新闻和评测
const engadget = async (ctx) => {
    ctx.app.logger.info("Engadget 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://cn.engadget.com/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    let dataList = [];
    try {
        const items = $("#module-engadget-homepage-streams article a div");

        items.each((i, element) => {
            let href = $(element).parent().attr("href");

            let cover = $(element).attr("style").split("(")[1].split(")")[0];

            let title = $(element).parent().attr("alt");

            let url = `https://cn.engadget.com${href}`;

            if (href.indexOf("https://beap.gemini.yahoo.com") == -1) {
                dataList.push({
                    url,
                    title,
                    cover,
                    hash: ctx.helper.hash(url),
                    createDate: +new Date(),
                    reptileName: "Engadget ",
                    bigType: "科技",
                    tag: "最新消息",
                });
            }
        });
        ctx.app.saveCrawel(`Engadget 最新消息`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }

    return dataList;
};
module.exports = engadget;
