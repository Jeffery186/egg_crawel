"use strict";

// 育儿论坛 今日热帖
const bbsCi123 = async (ctx) => {
    ctx.app.logger.info("育儿论坛 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("http://bbs.ci123.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $("#phtype_tab1 .biaoti a");

        items.each((i, element) => {
            let title = $(element)
                .text()
                .replace(/[ ]|\n/g, "");
            if (title.indexOf("详情") === -1) {
                let url = $(element).attr("href");

                dataList.push({
                    url,
                    title,
                    hash: ctx.helper.hash(url),
                    createDate: +new Date(),
                    reptileName: "育儿论坛",
                    tag: "今日热帖",
                    bigType: "社区",
                });
            }
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
module.exports = bbsCi123;
