"use strict";

// 日月光华 热门话题
const bbsFudanEdu = async (ctx) => {
    ctx.app.logger.info("日月光华 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://bbs.fudan.edu.cn/v18/top10"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".bdr-t .title");

        items.each((i, element) => {
            let title = $(element)
                .text()
                .replace(/[ ]|\n/g, "");

            let href = $(element).attr("href");

            let url = `https://bbs.fudan.edu.cn/v18/${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "日月光华",
                tag: "热门话题",
                bigType: "社区",
            });
        });

        ctx.app.saveCrawel(`日月光华 热门话题`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = bbsFudanEdu;
