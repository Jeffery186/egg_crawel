"use strict";
// 携程旅游 推荐游记
const ctrip = async (ctx) => {
    ctx.app.logger.info("Chiphell 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://you.ctrip.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".journal_item");

        items.each((i, element) => {
            let title = $(element)
                .find("h3 a")
                .text()
                .replace(/[ ]|\n/g, "");

            let url = $(element).find("h3 a").attr("href");

            let cover = $(element).find(".journal_pic img").attr("src");

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "携程旅游",
                tag: "推荐游记",
                bigType: "社区",
            });
        });

        ctx.app.saveCrawel(`携程旅游 推荐游记`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = ctrip;
