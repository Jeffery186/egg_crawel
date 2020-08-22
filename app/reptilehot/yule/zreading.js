"use strict";

// 左岸读书
const zreading = async (ctx) => {
    ctx.app.logger.info("左岸读书 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://wap.zreading.cn/index-wap2.php"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".post h2 a");

        items.each((i, element) => {
            let href = $(element).attr("href");

            let title = $(element)
                .text()
                .replace(/[ ]|\n/g, "");

            let url = `http://wap.zreading.cn/${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "左岸读书",
                tag: "最新",
                bigType: "娱乐",
            });
        });

        ctx.app.saveCrawel(`左岸读书 最新`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = zreading;
