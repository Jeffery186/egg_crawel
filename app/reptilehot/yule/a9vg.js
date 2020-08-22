"use strict";

// A9VG电玩部落 今日热门
const a9vg = async (ctx) => {
    ctx.app.logger.info("A9VG电玩部落 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("http://www.a9vg.com/list/news");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".a9-mini-news-list .vd-list_content");

        items.each((i, element) => {
            let title = $(element)
                .find("span")
                .text()
                .replace(/[ ]|\n/g, "");

            let href = $(element).parent().attr("href");

            let cover = $(element).find("img").attr("src");

            let url = `http://www.a9vg.com${href}`;

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "A9VG电玩部落",
                tag: "今日热门",
                bigType: "娱乐",
            });
        });

        ctx.app.saveCrawel(`A9VG电玩部落 今日热门`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = a9vg;
