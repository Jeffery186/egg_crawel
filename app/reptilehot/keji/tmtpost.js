"use strict";

// 钛媒体 热门文章
const tmtpost = async (ctx) => {
    ctx.app.logger.info("钛媒体 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.tmtpost.com/hot");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".mod-article-list li");
        items.each((i, element) => {
            let href = $(element).find("h2 a").attr("href");

            let cover = $(element).find(".pic img").attr("src");

            let title = $(element)
                .find("h2 a")
                .text()
                .replace(/[ ]|\n/g, "")
                .trim();

            let url = `https://www.tmtpost.com${href}`;

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: `钛媒体`,
                tag: "热门文章",
                bigType: "科技",
                createDate: +new Date(),
            });
        });
        ctx.app.saveCrawel(`钛媒体 热门文章`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = tmtpost;
