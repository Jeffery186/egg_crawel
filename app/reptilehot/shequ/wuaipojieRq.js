"use strict";

// 吾爱破解
const wuaipojieRq = async (ctx) => {
    ctx.app.logger.info("吾爱破解 人气热门 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.52pojie.cn/forum.php?mod=guide&view=hot&page=1",
        "networkidle0"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let reqiList = [];
        const itemr = $(".bm_c tbody");
        itemr.each((i, element) => {
            let href = $(element).find(".xst").attr("href");

            let tag = $(element).find(".by a").text();

            let title1 = $(element).find(".xst").text();

            let url = `https://www.52pojie.cn/${href}`;

            reqiList.push({
                url,
                title: tag + title1,
                hash: ctx.helper.hash(url),
                reptileName: "吾爱破解",
                tag: "人气热门",
                bigType: "社区",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`吾爱破解 人气热门`, reqiList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = wuaipojieRq;
