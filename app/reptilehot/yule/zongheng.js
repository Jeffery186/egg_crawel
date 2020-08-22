"use strict";

// 纵横中文网 24h热销榜
const zongheng = async (ctx) => {
    ctx.app.logger.info("纵横中文网 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://www.zongheng.com/rank/details.html?rt=3&d=1"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".rankpage_box .rank_d_list");

        items.each((i, element) => {
            let url = $(element).find(".rank_d_b_name a").attr("href");

            let title = $(element)
                .find(".rank_d_b_name a")
                .text()
                .replace(/[ ]|\n/g, "");

            let cover = $(element).find(".rank_d_book_img img").attr("src");

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "纵横中文网",
                tag: "24h热销榜",
                bigType: "娱乐",
            });
        });

        ctx.app.saveCrawel(`纵横中文网 24h热销榜`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = zongheng;
