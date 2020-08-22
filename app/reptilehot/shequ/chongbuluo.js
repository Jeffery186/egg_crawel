"use strict";

// 虫部落 首页精选
const chongbuluo = async (ctx) => {
    ctx.app.logger.info("Chiphell 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.chongbuluo.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $("#portal_block_18 li");

        items.each((i, element) => {
            let title = $(element)
                .find("a")
                .text()
                .replace(/[ ]|\n/g, "");

            let href = $(element).find("a").attr("href");

            let url = `https://www.chongbuluo.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "虫部落",
                tag: "首页精选",
                bigType: "社区",
            });
        });

        ctx.app.saveCrawel(`虫部落 首页精选`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = chongbuluo;
