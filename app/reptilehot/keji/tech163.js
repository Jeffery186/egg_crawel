"use strict";

// 网易科技 今日热文
const tech163 = async (ctx) => {
    ctx.app.logger.info("网易科技 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://tech.163.com/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(`.newsdata_item .news_article`);

        items.each((i, element) => {
            let url = $(element).find("h3 a").attr("href");

            let title = $(element)
                .find("h3 a")
                .text()
                .replace(/[ ]|\n/g, "");

            let cover = $(element).find(".na_pic img").attr("src");

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "网易科技",
                tag: "今日热文",
                bigType: "科技",
            });
        });
        ctx.app.saveCrawel(`网易科技 今日热文`, dataList);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = tech163;
