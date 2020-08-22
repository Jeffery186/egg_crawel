"use strict";

// 腾讯科技 热点精选
const qqtech = async (ctx) => {
    ctx.app.logger.info("腾讯科技 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://new.qq.com/ch/tech",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".hotnews li");

        items.each((i, element) => {
            let url = $(element).find("h3 a").attr("href");
            let title = $(element).find("h3 a").text();

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "腾讯科技",
                tag: "热点精选",
                bigType: "科技",
            });
        });

        ctx.app.saveCrawel(`腾讯科技 热点精选`, dataList);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = qqtech;
