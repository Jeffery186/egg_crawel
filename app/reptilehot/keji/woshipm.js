"use strict";

//人人都是产品经理
const woshipm = async (ctx) => {
    ctx.app.logger.info("人人都是产品经理 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://www.woshipm.com/",
        "networkidle2",
        2000,
        ".homeTab span:nth-child(2)"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".home-post-list .postlist-item");

        items.each((i, element) => {
            let url = $(element).find(".post-title a").attr("href");

            let cover = $(element).find(".post-img img").attr("src");

            let title = $(element)
                .find(".post-title a")
                .text()
                .replace(/[ ]|\n/g, "")
                .trim();

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: "人人都是产品经理",
                tag: "今日推荐",
                bigType: "科技",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`人人都是产品经理 今日推荐`, dataList);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = woshipm;
