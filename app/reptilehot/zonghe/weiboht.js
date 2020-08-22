"use strict";

//微博
const weiboht = async (ctx) => {
    ctx.app.logger.info("微博 话题榜 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://d.weibo.com/231650",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        //  微博话题榜
        let dataListh = [];
        const itemsh = $(".m_wrap .pt_li");

        itemsh.each((i, element) => {
            let cover = $(element).find(".pic_box img").attr("src");

            let title = $(element).find(".pic_box img").attr("alt");

            let url = $(element).find(".pic_box a").attr("href");

            let heat = `阅读数:` + $(element).find(".number").text();

            dataListh.push({
                url,
                title,
                heat,
                cover: `${cover}`,
                hash: ctx.helper.hash(url),
                reptileName: "微博",
                tag: "话题榜",
                bigType: "综合",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`微博 话题榜`, dataListh);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = weiboht;
