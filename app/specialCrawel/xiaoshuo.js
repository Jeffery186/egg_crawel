// 搜索 https://so.html5.qq.com/page/real/novel_result?t=2&entryScene=009&channel_id=25&q=万古神帝
// 详情 https://bookshelf.html5.qq.com/?t=native&ch=004645#!/catalog/1100648963&entryScene=009&channel_id=25&q=万古神帝
// 章节 https://bookshelf.html5.qq.com/api/migration/list_charpter?resourceid=1100648963&start=1&serialnum=2810&sort=asc&t=202007101626
//https://bookshelf.html5.qq.com/qbread/adread/chapter?resourceid=1100648963&serialid=207&ch=001312
const cheerio = require("cheerio");
const axios = require("axios");
const userAgent = require("../util/user_agents");

const serachXiaoshuo = async (ctx, search) => {
    let dataList = [];
    const reOptions = await ctx.app.gotoUrl(
        `https://so.html5.qq.com/page/real/novel_result?t=2&entryScene=009&channel_id=25&q=${search.keywords}`
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;

    try {
        // 找到封面跟url
        let items = $("#root .report");
        items.each((i, element) => {
            let scriptContent = JSON.parse(`${$(element).attr("data-expose")}`);
            if (scriptContent.componentName != "TimeHeader") {
                let url = `https://bookshelf.html5.qq.com/?t=native&ch=004645#!/catalog/${scriptContent.resourceId}&entryScene=009&channel_id=25&q=万古神帝`;
                let title = $(element).find(".book-name").text();
                let author = $(element).find(".author-text").text();
                let jianjie = $(element).find(".source-text").text();
                let cover = $(element)
                    .find(".background-image")
                    .attr("data-background-image");
                dataList.push({
                    url,
                    title,
                    author,
                    cover,
                    jianjie,
                    resourceId: scriptContent.resourceId,
                });
            }
        });

        await page.close();
        await ctx.app.pool.releaseHs(brower);
        return dataList;
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};

const biqugeSearch = async (ctx, search) => {
    let dataList = [];
    const reOptions = await ctx.app.gotoUrl(
        `https://www.biquge.com.cn/search.php?q=${search.keywords}`
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;

    try {
        // let response = await axios.get(
        //     encodeURIComponent(
        //         `https://www.biquge.com.cn/search.php?q=${search.keywords}`
        //     ),
        //     {
        //         headers: { "User-Agent": userAgent.random() },
        //     }
        // );
        // const $ = cheerio.load(response.data, {
        //     ignoreWhitespace: true,
        //     normalizeWhitespace: true,
        // });
        // 找到封面跟url
        let items = $(".result-list .result-game-item");
        items.each((i, element) => {
            let href = $(element)
                .find(".result-game-item-pic-link")
                .attr("href");
            let title = $(element)
                .find(".result-game-item-title-link")
                .text()
                .replace(/[ ]|\n/g, "");
            let author = $(element)
                .find(".result-game-item-info-tag span")
                .eq(1)
                .text();
            let jianjie = $(element).find(".result-game-item-desc").text();
            let cover = $(element).find("img").attr("src");
            dataList.push({
                url: `https://m.biquge.com.cn${href}`,
                title,
                author,
                cover,
                jianjie,
            });
        });

        await page.close();
        await ctx.app.pool.releaseHs(brower);
        return dataList;
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};

const xiaoshuozhangjie = async (ctx, search) => {
    let dataList = {};
    let nzjUrl = [];
    let fyzjUrl = [];
    const reOptions = await ctx.app.gotoUrl(search.url);
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;

    try {
        // 找到封面跟url
        let items = $(".chapter").eq(0).find("li");
        // 最新章节
        items.each((i, element) => {
            let href = $(element).find("a").attr("href");
            let title = $(element)
                .find("a")
                .text()
                .replace(/[ ]|\n/g, "");
            nzjUrl.push({
                url: `https://m.biquge.com.cn${href}`,
                title,
            });
        });

        // 章节url
        let fenyeZhangjieItems = $(".middle option");

        // 最新章节
        fenyeZhangjieItems.each((i, element) => {
            let href = $(element).attr("value");
            let title = $(element)
                .text()
                .replace(/[ ]|\n/g, "");
            fyzjUrl.push({
                url: `https://m.biquge.com.cn${href}`,
                title,
            });
        });

        dataList = {
            nzjUrl,
            fyzjUrl,
        };

        await page.close();
        await ctx.app.pool.releaseHs(brower);
        return dataList;
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};

const zhangjieDetail = async (ctx, search) => {
    let dataList = [];
    const reOptions = await ctx.app.gotoUrl(search.url);
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;

    try {
        // 找到封面跟url
        let items = $(".chapter").eq(1).find("li");
        // 最新章节
        items.each((i, element) => {
            let href = $(element).find("a").attr("href");
            let title = $(element)
                .find("a")
                .text()
                .replace(/[ ]|\n/g, "");
            dataList.push({
                url: `https://m.biquge.com.cn${href}`,
                title,
            });
        });

        await page.close();
        await ctx.app.pool.releaseHs(brower);
        return dataList;
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};

module.exports = {
    serachXiaoshuo,
    biqugeSearch,
    xiaoshuozhangjie,
    zhangjieDetail,
};
