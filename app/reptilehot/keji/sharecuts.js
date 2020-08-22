"use strict";

// 捷径社区 热门捷径
const sharecuts = async (ctx) => {
    ctx.app.logger.info("捷径社区 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://sharecuts.cn/shortcuts/hot"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(`.shortcut-list-item .text`);

        items.each((i, element) => {
            let href = $(element).attr("href");

            let title = $(element)
                .find(".title")
                .text()
                .replace(/[ ]|\n/g, "");

            let url = `https://sharecuts.cn${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "捷径社区",
                tag: "热门捷径",
                bigType: "科技",
            });
        });
        ctx.app.saveCrawel(`捷径社区 热门捷径`, dataList);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = sharecuts;
