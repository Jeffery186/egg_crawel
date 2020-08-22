"use strict";

//一亩三分地 热帖
const onePoint3acres = async (ctx) => {
    ctx.app.logger.info("一亩三分地 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.1point3acres.com/bbs/forum.php?mod=guide&view=hot",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $("#threadlist .bm_c tr");

        items.each((i, element) => {
            let title = $(element).find(".common .xst").text();

            let href = $(element).find(".common .xst").attr("href");

            let author = $(element).find("cite a").first().text();

            let heat = $(element).find(".num em").text();

            let url = `https://www.1point3acres.com/${href}`;

            dataList.push({
                url,
                title,
                heat,
                author,
                hash: ctx.helper.hash(url),
                reptileName: "一亩三分地",
                tag: "热帖",
                bigType: "社区",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`一亩三分地 热帖`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = onePoint3acres;
