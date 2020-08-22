"use strict";

// 游戏时光 游戏资讯列表
const vgtime = async (ctx) => {
    ctx.app.logger.info("游戏时光 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.vgtime.com/topic/index.jhtml"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".info_box");

        items.each((i, element) => {
            let href = $(element).find("a").attr("href");

            let title = $(element)
                .find("h2")
                .text()
                .replace(/[ ]|\n/g, "");

            let url = `https://www.vgtime.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "游戏时光",
                tag: "游戏资讯列表",
                bigType: "娱乐",
            });
        });
        ctx.app.saveCrawel(`游戏时光 游戏资讯列表`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = vgtime;
