"use strict";

// 澎湃新闻
const pengpainews = async (ctx) => {
    ctx.app.logger.info("澎湃新闻 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.thepaper.cn/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $("#listhot0 li a");

        items.each((i, element) => {
            let href = $(element).attr("href");
            if (href) {
                let title = $(element).text();

                let url = `https://www.thepaper.cn/${href}`;
                dataList.push({
                    url,
                    title,
                    hash: ctx.helper.hash(url),
                    reptileName: `澎湃`,
                    tag: "今日排行",
                    bigType: "综合",
                    createDate: +new Date(),
                });
            }
        });

        ctx.app.saveCrawel(`澎湃 今日排行`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = pengpainews;
