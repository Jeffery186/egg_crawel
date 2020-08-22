"use strict";

// 虎扑
const hupu = async (ctx) => {
    ctx.app.logger.info("虎扑社区 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://bbs.hupu.com/all-gambia");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".textSpan a");

        items.each((i, element) => {
            let href = $(element).attr("href");
            let title = $(element).find("span").text();

            let url = `https://bbs.hupu.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "虎扑社区",
                tag: "热帖",
                bigType: "社区",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`虎扑社区 热帖`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = hupu;
