"use strict";

// 微信热词
const wxrc = async (ctx) => {
    ctx.app.logger.info("微信 热词 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://weixin.sogou.com/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        // 微信热词    id="topwords" li
        let dataListrc = [];
        const itemsrc = $("#topwords li a");

        itemsrc.each((i, element) => {
            let url = $(element).attr("href");

            let title = $(element).text();

            dataListrc.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: `微信`,
                tag: "热词",
                bigType: "综合",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`微信 热词`, dataListrc);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = wxrc;
