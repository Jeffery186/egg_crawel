"use strict";
// 爱搞机 热门文章
const igao7 = async (ctx) => {
    ctx.app.logger.info("爱搞机 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://www.igao7.com/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".igao7Hot-article li");

        items.each((i, element) => {
            let title = $(element)
                .find(".txt .name")
                .text()
                .replace(/[ ]|\n/g, "")
                .trim();
            let cover = $(element).find(".imgs img").attr("src");
            let url = $(element).find(".imgs a").attr("href");

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: "爱搞机",
                tag: "热门文章",
                bigType: "科技",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`爱搞机 热门文章`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = igao7;
