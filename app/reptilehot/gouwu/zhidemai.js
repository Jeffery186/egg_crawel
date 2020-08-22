"use strict";

// 值得买 今日好价排行
const zhidemai = async (ctx) => {
    ctx.app.logger.info("值得买 今日好价排行 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://faxian.smzdm.com/h4s0t0f0c0p1",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".feed-block-ver");

        items.each((i, element) => {
            let url = $(element).find("h5 a").attr("href");

            let cover = $(element).find(".feed-ver-pic img").attr("src");

            let title1 = $(element)
                .find("h5 a")
                .text()
                .replace(/[ ]|\n/g, "")
                .trim();

            let title2 = $(element).find(".z-ellipsis").text();

            dataList.push({
                url,
                title: `${title1}=>${title2}`,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: `值得买`,
                tag: "今日好价排行",
                bigType: "购物",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`值得买 今日好价排行`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = zhidemai;
