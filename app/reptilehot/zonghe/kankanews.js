"use strict";

// 看看新闻
const kankanews = async (ctx) => {
    ctx.app.logger.info("看看新闻 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("http://www.kankanews.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".hotList li");

        items.each((i, element) => {
            let url = $(element).find("a").attr("href");

            let title = $(element).find("a").text();

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "看看新闻",
                bigType: "综合",
                tag: "",
                createDate: +new Date(),
            });
        });
        console.log("新闻48小时热榜");
        let news = dataList.slice(0, 10);

        news.map((ele, i) => {
            ele.tag = "新闻48小时热榜";
        });
        ctx.app.saveCrawel("看看新闻 新闻48小时热榜", news);

        console.log("视频48小时热榜");
        let videos = dataList.slice(10, 20);
        videos.map((ele, i) => {
            ele.tag = "视频48小时热榜";
        });
        ctx.app.saveCrawel("看看新闻 视频48小时热榜", videos);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = kankanews;
