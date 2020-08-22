"use strict";

// 历史上的今天
const lssdjt = async (ctx) => {
    ctx.app.logger.info("历史上的今天 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.lssdjt.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".list li");

        items.each((i, element) => {
            let href = $(element).find("a").attr("href");

            let title = $(element).find("a").attr("title");

            let url = `https://www.lssdjt.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "历史上的今天",
                tag: "",
                bigType: "综合",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`历史上的今天`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = lssdjt;
