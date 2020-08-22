"use strict";

// 雷科技 最热文章
const leikeji = async (ctx) => {
    ctx.app.logger.info("雷科技 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("http://www.leikeji.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".aside-hot-articles li");

        items.each((i, element) => {
            let href = $(element).find("a").attr("href");

            let cover = $(element).find("a div").attr("data-original");

            let title = $(element).find("a").attr("title");

            let url = `http://www.leikeji.com${href}`;

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: "雷科技",
                tag: "最热文章",
                bigType: "科技",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel("雷科技 最热文章", dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = leikeji;
