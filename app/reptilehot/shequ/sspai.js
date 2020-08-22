"use strict";

// 少数派
const sspai = async (ctx) => {
    ctx.app.logger.info("少数派 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://sspai.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const csdn = $(".article .img_box");
        csdn.each((i, element) => {
            let href = $(element).find("a").attr("href");

            let author = $(element).find(".text_ellipsis").text();

            let cover = $(element).find("img").attr("src");

            let title = $(element).find("a").text();

            let url = `https://sspai.com${href}`;

            dataList.push({
                url,
                title,
                author,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: "少数派",
                tag: "最热文",
                bigType: "社区",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`少数派 最热文`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = sspai;
