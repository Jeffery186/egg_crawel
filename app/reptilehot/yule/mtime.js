"use strict";

// Mtime时光网 今日热点
const mtime = async (ctx) => {
    ctx.app.logger.info("Mtime时光网 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://www.mtime.com/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".hotnews .newsitem");

        items.each((i, element) => {
            let title = $(element)
                .find("h3 a")
                .text()
                .replace(/[ ]|\n/g, "");

            let url = $(element)
                .find("h3 a")
                .attr("href")
                .replace(/[ ]|\n/g, "");

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "Mtime时光网",
                tag: "今日热点",
                bigType: "娱乐",
            });
        });

        ctx.app.saveCrawel(`Mtime时光网 今日热点`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = mtime;
