"use strict";

//咖啡日报  PMCAF精选
const pmcaff = async (ctx) => {
    ctx.app.logger.info("咖啡日报 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://coffee.pmcaff.com/?type=2",
        "networkidle2"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(`.articlelist .title a`);

        items.each((i, element) => {
            let href = $(element).attr("href");

            let title = $(element)
                .text()
                .replace(/[ ]|\n/g, "");

            let url = `https://coffee.pmcaff.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "咖啡日报",
                tag: "PMCAF精选",
                bigType: "科技",
            });
        });

        ctx.app.saveCrawel(`咖啡日报 PMCAF精选`, dataList);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = pmcaff;
