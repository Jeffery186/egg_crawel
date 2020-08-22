"use strict";

// 神马搜索
const smsosuo = async (ctx) => {
    ctx.app.logger.info("神马搜索 热搜榜 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        `${decodeURI(
            "https://m.sm.cn/s?q=%E7%A5%9E%E9%A9%AC%E6%96%B0%E9%97%BB%E6%A6%9C%E5%8D%95&ext=request_smbd_channel%3Asm_index&from=smor"
        )}`
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(
            ".news-top-list-content-ul .news-top-list-content-liwrap"
        );

        items.each((i, element) => {
            if (i > 10) return;
            let url = $(element).attr("href");

            let title = $(element)
                .find(".news-info-txt-name .x-line-clamp-1")
                .text();

            let heat = $(element).find(".news-info-txt-icons span").text();

            dataList.push({
                url,
                title,
                heat,
                hash: ctx.helper.hash(title),
                reptileName: `神马搜索`,
                tag: "热搜榜",
                bigType: "综合",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`神马搜索 热搜榜`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = smsosuo;
