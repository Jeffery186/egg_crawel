"use strict";

// Readhub 热门话题
const readhub = async (ctx) => {
    ctx.app.logger.info("Readhub 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://readhub.cn/topics");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(`#itemList h2[class*='topicTitle'] a`);

        items.each((i, element) => {
            let href = $(element).attr("href");

            let title = $(element)
                .text()
                .replace(/[ ]|\n/g, "");

            let url = `https://readhub.cn${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "Readhub",
                tag: "热门话题",
                bigType: "科技",
            });
        });
        ctx.app.saveCrawel(`Readhub 热门话题`, dataList);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = readhub;
