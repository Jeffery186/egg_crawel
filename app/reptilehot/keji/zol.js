"use strict";

// 中关村在线 一周热门榜
const zol = async (ctx) => {
    ctx.app.logger.info("中关村在线 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://www.zol.com.cn/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".ranking-section li");
        items.each((i, element) => {
            let url = $(element).find("a").attr("href");

            let title = $(element).find("a").text();

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: `中关村在线`,
                tag: "一周热门榜",
                bigType: "科技",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`中关村在线 一周热门榜`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = zol;
