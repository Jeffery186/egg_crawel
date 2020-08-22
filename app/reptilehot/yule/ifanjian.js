"use strict";

// 泛见志 今日热门
const ifanjian = async (ctx) => {
    ctx.app.logger.info("泛见志 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("http://www.ifanjian.net/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".dayhot .text-list-num");
        items.each((i, element) => {
            let url = $(element).next().attr("href");

            let title = $(element)
                .next()
                .text()
                .replace(/[ ]|\n/g, "");

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "泛见志",
                tag: "今日热门",
                bigType: "娱乐",
            });
        });

        ctx.app.saveCrawel(`泛见志 今日热门`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = ifanjian;
