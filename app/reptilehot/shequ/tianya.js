"use strict";

// 天涯
const tianya = async (ctx) => {
    ctx.app.logger.info("天涯热帖 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://bbs.tianya.cn/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".hot-list");

        items.each((i, element) => {
            let url = $(element).find("a").attr("href");

            let title = $(element).find("a").text();

            let author = $(element).find(".author a").text();
            dataList.push({
                url,
                title,
                author,
                hash: ctx.helper.hash(url),
                reptileName: `天涯`,
                tag: "热帖榜",
                bigType: "社区",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`天涯 热帖榜`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = tianya;
