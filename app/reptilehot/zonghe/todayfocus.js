"use strict";

// 今日看点 热门文章
const todayfocus = async (ctx) => {
    ctx.app.logger.info("今日看点 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://www.todayfocus.cn/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".hot-view-list li");
        items.each((i, element) => {
            let href = $(element).find("h4 a").attr("href");

            let title = $(element).find("h4 a").text();

            let url = `http://www.todayfocus.cn${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: `今日看点`,
                tag: "热门文章",
                bigType: "综合",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`今日看点 热门文章`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = todayfocus;
