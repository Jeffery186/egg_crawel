"use strict";

// 3DM游戏网 最新新闻
const san3dmgame = async (ctx) => {
    ctx.app.logger.info("3DM游戏网 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://m.3dmgame.com/news/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".list_tj .wp_b");

        items.each((i, element) => {
            let url = $(element).find(".txt a").attr("href");

            let title = $(element)
                .find(".txt a")
                .text()
                .replace(/[ ]|\n/g, "");

            let cover = $(element).find(".img img").attr("src");

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "3DM游戏网",
                tag: "最新新闻",
                bigType: "娱乐",
            });
        });

        ctx.app.saveCrawel(`3DM游戏网 最新新闻`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = san3dmgame;
