"use strict";

// 买买买 最新线报
const just998 = async (ctx) => {
    ctx.app.logger.info("买买买 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://just998.com/xianbao/top/24hour"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".visited .panel-body a");

        items.each((i, element) => {
            let href = $(element).attr("href");

            let title = $(element).attr("title");

            let url = `https://just998.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "买买买",
                tag: "24h线报",
                bigType: "购物",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel("买买买 24h线报", dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = just998;
