"use strict";

// 新浪网
const sinarc = async (ctx) => {
    ctx.app.logger.info("新浪网 热词排行榜 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://www.sina.com.cn/mid/search-list.shtml"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        //热词排行榜
        let dataList = [];
        const items = $(".phblist li");

        items.each((i, element) => {
            let url = $(element).find(".keyword a").attr("href");

            let title = $(element)
                .find(".keyword a")
                .text()
                .replace("相关新闻微博热议", "")
                .trim();

            let heat = $(element).find(".exp em").text();

            dataList.push({
                url,
                title,
                heat,
                hash: ctx.helper.hash(url),
                reptileName: `新浪网`,
                tag: "热词排行榜",
                bigType: "综合",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`新浪网 热词排行榜`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = sinarc;
