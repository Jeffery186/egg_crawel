"use strict";

// 慢慢买 小时排行榜
const manmanbuy = async (ctx) => {
    ctx.app.logger.info("慢慢买 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://zhekou.manmanbuy.com/defaultsharehot.aspx"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".bd .item");

        items.each((i, element) => {
            let href = $(element).find(".highlight").attr("href");

            let title = $(element)
                .find(".highlight")
                .text()
                .replace(/[ ]|\n/g, "");

            let cover = $(element).find(".cover img").attr("src");

            let url = `http://zhekou.manmanbuy.com/${href}`;

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "慢慢买",
                tag: "小时排行榜",
                bigType: "购物",
            });
        });
        ctx.app.saveCrawel("慢慢买 小时排行榜", dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = manmanbuy;
