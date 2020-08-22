"use strict";

// 光谷社区 今日热议
const guanggoo = async (ctx) => {
    ctx.app.logger.info("光谷社区 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("http://www.guanggoo.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".hot_topic_title");

        items.each((i, element) => {
            let title = $(element)
                .find("a")
                .text()
                .replace(/[ ]|\n/g, "");

            let href = $(element).find("a").attr("href");

            let url = `http://www.guanggoo.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "光谷社区",
                tag: "今日热议",
                bigType: "社区",
            });
        });
        ctx.app.saveCrawel(`光谷社区 今日热议`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = guanggoo;
