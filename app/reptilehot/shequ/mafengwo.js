"use strict";

// 马蜂窝 热门游记
const mafengwo = async (ctx) => {
    ctx.app.logger.info("马蜂窝 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.mafengwo.cn/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".tn-list dt");

        items.each((i, element) => {
            let title = $(element)
                .find("a")
                .last()
                .text()
                .replace(/[ ]|\n/g, "");

            let href = $(element).find("a").last().attr("href");

            let url = `https://www.mafengwo.cn${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "马蜂窝",
                tag: "热门游记",
                bigType: "社区",
            });
        });

        ctx.app.saveCrawel("马蜂窝 热门游记", dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = mafengwo;
