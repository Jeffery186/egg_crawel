"use strict";

// nga游戏社区
const nga = async (ctx) => {
    ctx.app.logger.info("nga游戏社区 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("http://nga.cn/", "networkidle2");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        // nga游戏社区 热门主题
        let dataList = [];
        const items = $(".topics li");
        items.each((i, element) => {
            let url = $(element).find(".tit a").attr("href");

            let title = $(element)
                .find(".tit a")
                .attr("title")
                .replace(/[ ]|\n/g, "")
                .trim();

            let cover = $(element)
                .find(".img a")
                .attr("style")
                .split("(")[1]
                .split(")")[0];

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "nga游戏社区",
                tag: "热门主题",
                bigType: "社区",
            });
        });

        ctx.app.saveCrawel(`nga游戏社区 热门主题`, dataList);

        let dataListrt = [];
        const itemsrt = $(".hot span");
        itemsrt.each((i, element) => {
            let url = "https:" + $(element).parent().attr("href");

            let title = $(element)
                .text()
                .replace(/[ ]|\n/g, "")
                .trim();

            dataListrt.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "nga游戏社区",
                tag: "热帖",
                bigType: "社区",
            });
        });

        ctx.app.saveCrawel(`nga游戏社区 热帖`, dataListrt);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = nga;
