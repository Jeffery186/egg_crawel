"use strict";

// 蓝点网 本月热读
const landiannews = async (ctx) => {
    ctx.app.logger.info("蓝点网 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.landiannews.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(`#slongposts-14 .list_layout`);

        items.each((i, element) => {
            let url = $(element).find(".thumb").parent().attr("href");

            let title = $(element)
                .find(".thumb")
                .parent()
                .attr("title")
                .replace(/[ ]|\n/g, "");

            let cover = $(element).find(".thumb").attr("src");

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "蓝点网",
                tag: "本月热读",
                bigType: "科技",
            });
        });
        ctx.app.saveCrawel("蓝点网 本月热读", dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = landiannews;
