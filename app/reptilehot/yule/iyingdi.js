"use strict";

// 旅法师营地 首页推荐
const iyingdi = async (ctx) => {
    ctx.app.logger.info("旅法师营地 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.iyingdi.com/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".articleItem");

        items.each((i, element) => {
            let href = $(element).find(".aTitle a").attr("href");

            if (href) {
                let title = $(element)
                    .find(".aTitle a")
                    .text()
                    .replace(/[ ]|\n/g, "");

                let cover = $(element).find(".detailIcon img").attr("src");

                let url = `https://www.iyingdi.com${href}`;

                dataList.push({
                    url,
                    title,
                    cover,
                    hash: ctx.helper.hash(url),
                    createDate: +new Date(),
                    reptileName: "旅法师营地",
                    tag: "首页推荐",
                    bigType: "娱乐",
                });
            }
        });

        ctx.app.saveCrawel(`旅法师营地 首页推荐`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = iyingdi;
