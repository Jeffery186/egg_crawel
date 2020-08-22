"use strict";

// 创头条 热文
const ctoutiao = async (ctx) => {
    ctx.app.logger.info("创头条 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("http://www.ctoutiao.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const csdn = $(".ctt-hottext-item");
        csdn.each((i, element) => {
            let href = $(element).find("a").attr("href");

            let title = $(element).find("a").text();
            let url = `http://www.ctoutiao.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "创头条",
                tag: "热文",
                bigType: "科技",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`创头条 热文`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = ctoutiao;
