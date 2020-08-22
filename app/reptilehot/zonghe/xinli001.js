"use strict";

// 壹心理 最近热文
const xinli001 = async (ctx) => {
    ctx.app.logger.info("壹心理 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.xinli001.com/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".cate_0-content .content");

        items.each((i, element) => {
            let url = $(element).find(".common-a").attr("href");

            let title = $(element).find(".contnet-title p").text();

            let cover = $(element).find(".content-img img").attr("src");

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: "壹心理",
                tag: "最近热文",
                bigType: "综合",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`壹心理 最近热文`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = xinli001;
