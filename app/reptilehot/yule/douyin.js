"use strict";

// 抖音热搜
const douyin = async (ctx) => {
    ctx.app.logger.info("抖音热搜 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl(
        "https://www.iesdouyin.com/share/billboard/?id=0",
        "networkidle2",
        2000,
        ".tab:nth-child(2)"
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        const videoList = [];
        const videoRe = $(".video-item");

        videoRe.each((i, element) => {
            let videoId = $(element).attr("data-id");
            let url = `https://www.iesdouyin.com/share/video/${videoId}/?region=&mid=6766067893424671499&u_code=0&titleType=title`;
            let cover = $(element)
                .find(".cover")
                .attr("style")
                .split("(")[1]
                .split(")")[0];
            let title = $(element).find(".title").text();

            let author = $(element).find(".author").text();

            let heat = $(element).find(".value").text();
            videoList.push({
                url,
                title,
                cover,
                author,
                heat,
                hash: ctx.helper.hash(url),
                reptileName: "抖音",
                bigType: "娱乐",
                tag: "热搜视频",
                createDate: +new Date(),
            });
        });

        ctx.app.saveCrawel(`抖音 热搜视频`, videoList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = douyin;
