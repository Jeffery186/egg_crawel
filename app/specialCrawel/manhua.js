const cheerio = require("cheerio");
const axios = require("axios");
const userAgent = require("../util/user_agents");
const { Feed } = require("feed");
const fs = require("fs").promises;
const path = require("path");

// 古风漫画 https://m.gufengmh8.com/search/?keywords=%E9%95%87%E9%AD%82%E8%A1%97
const searchManHua = async (ctx, search) => {
    let dataList = [];
    const reOptions = await ctx.app.gotoUrl(
        `https://m.gufengmh8.com/search/?keywords=${search.keywords}`
    );
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;

    try {
        // 找到封面跟url
        let items = $("#update_list .UpdateList .itemBox");
        items.each((i, element) => {
            let url = $(element).find(".itemTxt a").attr("href");
            let title = $(element).find(".itemTxt a").text();
            let author = $(element).find(".txtItme").eq(0).text();
            let cover = $(element).find("a img").attr("src");
            dataList.push({
                url,
                title,
                author,
                cover,
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

const detailManHua = async (ctx, search) => {
    let dataList = {};
    const reOptions = await ctx.app.gotoUrl(search.url);
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        // let response = await axios.get(search.url, {
        //     headers: { "User-Agent": userAgent.random() },
        // });
        // const $ = cheerio.load(response.data, {
        //     ignoreWhitespace: true,
        //     normalizeWhitespace: true,
        // });

        // 找到sub
        let cover = $("#Cover mip-img img").attr("src");
        let sub = $(".comic-view .pic .pic_zi");
        let gengxin = sub
            .eq(0)
            .text()
            .replace(/[ ]|\n|\t/g, "");
        let author = sub
            .eq(1)
            .text()
            .replace(/[ ]|\n|\t/g, "");
        let leixing = sub
            .eq(2)
            .text()
            .replace(/[ ]|\n|\t/g, "");
        let gengxinTime = sub
            .eq(3)
            .text()
            .replace(/[ ]|\n|\t/g, "");
        let content = $(".comic-view p").text();

        let catlogs = [];
        let cat = [];

        let items = $(".comic-view .Drama li");
        items.each((i, element) => {
            let url = `https://m.gufengmh8.com/${$(element)
                .find("a")
                .attr("href")}`;
            let text = $(element).find("span").text();

            catlogs.push({
                url,
                text,
            });
        });

        dataList = {
            url: search.url,
            cover,
            gengxin,
            author,
            leixing,
            gengxinTime,
            content,
            catlogs,
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

const getImages = async (ctx, search) => {
    let dataList = [];
    // const reOptions = await ctx.app.gotoUrl(search.url);
    // if (!reOptions) return;
    // const $ = reOptions.$;
    // const page = reOptions.page;
    // const brower = reOptions.brower;
    try {
        let response = await axios.get(search.url, {
            headers: { "User-Agent": userAgent.random() },
        });
        // const $ = cheerio.load(response.data, {
        //     ignoreWhitespace: true,
        //     normalizeWhitespace: true,
        // });

        // 找到sub
        let context = response.data;
        let chapterImagesReg1 = /chapterImages = \["(.*?)\"]/g;
        let chapterImages = chapterImagesReg1.exec(context)[1].split(",");

        let chapterImagesReg2 = /chapterPath = \"(.*?)\"/g;
        let chapterImagesPrev = chapterImagesReg2.exec(context)[1];
        chapterImages.map((res) => {
            dataList.push(
                `https://res.gufengmh8.com/${chapterImagesPrev}${res.replace(
                    /"/g,
                    ""
                )}`
            );
        });

        // await page.close();
        // await ctx.app.pool.releaseHs(brower);
        return dataList;
    } catch (error) {
        console.log(error);
        // await page.close();
        // await ctx.app.pool.releaseHs(brower);
    }
};

const manhuaRssHub = async (ctx, search) => {
    let queryData = [];
    ctx.app.logger.info("镇魂街 => begin");
    console.log("读取文件---------------------");
    let dataList = await detailManHua(ctx, search);

    // 处理catlog
    let cat1 = dataList.catlogs.slice(0, 225);
    let cat2 = dataList.catlogs.slice(399, 461);
    let cat3 = dataList.catlogs.slice(516, 521);
    let cat4 = dataList.catlogs.slice(693, dataList.catlogs.length);
    dataList.catlogs = cat1.concat(cat2).concat(cat3).concat(cat4);

    for (const key in dataList.catlogs) {
        if (dataList.catlogs.hasOwnProperty(key)) {
            const element = dataList.catlogs[key];
            let result = await getImages(ctx, {
                url: element.url,
            });

            queryData.push({
                url: element.url,
                imageData: result,
                title: element.text,
            });
        }
    }

    console.log("读取文件完毕---------------------");
    console.log("写入feed---------------------");

    const feed = new Feed({
        title: "镇魂街",
        description: dataList.content,
        link: "https://m.gufengmh8.com/manhua/zhenhunjie/",
        image:
            "https://res1.xiaoqinre.com/images/cover/201803/152163142220HF3w5eW_N74LRJ.jpg",
        copyright: "Copyright © 2020 Jws. All rights reserved",
    });

    for (var key in queryData) {
        for (let i = 0; i < queryData[key].imageData.length; i++) {
            queryData[key].imageData[
                i
            ] = `<p><img src="${queryData[key].imageData[i]}" alt="" title="" /></p>`;
        }
        feed.addItem({
            title: queryData[key].title,
            link: queryData[key].url,
            description: "",
            date: new Date(),
            content: queryData[key].imageData,
        });
    }

    const rssData = feed.atom1();
    console.log("写入feed完毕---------------------");
    global.appRoot = process.cwd();
    console.log("写入文件开始--------------");
    fs.writeFile(path.join(global.appRoot, "zhenhunjie.xml"), rssData)
        .then((res) => {
            console.log("写入文件成功----------------");
            ctx.app.logger.info("镇魂街 => end");
        })
        .catch((res) => {
            console.log("写入文件失败----------------");
            ctx.app.logger.info("镇魂街 => end");
        });
};

module.exports = { searchManHua, detailManHua, getImages, manhuaRssHub };
