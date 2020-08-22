"use strict";

// 新浪网
const sinanews = async (ctx) => {
    ctx.app.logger.info("瓦斯阅读 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("http://news.sina.com.cn/hotnews/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        //新闻点击量排行

        let dianjiList = [];
        const dianji = $("#Con11 tr a");

        dianji.each((i, element) => {
            let url = $(element).attr("href");

            let title = $(element).text();

            dianjiList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: `新浪网`,
                tag: "新闻点击量排行",
                bigType: "综合",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`新浪网 新闻点击量排行`, dianjiList);

        //视频排行 #Con14 tr a
        let videoList = [];
        const video = $("#Con14 tr a");

        video.each((i, element) => {
            let url = $(element).attr("href");

            let title = $(element).text();

            let heat = $(element).parent().next().text();

            videoList.push({
                url,
                title,
                heat,
                hash: ctx.helper.hash(url),
                reptileName: `新浪网`,
                tag: "视频排行",
                bigType: "综合",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`新浪网 视频排行`, videoList);

        //图片排行 #Con14 tr a
        let imageList = [];
        const image = $("#Con15 tr a");

        image.each((i, element) => {
            let url = $(element).attr("href");

            let title = $(element).text();

            imageList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: `新浪网`,
                tag: "图片排行",
                bigType: "综合",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`新浪网 图片排行`, imageList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = sinanews;
