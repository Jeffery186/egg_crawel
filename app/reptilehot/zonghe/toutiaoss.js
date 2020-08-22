"use strict";

// 头条
const toutiaoss = async (ctx) => {
    ctx.app.logger.info("头条搜索 时时热搜 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://ib.snssdk.com/rogue/aladdin_landingpage/template/aladdin_landingpage/hot_words.html?isBrowser=true&&traffic_source="
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let ssrsList = [];
        let ssresuo = $(".words a");

        ssresuo.each((i, element) => {
            let href = $(element).attr("href");
            let title = $(element)
                .find(".span9 .tt-ellipsis")
                .text()
                .replace(/[ ]|\n/g, "")
                .trim();

            let heat = $(element).find(".span2").text();

            let url = `https://m.toutiao.com${href}`;
            ssrsList.push({
                url,
                title,
                heat,
                hash: ctx.helper.hash(url),
                reptileName: `头条搜索`,
                tag: "时时热搜",
                bigType: "综合",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`头条搜索 时时热搜`, ssrsList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = toutiaoss;
