"use strict";

// 得意生活 本周热门
const deyi = async (ctx) => {
    ctx.app.logger.info("Chiphell 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("http://www.deyi.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $("#icf_top_content a");

        items.each((i, element) => {
            if (i > 9) {
                return;
            }
            let title = $(element)
                .text()
                .replace(/[ ]|\n/g, "");

            let url = $(element).attr("href");

            let cover = $(element).find(".journal_pic img").attr("src");

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "得意生活",
                tag: "本周热门",
                bigType: "社区",
            });
        });
        ctx.app.saveCrawel(`得意生活 本周热门`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = deyi;
