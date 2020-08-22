"use strict";

// 豆瓣读书 京东畅销榜
const bookDouban = async (ctx) => {
    ctx.app.logger.info("豆瓣读书 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://book.douban.com/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataListJd = [];
        let dataListDd = [];
        const items = $(".list-ranking li");

        items.each((i, element) => {
            let url = $(element).find(".book-info a").attr("href");

            let title = $(element).find(".book-info a").text();

            if (i > 9) {
                dataListDd.push({
                    url,
                    title,
                    hash: ctx.helper.hash(url),
                    createDate: +new Date(),
                    reptileName: "豆瓣读书",
                    tag: "当当畅销榜",
                    bigType: "购物",
                });
            } else {
                dataListJd.push({
                    url,
                    title,
                    hash: ctx.helper.hash(url),
                    createDate: +new Date(),
                    reptileName: "豆瓣读书",
                    tag: "京东畅销榜",
                    bigType: "购物",
                });
            }
        });

        ctx.app.saveCrawel(`豆瓣读书 京东畅销榜`, dataListJd);
        ctx.app.saveCrawel(`豆瓣读书 当当畅销榜`, dataListDd);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
        return { dataListJd, dataListDd };
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = bookDouban;
