"use strict";

// 科普中国 辟谣
const kepuchina = async (ctx) => {
    ctx.app.logger.info("科普中国 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://piyao.kepuchina.cn/",
        "networkidle0"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $("._rumorList li");

        items.each((i, element) => {
            let cover = $(element).find(".img-box img").attr("src");

            let url = $(element).find("h4").parent().attr("href");

            let title = $(element).find("h4").text();

            let author = $(element).find(".origin").text();

            dataList.push({
                url,
                title,
                cover,
                author,
                hash: ctx.helper.hash(url),
                reptileName: "科普中国",
                tag: "辟谣",
                bigType: "科技",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel("科普中国 辟谣", dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = kepuchina;
