"use strict";

// 梨视频 总榜
const pearvideo = async (ctx) => {
    ctx.app.logger.info("梨视频 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.pearvideo.com/popular"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".popular-list li");

        items.each((i, element) => {
            let cover = $(element)
                .find(".popularem-img")
                .attr("style")
                .split("(")[1]
                .split(")")[0];

            let href = $(element)
                .find(".popularem-title")
                .parent()
                .attr("href");

            let title = $(element).find(".popularem-title").text();

            let url = `https://www.pearvideo.com/${href}`;

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: "梨视频",
                tag: "总榜",
                bigType: "娱乐",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`梨视频 总榜`, dataList);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = pearvideo;
