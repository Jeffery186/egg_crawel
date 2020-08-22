"use strict";

// 猫眼 国内票房榜
const maoyan = async (ctx) => {
    ctx.app.logger.info("猫眼 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://maoyan.com/board",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".board-wrapper dd");

        items.each((i, element) => {
            let href = $(element).find(".name a").attr("href");

            let title = $(element).find(".name a").text();

            let cover = $(element).find(".board-img").attr("src");

            let url = `https://maoyan.com${href}`;

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "猫眼",
                tag: "国内票房榜",
                bigType: "娱乐",
            });
        });
        ctx.app.saveCrawel(`猫眼 国内票房榜`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = maoyan;
