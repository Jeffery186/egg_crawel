"use strict";

// cnBeta
const cnBeta = async (ctx) => {
    ctx.app.logger.info("cnBeta 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://hot.cnbeta.com/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".cnbeta-hot-big-figure");

        items.each((i, element) => {
            let href = $(element).find("a").attr("href");
            let cover = $(element).find(".big-img img").attr("src");

            let title = $(element).find("a").text();

            let url = `https:${href}`;

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "cnBeta",
                tag: "独家资讯",
                bigType: "科技",
            });
        });

        const items2 = $(".cnbeta-hot-small-figure item");

        items2.each((i, element) => {
            let href = $(element).find("a").attr("href");
            let cover = $(element).find(".small-img img").attr("src");

            let title = $(element).find("a").text();

            let url = `https:${href}`;

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "cnBeta",
                bigType: "科技",
                tag: "独家资讯",
            });
        });
        ctx.app.saveCrawel(`cnBeta 独家资讯`, dataList);

        //影视新闻
        let ysnewsList = [];
        const items3 = $(".movie .topConmments li");

        items3.each((i, element) => {
            let href = $(element).find("a").attr("href");

            let cover = $(element).find(".story-image").attr("src");

            let title = $(element).find("a").text();

            let url = `https:${href}`;

            ysnewsList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "cnBeta",
                bigType: "科技",
                tag: "影视新闻",
            });
        });

        ctx.app.saveCrawel(`cnBeta 影视新闻`, ysnewsList);

        //歌曲热闻
        let kqnewsList = [];
        const items4 = $(".music .topConmments li");

        items4.each((i, element) => {
            let href = $(element).find("a").attr("href");

            let cover = $(element).find(".story-image").attr("src");

            let title = $(element).find("a").text();

            let url = `https:${href}`;

            kqnewsList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "cnBeta",
                bigType: "科技",
                tag: "歌曲热闻",
            });
        });

        ctx.app.saveCrawel(`cnBeta 歌曲热闻`, kqnewsList);

        //游戏热闻
        let gamenewsList = [];
        const items5 = $(".comic .topConmments li");

        items5.each((i, element) => {
            let href = $(element).find("a").attr("href");

            let cover = $(element).find(".story-image").attr("src");

            let title = $(element).find("a").text();

            let url = `https:${href}`;

            gamenewsList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "cnBeta",
                bigType: "科技",
                tag: "游戏热闻",
            });
        });

        ctx.app.saveCrawel(`cnBeta 游戏热闻`, kqnewsList);

        //漫画热闻
        let mhnewsList = [];
        const items6 = $(".game .topConmments li");

        items6.each((i, element) => {
            let href = $(element).find("a").attr("href");

            let cover = $(element).find(".story-image").attr("src");

            let title = $(element).find("a").text();

            let url = `https:${href}`;

            mhnewsList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "cnBeta",
                bigType: "科技",
                tag: "漫画热闻",
            });
        });

        ctx.app.saveCrawel(`cnBeta 漫画热闻`, kqnewsList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = cnBeta;
