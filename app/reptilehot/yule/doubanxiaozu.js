"use strict";

// 豆瓣小组
const doubanxiaozu = async (ctx) => {
    ctx.app.logger.info("豆瓣小组 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.douban.com/group/explore"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let xzList = [];
        const dbxz = $(".channel-item");
        dbxz.each((i, element) => {
            let url = $(element).find("h3 a").attr("href");

            let cover = $(element).find(".pic-wrap img").attr("src");

            let title = $(element).find("h3 a").text();

            xzList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: "豆瓣小组",
                tag: "讨论精选",
                bigType: "娱乐",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`豆瓣小组 讨论精选`, xzList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = doubanxiaozu;
