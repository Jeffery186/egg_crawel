"use strict";

// 百度贴吧
const tieba = async (ctx) => {
    ctx.app.logger.info("百度贴吧 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://tieba.baidu.com/hottopic/browse/topicList?res_type=1&red_tag=q3392968829",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".topic-top-item");

        items.each((i, element) => {
            let cover = $(element).find("img").attr("src");

            let url = $(element).find("a").attr("href");

            let title = $(element).find("a").text();

            let heat = $(element).find(".topic-num").text();

            dataList.push({
                url,
                title,
                cover,
                heat,
                hash: ctx.helper.hash(url),
                reptileName: `百度贴吧`,
                tag: "热议榜",
                bigType: "社区",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`百度贴吧 热议榜`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = tieba;
