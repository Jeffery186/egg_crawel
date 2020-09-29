"use strict";

// 吾爱破解
const wuaipojie = async (ctx) => {
    ctx.app.logger.info("吾爱破解 今日热门 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.52pojie.cn/forum.php?mod=guide&view=hot",
        "networkidle0"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const itemd = $(".bm_c tbody");
        itemd.each((i, element) => {
            let href = $(element).find(".xst").attr("href");

            let tag = $(element).find(".by a").text();

            let title1 = $(element).find(".xst").text();

            let url = `https://www.52pojie.cn/${href}`;

            dataList.push({
                url,
                title: tag + title1,
                hash: ctx.helper.hash(url),
                reptileName: "吾爱破解",
                tag: "今日热门",
                bigType: "社区",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`吾爱破解 今日热门`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
        return dataList;
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = wuaipojie;
