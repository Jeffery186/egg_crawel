"use strict";

// 砍柴网 热门榜单
const ikanchai = async (ctx) => {
    ctx.app.logger.info("砍柴网 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://www.ikanchai.com/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".txt_hot .r");

        items.each((i, element) => {
            let url = $(element).find("a").attr("href");

            let title = $(element).find("a").text();

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "砍柴网",
                tag: "热门榜单",
                bigType: "科技",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`砍柴网 热门榜单`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = ikanchai;
