"use strict";

// 铁血社区 今本日点击排行
const bbsTiexue = async (ctx) => {
    ctx.app.logger.info("铁血社区 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://bbs.tiexue.net/default.htm?ListUrl=https://bbs.tiexue.net/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $("#digs .tabLayer a");

        items.each((i, element) => {
            if (i > 8) {
                return;
            }
            let title = $(element)
                .text()
                .replace(/[ ]|\n/g, "");

            let url = $(element).attr("href");

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "铁血社区",
                tag: "今本日点击排行",
                bigType: "社区",
            });
        });

        ctx.app.saveCrawel(`铁血社区 今本日点击排行`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = bbsTiexue;
