"use strict";

// 极客公园7日热门
const geekpark = async (ctx) => {
    ctx.app.logger.info("极客公园 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://www.geekpark.net/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".hot-news article");

        items.each((i, element) => {
            let href = $(element).find("a").attr("href");

            let cover = $(element).find("img").attr("src");

            let title = $(element).find("p").text();

            let url = `http://www.geekpark.net${href}`;

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "极客公园",
                bigType: "科技",
                tag: "7日热门",
            });
        });

        ctx.app.saveCrawel(`极客公园 7日热门`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = geekpark;
