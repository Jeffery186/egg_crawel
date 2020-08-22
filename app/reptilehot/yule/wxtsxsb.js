"use strict";

// 微信图书
const wxtsxsb = async (ctx) => {
    ctx.app.logger.info("微信图书 小说榜 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://weread.qq.com/web/category/novel_male"
    );

    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let xdataList = [];
        const xitems = $(".ranking_content_bookList li");

        xitems.each((i, element) => {
            let href = $(element).find(".wr_bookList_item_link").attr("href");

            let title = $(element)
                .find(".wr_bookList_item_title")
                .text()
                .trim();

            let author = $(element).find(".wr_bookList_item_author").text();

            let cover = $(element).find(".wr_bookCover_img").attr("src");

            let url = `https://weread.qq.com${href}`;

            xdataList.push({
                url,
                title,
                cover,
                author,
                hash: ctx.helper.hash(title),
                reptileName: `微信图书`,
                tag: "小说榜",
                bigType: "娱乐",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`微信图书 小说榜`, xdataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = wxtsxsb;
