"use strict";

// csdn
const csdn = async (ctx) => {
    ctx.app.logger.info("csdn 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.csdn.net/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const csdn = $(".company_list li");
        csdn.each((i, element) => {
            let url = $(element).find(".company_name a").attr("href");
            let cover = $(element).find(".img_box img").attr("src");

            let title = $(element).find(".company_name a").text();

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: "csdn",
                tag: "今日推荐",
                bigType: "科技",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`csdn 今日推荐`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = csdn;
