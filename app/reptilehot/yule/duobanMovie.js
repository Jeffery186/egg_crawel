"use strict";

// 豆瓣电影
const duobanMovie = async (ctx) => {
    ctx.app.logger.info("豆瓣电影 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://movie.douban.com/chart",
        "networkidle0"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        // 豆瓣新片榜
        let xpList = [];
        const xinpianbang = $(".item");
        xinpianbang.each((i, element) => {
            let url = $(element).find(".nbg").attr("href");
            let cover = $(element).find(".nbg img").attr("src");

            let title = $(element)
                .find(".nbg")
                .attr("title")
                .replace(/[ ]|\n/g, "")
                .trim();

            xpList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: "豆瓣",
                tag: "电影新片榜",
                bigType: "娱乐",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`豆瓣 电影新片榜`, xpList);

        // 一周口碑榜· · · · · ·
        let kbList = [];
        const koubei = $("#listCont2 a");
        koubei.each((i, element) => {
            let url = $(element).attr("href");

            let cover = $(element).find(".nbg img").attr("src");

            let title = $(element)
                .text()
                .replace(/[ ]|\n/g, "")
                .trim();

            kbList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: "豆瓣",
                tag: "电影一周口碑榜",
                bigType: "娱乐",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`豆瓣 电影一周口碑榜`, kbList);

        // 北美票房榜· · · · · ·
        let bmList = [];
        const beimei = $("#listCont1 a");
        beimei.each((i, element) => {
            let url = $(element).attr("href");

            let cover = $(element).find(".nbg img").attr("src");

            let title = $(element)
                .text()
                .replace(/[ ]|\n/g, "")
                .trim();

            bmList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: "豆瓣",
                tag: "电影北美票房榜",
                bigType: "娱乐",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`豆瓣 电影北美票房榜`, bmList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = duobanMovie;
