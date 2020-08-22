"use strict";

// 360doc个人图书馆七日热文
const doc360 = async (ctx) => {
    ctx.app.logger.info("360doc 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("http://www.360doc.com/index.html");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".yzphbox a");
        items.each((i, element) => {
            let url = $(element).attr("href");

            let title = $(element).text();

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "360doc",
                tag: "个人图书馆七日热文",
                bigType: "综合",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`360doc 个人图书馆七日热文`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = doc360;
