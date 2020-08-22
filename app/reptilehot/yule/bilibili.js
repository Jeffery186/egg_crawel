"use strict";

//bilibili 全站日榜
const bilibili = async (ctx) => {
    ctx.app.logger.info("bilibili 全站日榜 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.bilibili.com/ranking/all/0/0/1",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".rank-item");

        items.each((i, element) => {
            let cover = $(element).find(".cover img").attr("src");

            let title = $(element).find(".cover img").attr("alt");

            let url = $(element).find(".img a").attr("href").split("//")[1];

            let author = $(element).find(".author").parent().text();

            let heat = $(element).find(".play").parent().text();

            dataList.push({
                url: `https://${url}`,
                title,
                heat,
                author,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: "bilibili",
                tag: "全站日榜",
                bigType: "娱乐",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`bilibili 全站日榜`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = bilibili;
