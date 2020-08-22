"use strict";

//金融八卦女 每日八卦
const jinrongbaguanv = async (ctx) => {
    ctx.app.logger.info("金融八卦女 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.jinrongbaguanv.com/article/list.html"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".listWrap .item");

        items.each((i, element) => {
            let cover = $(element)
                .find(".artImg")
                .attr("style")
                .split("(")[1]
                .split(")")[0];

            let href = $(element).find("a").attr("href");

            let title = $(element).find("h2").text();

            let url = `https://www.jinrongbaguanv.com${href}`;

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "金融八卦女",
                bigType: "综合",
                tag: "每日八卦",
            });
        });
        ctx.app.saveCrawel("金融八卦女 每日八卦", dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = jinrongbaguanv;
