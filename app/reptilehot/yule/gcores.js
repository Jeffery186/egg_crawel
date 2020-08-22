"use strict";

// 机核 本周最热
const gcores = async (ctx) => {
    ctx.app.logger.info("机核 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.gcores.com");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".u_equalHeightRow .col-sm-6 ");

        items.each((i, element) => {
            let href = $(element).find(".original_content").attr("href");

            let title = $(element).find(".original_content h3").text();

            let cover = $(element)
                .find(".original_imgArea")
                .attr("style")
                .split("(")[1]
                .split(")")[0];

            let url = `https://www.gcores.com${href}`;

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "机核",
                tag: "最新",
                bigType: "娱乐",
            });
        });

        ctx.app.saveCrawel(`机核`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = gcores;
