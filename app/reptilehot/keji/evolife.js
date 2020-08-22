"use strict";

// 爱活网 头条 Evolife.cn - 科技进化生活
const evolife = async (ctx) => {
    ctx.app.logger.info("爱活网 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.evolife.cn/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".news-item");
        items.each((i, element) => {
            let url = $(element).find(".title a").attr("href");

            let cover = $(element).find(".zt_img img").attr("src");

            let title = $(element).find(".title a").text();

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "爱活网",
                tag: "头条",
                bigType: "科技",
            });
        });
        ctx.app.saveCrawel(`爱活网 头条`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = evolife;
