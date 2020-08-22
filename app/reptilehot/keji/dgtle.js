"use strict";

// 数字尾巴 热文
const dgtle = async (ctx) => {
    ctx.app.logger.info("数字尾巴 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.dgtle.com/article");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const csdn = $(".fadeIn");
        csdn.each((i, element) => {
            let href = $(element).find("h5").parent().attr("href");

            let title = $(element).find("h5").text();

            let cover = $(element).find(".pic img").attr("src");

            let url = `https://www.dgtle.com${href}`;

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: "数字尾巴",
                tag: "热文",
                bigType: "科技",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`数字尾巴 热文`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = dgtle;
