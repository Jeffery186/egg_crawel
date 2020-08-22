"use strict";

// 小红书 社区精选
const xiaohongshu = async (ctx) => {
    ctx.app.logger.info("小红书 社区精选 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.xiaohongshu.com/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".note-item");

        items.each((i, element) => {
            let href = $(element).find(".image-wrapper").attr("href");

            let title = $(element).find(".note-title").text();

            let url = `https://www.xiaohongshu.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "小红书",
                tag: "社区精选",
                bigType: "购物",
            });
        });

        ctx.app.saveCrawel("小红书 社区精选", dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = xiaohongshu;
