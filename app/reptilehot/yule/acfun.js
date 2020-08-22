"use strict";

// AcFun 榜单
const acfun = async (ctx) => {
    ctx.app.logger.info("AcFun 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.acfun.cn/rank/list/#cid=-1;range=1;pcid=-3",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(`div[id*="item-rank-"]`);

        items.each((i, element) => {
            let cover = $(element).find(".preview").attr("src");

            let title = $(element).find(".title").text();

            let href = $(element).find(".title").attr("href");

            let heat = $(element).find(".icon-play-circle").next().text();

            let url = `https://www.acfun.cn${href}`;

            dataList.push({
                url,
                title,
                heat,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: "AcFun",
                tag: "全站日榜",
                bigType: "娱乐",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`AcFun 全站日榜`, dataList);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = acfun;
