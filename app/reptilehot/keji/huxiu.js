"use strict";

// 虎嗅
const huxiu = async (ctx) => {
    ctx.app.logger.info("虎嗅 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.huxiu.com/article/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".article-item");

        items.each((i, element) => {
            let cover = $(element).find("a img").attr("src");
            let title = $(element).find("a img").attr("alt");
            let href = $(element).find("a").attr("href");
            let author = $(element).find("a span").text();

            let url = `https://www.huxiu.com${href}`;

            dataList.push({
                url,
                title,
                cover,
                author,
                hash: ctx.helper.hash(url),
                reptileName: "虎嗅网",
                tag: "热文",
                bigType: "科技",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`虎嗅网 热文`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = huxiu;
