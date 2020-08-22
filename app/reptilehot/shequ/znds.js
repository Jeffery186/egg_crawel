"use strict";

// 智能电视网 今天热点
const znds = async (ctx) => {
    ctx.app.logger.info("智能电视网 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.znds.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $("#portal_block_200_content .module li");

        items.each((i, element) => {
            let title = $(element)
                .find("font")
                .text()
                .replace(/[ ]|\n/g, "");

            let href = $(element).find("font").parent().attr("href");

            let url = `https://bbs.co188.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "智能电视网",
                tag: "今天热点",
                bigType: "社区",
            });
        });

        ctx.app.saveCrawel(`智能电视网 今天热点`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = znds;
