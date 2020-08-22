"use strict";

// 好奇心日报
const haoqixinnews = async (ctx) => {
    ctx.app.logger.info("好奇心日报 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://www.qdaily.com/tags/29.html"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".grid-banner-article-hd");

        items.each((i, element) => {
            let href = $(element).parent().attr("href");

            let cover = $(element).find("img").attr("src");

            let title = $(element).find("img").attr("alt").trim();

            let url = `http://www.qdaily.com/articles/${href}`;

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: "好奇心日报",
                tag: "Top15",
                bigType: "科技",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`好奇心日报 Top15`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = haoqixinnews;
