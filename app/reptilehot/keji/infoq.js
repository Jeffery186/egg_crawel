"use strict";

//infoq 热点
const infoq = async (ctx) => {
    ctx.app.logger.info("infoq 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.infoq.cn/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".section .list:nth-child(3) li");

        items.each((i, element) => {
            let href = $(element).find("a").attr("href");

            let title = $(element).find("a").text().trim();

            let url = `https://www.infoq.cn${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "infoq",
                bigType: "科技",
                tag: "热点",
            });
        });

        ctx.app.saveCrawel("infoq 热点", dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = infoq;
