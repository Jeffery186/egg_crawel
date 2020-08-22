"use strict";
//机器之心 最热文章
const jiqizhixin = async (ctx) => {
    ctx.app.logger.info("机器之心 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.jiqizhixin.com/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $("#hot-container .hot-item");

        items.each((i, element) => {
            let title = $(element).find("a").text();

            let href = $(element).find("a").attr("href");

            let url = `https://www.jiqizhixin.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "机器之心",
                tag: "最热文章",
                bigType: "科技",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel("机器之心 最热文章", dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = jiqizhixin;
