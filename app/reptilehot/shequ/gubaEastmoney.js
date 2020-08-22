"use strict";

// 股吧 今日热门
const gubaEastmoney = async (ctx) => {
    ctx.app.logger.info("股吧 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("http://guba.eastmoney.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".newlist li");

        items.each((i, element) => {
            let title = $(element)
                .find(".note")
                .text()
                .replace(/[ ]|\n/g, "");

            let href = $(element).find(".note").attr("href");

            let heat = $(element)
                .find("cite")
                .first()
                .text()
                .replace(/[ ]|\n/g, "");

            let url = `http://guba.eastmoney.com${href}`;

            dataList.push({
                url,
                title,
                heat,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "股吧",
                tag: "今日热门",
                bigType: "社区",
            });
        });
        ctx.app.saveCrawel(`股吧 今日热门`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = gubaEastmoney;
