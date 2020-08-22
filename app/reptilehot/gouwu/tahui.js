"use strict";

// 它惠网 线报
const tahui = async (ctx) => {
    ctx.app.logger.info("它惠网 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.tahui.com/rptlist");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".articleList  a:nth-child(1)");

        items.each((i, element) => {
            let href = $(element).attr("href");

            let title = $(element).text();

            let url = `https://www.tahui.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "它惠网",
                tag: "线报",
                bigType: "购物",
            });
        });

        ctx.app.saveCrawel("它惠网 线报", dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = tahui;
