"use strict";

// 钛锋网 热门文章
const tmtforum = async (ctx) => {
    ctx.app.logger.info("钛锋网 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://www.tmtforum.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".news-list-side li");

        items.each((i, element) => {
            let href = $(element).find("a").attr("href");

            let cover = $(element).find("a img").attr("src");

            let title = $(element).find("a h4").text();

            let url = `https://www.tmtforum.com${href}`;

            dataList.push({
                url,
                title,
                cover,
                hash: ctx.helper.hash(url),
                reptileName: `钛锋网`,
                tag: "热门文章",
                bigType: "科技",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`钛锋网 热门文章`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = tmtforum;
