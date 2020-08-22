"use strict";

// 土木在线 热门帖子
const bbsCo188 = async (ctx) => {
    ctx.app.logger.info("育儿论坛 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://bbs.co188.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".mclc_ul h3 a");

        items.each((i, element) => {
            let title = $(element)
                .text()
                .replace(/[ ]|\n/g, "");

            let href = $(element).attr("href");

            let url = `https://bbs.co188.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "土木在线",
                tag: "热门帖子",
                bigType: "社区",
            });
        });

        ctx.app.saveCrawel(`育儿论坛 今日热帖`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = bbsCo188;
