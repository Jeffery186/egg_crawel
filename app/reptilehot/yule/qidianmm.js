"use strict";

// 起点女生网 24h热销榜
const qidian = async (ctx) => {
    ctx.app.logger.info("起点女生网 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.qidian.com/mm/rank/hotsales?style=1"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        // 起点女生网  https://www.qidian.com/mm/rank/hotsales?style=1
        let dataListmm = [];
        const itemsmm = $(".book-img-text li");

        itemsmm.each((i, element) => {
            let href = $(element).find("h4 a").attr("href");

            let title = $(element)
                .find("h4 a")
                .text()
                .replace(/[ ]|\n/g, "");

            let cover =
                "https:" + $(element).find(".book-img-box img").attr("src");

            let url = `https:${href}`;

            dataListmm.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "起点女生网",
                tag: "24h热销榜",
                bigType: "娱乐",
            });
        });

        ctx.app.saveCrawel(`起点女生网 24h热销榜`, dataListmm);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = qidian;
