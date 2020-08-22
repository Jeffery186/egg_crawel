"use strict";

// 新片场 热门作品
const xinpianchang = async (ctx) => {
    ctx.app.logger.info("新片场 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.xinpianchang.com/channel/index/id-0/sort-like/type-0/duration_type-0/resolution_type-?from=articleListPage"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".video-list .enter-filmplay");

        items.each((i, element) => {
            let href = $(element).attr("data-articleid");

            let title = $(element).find(".video-con-top p").text();

            let cover = $(element).find(".video-cover img").attr("src");

            let heat = $(element).find(".icon-play-volume").text();

            let url = `https://www.xinpianchang.com/${href}`;

            dataList.push({
                url,
                title,
                heat,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: "新片场",
                tag: "热门作品",
                bigType: "娱乐",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`新片场 热门作品`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = xinpianchang;
