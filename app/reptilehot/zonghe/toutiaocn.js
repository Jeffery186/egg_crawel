"use strict";

// 头条
const toutiaocn = async (ctx) => {
    ctx.app.logger.info("头条搜索 猜你想搜 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://m.toutiao.com/search",
        "networkidle2",
        2000,
        "input[type='search']"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        // 猜你想搜
        let cnxsList = [];
        const cnxs = $(`a[class*="suggestItem"]`);

        cnxs.each((i, element) => {
            let title = $(element).find("span").text();
            let url = `https://m.toutiao.com/search?keyword=${title}&pd=synthesis&source=&traffic_source=&original_source=&in_tfs=&in_ogs=`;

            cnxsList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: `头条搜索`,
                tag: "猜你想搜",
                bigType: "综合",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`头条搜索 猜你想搜`, cnxsList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = toutiaocn;
