"use strict";

const baiduss = async (ctx) => {
    ctx.app.logger.info("百度 实时热点 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://top.baidu.com/buzz?b=1&fr=topindex"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".keyword");

        items.each((i, element) => {
            let url = $(element).find(".list-title").attr("href");

            let title = $(element)
                .find(".list-title")
                .text()
                .replace(/[ ]|\n/g, "")
                .trim();

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "百度",
                tag: "实时热点",
                bigType: "综合",
            });
        });
        ctx.app.saveCrawel(`百度 实时热点`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = baiduss;
