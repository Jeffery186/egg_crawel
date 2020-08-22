"use strict";

// CSDN论坛 技术区热帖
const jishucsdn = async (ctx) => {
    ctx.app.logger.info("CSDN论坛 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://bbs.csdn.net/tech_hot_topics"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".list_1 li a");

        items.each((i, element) => {
            let title = $(element)
                .text()
                .replace(/[ ]|\n/g, "");

            let href = $(element).attr("href");

            let url = `https://bbs.csdn.net${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "CSDN论坛",
                tag: "技术区热帖",
                bigType: "社区",
            });
        });
        ctx.app.saveCrawel(`CSDN论坛 技术区热帖`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = jishucsdn;
