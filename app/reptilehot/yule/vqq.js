"use strict";

// 腾讯视频 热搜
const vqq = async (ctx) => {
    ctx.app.logger.info("腾讯视频 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://v.qq.com/",
        "networkidle2",
        2000,
        "input[id='keywords']"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".sb_body .sb_name");

        items.each((i, element) => {
            let title = $(element)
                .text()
                .replace(/[ ]|\n/g, "");

            let url = `https://v.qq.com/x/search/?q=${encodeURIComponent(
                title
            )}&stag=101&smartbox_ab=`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "腾讯视频",
                tag: "热搜",
                bigType: "娱乐",
            });
        });

        ctx.app.saveCrawel(`腾讯视频 热搜`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
        return dataList;
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = vqq;
