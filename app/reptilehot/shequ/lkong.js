"use strict";

// 龙的传人 今日热门
const lkong = async (ctx) => {
    ctx.app.logger.info("龙的传人 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("http://www.lkong.net/forum.php");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $("#portal_block_77_content a");

        items.each((i, element) => {
            let title = $(element)
                .text()
                .replace(/[ ]|\n/g, "");

            let url = $(element).attr("href");

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "龙的传人",
                tag: "今日热门",
                bigType: "社区",
            });
        });

        ctx.app.saveCrawel("龙的传人 今日热门", dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = lkong;
