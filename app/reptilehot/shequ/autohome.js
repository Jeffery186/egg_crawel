"use strict";

// 汽车之家 精选日报
const autohome = async (ctx) => {
    ctx.app.logger.info("汽车之家 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://club.autohome.com.cn/jingxuan#pvareaid=6826777",
        "networkidle0"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".content li");

        items.each((i, element) => {
            let href = $(element).find(".pic-box a").attr("href");

            if (href) {
                let title = $(element).find(".pic-box a").attr("title");

                let cover =
                    "https:" + $(element).find(".pic-box img").attr("src");

                let url = `https:${href}`;

                dataList.push({
                    url,
                    title,
                    cover,
                    hash: ctx.helper.hash(url),
                    createDate: +new Date(),
                    reptileName: "汽车之家",
                    bigType: "社区",
                    tag: "精选日报",
                });
            }
        });
        ctx.app.saveCrawel(`汽车之家 精选日报`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = autohome;
