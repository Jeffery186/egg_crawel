"use strict";

// 蛋蛋网 十大话题
const oiegg = async (ctx) => {
    ctx.app.logger.info("蛋蛋网 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.oiegg.com/index.php",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".on-left li a:nth-child(2)");

        items.each((i, element) => {
            if (i > 9) {
                return;
            }
            let title = $(element)
                .text()
                .replace(/[ ]|\n/g, "");

            let href = $(element).attr("href");

            let url = `"https://www.oiegg.com/${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "蛋蛋网",
                tag: "十大话题",
                bigType: "社区",
            });
        });

        ctx.app.saveCrawel(`蛋蛋网 十大话题`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = oiegg;
