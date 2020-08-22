"use strict";

// 豆瓣热播电视剧
const doubanDianshiju = async (ctx) => {
    ctx.app.logger.info("豆瓣热播电视剧 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://movie.douban.com/tv/#!type=tv&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let xpList = [];
        const reboju = $(".list a");
        reboju.each((i, element) => {
            let url = $(element).attr("href");
            let cover = $(element).find("img").attr("src");

            let title = $(element).find("img").attr("alt");

            xpList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: "豆瓣",
                tag: "热播电视剧",
                bigType: "娱乐",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`豆瓣 热播电视剧`, xpList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = doubanDianshiju;
