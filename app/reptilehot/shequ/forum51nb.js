"use strict";

//专门网论坛 今日热帖
const forum51nb = async (ctx) => {
    ctx.app.logger.info("专门网论坛 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://forum.51nb.com/misc.php?mod=ranklist&type=thread&view=heats&orderby=today"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".tl th a");

        items.each((i, element) => {
            let title = $(element).text();

            let href = $(element).attr("href");

            let url = `https://forum.51nb.com/${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                reptileName: "专门网论坛",
                tag: "今日热帖",
                bigType: "社区",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`飞客茶馆 热帖`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = forum51nb;
