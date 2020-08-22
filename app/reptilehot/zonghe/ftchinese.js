"use strict";

//FT中文网 十大热门文章
const ftchinese = async (ctx) => {
    ctx.app.logger.info("FT中文网 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("http://www.ftchinese.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".top10 li");

        items.each((i, element) => {
            let title = $(element).find("a").text();

            let href = $(element).find("a").attr("href");

            let url = `http://www.ftchinese.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "FT中文网",
                tag: "十大热门文章",
                bigType: "综合",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`FT中文网 热门文章`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = ftchinese;
