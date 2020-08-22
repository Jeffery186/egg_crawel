"use strict";

// 美拍 热门视频
const meipai = async (ctx) => {
    ctx.app.logger.info("美拍 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.meipai.com/medias/hot",
        "networkidle0"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $("#mediasList li");

        items.each((i, element) => {
            let title = $(element)
                .find(".content-l-p")
                .attr("title")
                .replace(/[ ]|\n/g, "");

            let href = $(element).find(".content-l-p").attr("href");

            let cover = "https:" + $(element).find("img").attr("src");

            let url = `https://www.meipai.com${href}`;

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "美拍",
                tag: "热门视频",
                bigType: "娱乐",
            });
        });

        ctx.app.saveCrawel(`美拍 热门视频`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = meipai;
