"use strict";

//飞客茶馆 热帖
const flyertea = async (ctx) => {
    ctx.app.logger.info("飞客茶馆 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "http://www.flyertea.com/forum.php?mod=forumdisplay&fid=all&filter=heat&orderby=dateline&sum=all"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $("#threadlisttableid h2");

        items.each((i, element) => {
            let href = $(element)
                .find(".comiis_common img")
                .prev()
                .attr("href");

            if (href) {
                let title = $(element).find(".comiis_common img").prev().text();

                let author = $(element)
                    .find(".author p")
                    .text()
                    .replace(/[ ]|\n/g, "");

                let heat = $(element).find(".viewreply_t").text();

                let url = `http://www.flyertea.com${href}`;

                dataList.push({
                    url,
                    title,
                    heat,
                    author,
                    hash: ctx.helper.hash(url),
                    reptileName: "飞客茶馆",
                    tag: "热帖",
                    bigType: "社区",
                    createDate: +new Date(),
                });
            }
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
module.exports = flyertea;
