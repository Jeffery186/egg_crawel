"use strict";

// 喜马拉雅FM 热门免费榜
const ximalaya = async (ctx) => {
    ctx.app.logger.info("喜马拉雅FM 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.ximalaya.com/top/free/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".album-item");

        items.each((i, element) => {
            let href = $(element).find(".album-right").attr("href");

            let title = $(element)
                .find(".title")
                .text()
                .replace(/[ ]|\n/g, "");

            let cover =
                "https:" + $(element).find(".album-cover img").attr("src");

            let url = `https://www.ximalaya.com${href}`;

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "喜马拉雅FM",
                tag: "热门免费榜",
                bigType: "娱乐",
            });
        });

        ctx.app.saveCrawel(`喜马拉雅FM 热门免费榜`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = ximalaya;
