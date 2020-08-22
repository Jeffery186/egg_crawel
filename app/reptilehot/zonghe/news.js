"use strict";

// 新华网 时政频道
const news = async (ctx) => {
    ctx.app.logger.info("新华网 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://www.news.cn/politics/index.htm"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".dataList h3");

        items.each((i, element) => {
            let url = $(element).find("a").attr("href");

            let title = $(element).find("a").text();

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "新华网",
                tag: "时政频道",
                bigType: "综合",
            });
        });
        ctx.app.saveCrawel(`新华网 时政频道`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = news;
