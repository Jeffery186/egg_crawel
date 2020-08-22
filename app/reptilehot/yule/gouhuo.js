"use strict";

// 篝火营地 热点
const gouhuo = async (ctx) => {
    ctx.app.logger.info("篝火营地 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://gouhuo.qq.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".we-lists--ranking li");

        items.each((i, element) => {
            let url = $(element).find("a").attr("href");

            let title = $(element).find("h3").text();

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "篝火营地",
                tag: "热点",
                bigType: "娱乐",
            });
        });

        ctx.app.saveCrawel(`篝火营地 热点`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = gouhuo;
