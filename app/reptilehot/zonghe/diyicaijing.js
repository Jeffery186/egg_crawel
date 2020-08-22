"use strict";

// 第一财经 热门榜
const diyicaijing = async (ctx) => {
    ctx.app.logger.info("第一财经 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.yicai.com/news/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        //新闻排行周榜
        let dataList = [];
        const news = $("#newsRank .m-content a");
        news.each((i, element) => {
            let href = $(element).attr("href");

            let title = $(element).text();

            let url = `https://www.yicai.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "第一财经",
                tag: "新闻排行周榜",
                bigType: "综合",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`第一财经 新闻排行周榜`, dataList);

        //视频排行周榜
        let videoList = [];
        const video = $("#videoRank .m-content a");
        video.each((i, element) => {
            let href = $(element).attr("href");

            let title = $(element).text();

            let url = `https://www.yicai.com${href}`;

            videoList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "第一财经",
                tag: "视频排行周榜",
                bigType: "综合",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`第一财经 视频排行周榜`, videoList);

        //图集排行周榜
        let imageList = [];
        const image = $("#imageRank .m-content a");
        image.each((i, element) => {
            let href = $(element).attr("href");

            let title = $(element).text();

            let url = `https://www.yicai.com${href}`;

            imageList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "第一财经",
                tag: "图集排行周榜",
                bigType: "综合",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`第一财经 图集排行周榜`, imageList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = diyicaijing;
