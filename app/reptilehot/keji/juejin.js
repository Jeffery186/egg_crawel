"use strict";

// 掘金 热门推荐
const juejin = async (ctx) => {
    ctx.app.logger.info("掘金 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://juejin.im/timeline?sort=three_days_hottest",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        // 掘金 热门推荐
        let dataList = [];
        const items = $(".entry");
        items.each((i, element) => {
            let tag = $(element).find(".item .tag").first().text();

            let titleChe = $(element).find(".title");
            let title = titleChe.text();
            let href = titleChe.attr("href");
            let author = $(element).find(".user-popover-box a").text();

            let url = `https://juejin.im${href}`;

            dataList.push({
                url,
                title,
                author,
                hash: ctx.helper.hash(url),
                reptileName: "掘金",
                tag: "热门推荐",
                bigType: "科技",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel("掘金 热门推荐", dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = juejin;
