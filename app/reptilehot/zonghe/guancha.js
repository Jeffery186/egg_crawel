"use strict";

// 风闻 3天最热
const guancha = async (ctx) => {
    ctx.app.logger.info("风闻 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://user.guancha.cn/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".list-item");

        items.each((i, element) => {
            let href = $(element).find("h4 a").attr("href");

            let title = $(element).find("h4 a").text();

            let cover = $(element).find(".item-pic img").attr("src");

            let url = `https://user.guancha.cn${href}`;

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "风闻",
                tag: "3天最热",
                bigType: "综合",
            });
        });

        ctx.app.saveCrawel(`风闻 3天最热`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = guancha;
