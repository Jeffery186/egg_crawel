"use strict";

//远景论坛
const yuanjing = async (ctx) => {
    ctx.app.logger.info("远景论坛 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://bbs.pcbeta.com/forum-561-1.html"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $("tbody[id*='normalthread'] .xst");

        items.each((i, element) => {
            let url = $(element).attr("href");
            let title = $(element)
                .text()
                .replace(/[ ]|\n/g, "")
                .trim();

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "远景论坛-黑苹果",
                tag: "黑苹果",
                bigType: "科技",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`远景论坛-黑苹果`, dataList);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = yuanjing;
