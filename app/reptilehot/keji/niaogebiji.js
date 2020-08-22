"use strict";
// 鸟哥笔记 周榜
const niaogebiji = async (ctx) => {
    ctx.app.logger.info("鸟哥笔记 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.niaogebiji.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".rankingListBox .rankingList:nth-child(1) a");

        items.each((i, element) => {
            let href = $(element).attr("href");

            let title = $(element)
                .text()
                .replace(/[ ]|\n/g, "");

            let url = `https://www.niaogebiji.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "鸟哥笔记",
                tag: "周榜",
                bigType: "科技",
            });
        });
        ctx.app.saveCrawel("鸟哥笔记 周榜", dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = niaogebiji;
