"use strict";

//威锋社区
const bbsfeng = async (ctx) => {
    ctx.app.logger.info("威锋社区 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.feng.com/forum",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".hot-content .item a");

        items.each((i, element) => {
            let href = $(element).attr("href");
            let url = `https://www.feng.com/forum${href}`;
            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "威锋社区",
                tag: "最近热门",
                bigType: "科技",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`威锋社区 最近热门`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = bbsfeng;
