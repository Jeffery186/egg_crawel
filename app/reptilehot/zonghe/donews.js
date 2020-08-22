"use strict";

// DONEWS
const donews = async (ctx) => {
    ctx.app.logger.info("DONEWS 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.donews.com/article/show_recommend"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const csdn = $(".rankinglist li");
        csdn.each((i, element) => {
            let url = $(element).find("a").attr("href");
            let author = $(element).find("ef").text();

            let title = $(element).find("a").text();

            dataList.push({
                url,
                title,
                author,
                hash: ctx.helper.hash(url),
                reptileName: "DONEWS",
                tag: "今日推荐",
                bigType: "综合",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`DONEWS 今日推荐`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = donews;
