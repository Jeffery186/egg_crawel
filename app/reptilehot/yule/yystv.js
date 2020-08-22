"use strict";

// 游研社 首页推荐
const yystv = async (ctx) => {
    ctx.app.logger.info("游研社 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.yystv.cn/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".top-news  a");

        items.each((i, element) => {
            let href = $(element).attr("href");

            let title = $(element)
                .find(".top-news-text")
                .text()
                .replace(/[ ]|\n/g, "");

            let cover = $(element).find(".img").attr("src");

            let url = `https://www.yystv.cn${href}`;

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "游研社",
                tag: "首页推荐",
                bigType: "娱乐",
            });
        });

        ctx.app.saveCrawel(`游研社 首页推荐`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = yystv;
