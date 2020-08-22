"use strict";

const baiduzdrb = async (ctx) => {
    ctx.app.logger.info("百度 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://zhidao.baidu.com/daily/",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        // 百度知道日报 daily-list li
        let dataListd = [];
        const itemsd = $(".daily-list li");

        itemsd.each((i, element) => {
            let href = $(element).find("h2 a").attr("href");

            let title = $(element).find("h2 a").text();

            let cover = $(element).find("img").attr("src");

            let url = `https://zhidao.baidu.com${href}`;

            dataListd.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "百度知道",
                bigType: "综合",
                tag: "日报",
            });
        });
        ctx.app.saveCrawel(`百度知道 日报`, dataListd);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = baiduzdrb;
