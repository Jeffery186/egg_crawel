"use strict";

//界面 今日发布
const jiemian = async (ctx) => {
    ctx.app.logger.info("上观 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://m.jiemian.com/lists/hots/index_1.html"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".news-view");

        items.each((i, element) => {
            let cover = $(element).find(".news-img img").attr("src");

            let url = $(element).find("h3 a").attr("href");

            let title = $(element).find("h3 a").text();

            let author = $(element).find("span a").text();

            dataList.push({
                url,
                title,
                author,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "界面",
                bigType: "综合",
                tag: "今日发布",
            });
        });
        ctx.app.saveCrawel("界面 今日发布", dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = jiemian;
