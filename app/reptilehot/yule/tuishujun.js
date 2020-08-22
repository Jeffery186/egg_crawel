"use strict";

// 推书君 完结榜
const tuishujun = async (ctx) => {
    ctx.app.logger.info("推书君 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.tuishujun.com/rank/finished"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".tsj-book-item");

        items.each((i, element) => {
            let href = $(element)
                .find(".tsj-book-item__info__right__book-name")
                .attr("href");

            let title = $(element)
                .find(".tsj-book-item__info__right__book-name")
                .text()
                .replace(/[ ]|\n/g, "");

            let cover = $(element).find(".tsj-book-cover__img").attr("src");

            let url = `https://www.tuishujun.com${href}`;

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "推书君",
                tag: "完结榜",
                bigType: "娱乐",
            });
        });

        ctx.app.saveCrawel(`推书君 完结榜`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = tuishujun;
