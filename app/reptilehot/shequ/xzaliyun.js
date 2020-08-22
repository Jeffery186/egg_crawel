"use strict";

//  先知社区 精华推荐
const xzaliyun = async (ctx) => {
    ctx.app.logger.info("吾爱破解 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://xz.aliyun.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".topic-title");

        items.each((i, element) => {
            let title = $(element)
                .text()
                .replace(/[ ]|\n/g, "");

            let href = $(element).attr("href");

            let url = `https://xz.aliyun.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "先知社区",
                tag: "精华推荐",
                bigType: "社区",
            });
        });

        ctx.app.saveCrawel(`先知社区 精华推荐`, dataList.slice(0, 10));

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = xzaliyun;
