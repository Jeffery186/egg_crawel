"use strict";

//  5X兴趣社区 24小时热帖
const hansiji = async (ctx) => {
    ctx.app.logger.info("5X兴趣社区 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("http://www.hansiji.com/rank/list");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".thread-rank h4 a");

        items.each((i, element) => {
            let title = $(element)
                .text()
                .replace(/[ ]|\n/g, "");

            let href = $(element).attr("href");

            let url = `http://www.hansiji.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "5X兴趣社区",
                tag: "24小时热帖",
                bigType: "社区",
            });
        });

        ctx.app.saveCrawel(`5X兴趣社区 24小时热帖`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = hansiji;
