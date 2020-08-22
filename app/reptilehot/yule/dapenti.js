"use strict";

// 喷嚏网 本月热读
const dapenti = async (ctx) => {
    ctx.app.logger.info("喷嚏网 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.dapenti.com/blog/index.asp"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $("table:nth-child(8) .center_title_down a");

        items.each((i, element) => {
            if (i > 29) {
                return;
            }
            let href = $(element).attr("href");

            let title = $(element).text();

            let url = `https://www.dapenti.com/blog/${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "喷嚏网",
                tag: "本周热读",
                bigType: "娱乐",
            });
        });

        ctx.app.saveCrawel(`喷嚏网 本周热读`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = dapenti;
