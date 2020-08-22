"use strict";

// 站酷榜单 作品总榜
const zcool = async (ctx) => {
    ctx.app.logger.info("站酷 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.zcool.com.cn/top/index.do",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(`.product li`);

        items.each((i, element) => {
            let url = $(element).find(".title a").attr("href");

            let title = $(element)
                .find(".title a")
                .text()
                .replace(/[ ]|\n/g, "");

            let cover = $(element).find(".showpro img").attr("src");

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "站酷榜单",
                tag: "作品总榜",
                bigType: "科技",
            });
        });
        ctx.app.saveCrawel(`站酷榜单 作品总榜`, dataList);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = zcool;
