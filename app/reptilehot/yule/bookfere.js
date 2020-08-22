"use strict";

// 书伴 每周一书
const bookfere = async (ctx) => {
    ctx.app.logger.info("书伴 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://bookfere.com/books");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $("#main .entry-title");

        items.each((i, element) => {
            let url = $(element).find("a").attr("href");

            let title = $(element).find("a").text();

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "书伴",
                tag: "每周一书",
                bigType: "娱乐",
            });
        });

        ctx.app.saveCrawel(`书伴 每周一书`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = bookfere;
