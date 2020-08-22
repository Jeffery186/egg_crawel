"use strict";

//老司机 推荐
const laosiji = async (ctx) => {
    ctx.app.logger.info("老司机 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.laosiji.com/",
        "networkidle0"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $("#snsBox .statistic_item");

        items.each((i, element) => {
            let cover = $(element).find(".img-box img").attr("src");

            let title = $(element).find(".title").text();

            let href = $(element).find(".title").attr("href");

            let url = `https://www.laosiji.com${href}`;

            let author = $(element).find(".user-box span").text();

            dataList.push({
                url,
                title,
                author,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: "老司机",
                bigType: "社区",
                tag: "推荐",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel("老司机 推荐", dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = laosiji;
