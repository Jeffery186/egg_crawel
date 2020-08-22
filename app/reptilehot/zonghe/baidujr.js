"use strict";

const baidujr = async (ctx) => {
    ctx.app.logger.info("百度 今日热点 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://top.baidu.com/buzz?b=341&c=513&fr=topcategory_c513"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataListday = [];
        const itemsday = $(".keyword");

        itemsday.each((i, element) => {
            let url = $(element).find(".list-title").attr("href");

            let title = $(element).find(".list-title").text();

            dataListday.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "百度",
                bigType: "综合",
                tag: "今日热点",
            });
        });
        ctx.app.saveCrawel(`百度 今日热点`, dataListday);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = baidujr;
