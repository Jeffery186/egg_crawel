"use strict";

// 汽车日报 每日热帖
const bbsPcauto = async (ctx) => {
    ctx.app.logger.info("汽车日报 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://bbs.pcauto.com.cn/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $("#forumhotlist .title");

        items.each((i, element) => {
            let href = $(element).find("font").parent().attr("href");

            if (href) {
                let title = $(element)
                    .find("font")
                    .text()
                    .replace(/[ ]|\n/g, "");
                let url = `https://bbs.co188.com${href}`;
                if (i < 8) {
                    dataList.push({
                        url,
                        title,
                        hash: ctx.helper.hash(url),
                        createDate: +new Date(),
                        reptileName: "汽车日报",
                        tag: "每日热帖",
                        bigType: "社区",
                    });
                } else {
                }
            }
        });
        ctx.app.saveCrawel(`汽车日报 每日热帖`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = bbsPcauto;
