"use strict";

// 人民网 新闻排行榜
const people = async (ctx) => {
    ctx.app.logger.info("人民网 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://news.people.com.cn/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".ranking li a");

        items.each((i, element) => {
            let url = $(element).attr("href");

            let title = $(element).text();

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "人民网",
                tag: "新闻排行榜",
                bigType: "综合",
            });
        });
        ctx.app.saveCrawel(`人民网 新闻排行榜`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = people;
