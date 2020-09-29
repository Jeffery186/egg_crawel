//http://www.kukan6.com/index.php?s=searhc-index-wd-%E9%95%87%E9%AD%82%E8%A1%97-sid-1 搜索 酷看网

const cheerio = require("cheerio");
const { xorWith } = require("lodash");
const axios = require("axios").default;
const userAgent = require("../util/user_agents");
// const getZiyuan = async (ctx, search) => {
//     let url = ctx.app.mapZiyuan[search.key]["view"].replace("${page}", search.page).replace("${id}", search.id);

//     let dataList = [];
//     const reOptions = await ctx.app.gotoUrl(url);
//     if (!reOptions) return;
//     const $ = reOptions.$;
//     const page = reOptions.page;
//     const brower = reOptions.brower;
//     try {
//         let items;
//         if (search.key === "wolongzy") {
//             // 卧龙资源网
//             items = $(".videoContent li");
//             items.each((i, element) => {
//                 let url = `${ctx.app.mapZiyuan[search.key]["url"]}${$(element).find(".videoName").attr("href")}`;
//                 let title = $(element).find(".videoName").text();
//                 let type = $(element).find(".category").text();
//                 dataList.push({
//                     url,
//                     title,
//                     type,
//                 });
//             });
//         } else {
//             items = $(".xing_vb4");
//             items.each((i, element) => {
//                 let url = `${ctx.app.mapZiyuan[search.key]["url"]}${$(element).find("a").attr("href")}`;
//                 let title = $(element).find("a").text();
//                 let type = $(element).next().text();
//                 dataList.push({
//                     url,
//                     title,
//                     type,
//                 });
//             });
//         }

//         await page.close();
//         await ctx.app.pool.releaseHs(brower);
//         return dataList;
//     } catch (error) {
//         console.log(error);
//         await page.close();
//         await ctx.app.pool.releaseHs(brower);
//     }
// };

// const getNewZiyuan = async (ctx, search) => {
//     let url = ctx.app.mapZiyuan[search.key]["new"].replace("${page}", search.page);

//     let dataList = [];
//     const reOptions = await ctx.app.gotoUrl(url);
//     if (!reOptions) return;
//     const $ = reOptions.$;
//     const page = reOptions.page;
//     const brower = reOptions.brower;
//     try {
//         let items;
//         if (search.key === "wolongzy") {
//             // 卧龙资源网
//             items = $(".videoContent li");
//             items.each((i, element) => {
//                 let url = `${ctx.app.mapZiyuan[search.key]["url"]}${$(element).find(".videoName").attr("href")}`;
//                 let title = $(element).find(".videoName").text();
//                 let type = $(element).find(".category").text();
//                 dataList.push({
//                     url,
//                     title,
//                     type,
//                 });
//             });
//         } else {
//             items = $(".xing_vb4");
//             items.each((i, element) => {
//                 let url = `${ctx.app.mapZiyuan[search.key]["url"]}${$(element).find("a").attr("href")}`;
//                 let title = $(element).find("a").text();
//                 let type = $(element).next().text();
//                 dataList.push({
//                     url,
//                     title,
//                     type,
//                 });
//             });
//         }

//         await page.close();
//         await ctx.app.pool.releaseHs(brower);
//         return dataList;
//     } catch (error) {
//         console.log(error);
//         await page.close();
//         await ctx.app.pool.releaseHs(brower);
//     }
// };

// const searchZiyuan = async (ctx, search) => {
//     if (!search.key) return [];
//     if (!ctx.app.mapZiyuan[search.key]["search"]) return [];
//     let url = ctx.app.mapZiyuan[search.key]["search"]
//         .replace("${page}", search.page)
//         .replace("${keywords}", encodeURI(search.keywords));

//     let dataList = [];
//     let response = await axios.get(url, {
//         headers: { "User-Agent": userAgent.random() },
//     });
//     const $ = cheerio.load(response.data, {
//         ignoreWhitespace: true,
//         normalizeWhitespace: true,
//     });

//     try {
//         let items;
//         if (search.key === "wolongzy") {
//             // 卧龙资源网
//             items = $(".videoContent li");
//             items.each((i, element) => {
//                 let url = `${ctx.app.mapZiyuan[search.key]["url"]}${$(element)
//                     .find(".videoName")
//                     .attr("href")}`;
//                 let title = $(element).find(".videoName").text();
//                 let type = $(element).find(".category").text();
//                 dataList.push({
//                     url,
//                     title,
//                     type,
//                 });
//             });
//         } else {
//             items = $(".xing_vb4");
//             items.each((i, element) => {
//                 let url = `${ctx.app.mapZiyuan[search.key]["url"]}${$(element)
//                     .find("a")
//                     .attr("href")}`;
//                 let title = $(element).find("a").text();
//                 let type = $(element).next().text();
//                 dataList.push({
//                     url,
//                     title,
//                     type,
//                 });
//             });
//         }

//         return dataList;
//     } catch (error) {
//         console.log(error);
//     }
// };

// const parseFilmGetData = async (ctx, search) => {
//     let dataList = [];
//     let response = await axios.get(search.url, {
//         headers: { "User-Agent": userAgent.random() },
//     });
//     const $ = cheerio.load(response.data, {
//         ignoreWhitespace: true,
//         normalizeWhitespace: true,
//     });
//     try {
//         let items = $(".warp");
//         switch (search.key) {
//             case "zuidazy":
//                 items.each((_i, element) => {
//                     let cover = $(element).find(".vodImg img").attr("src");
//                     let content = $(element).find(".vodplayinfo").eq(0).text();
//                     let title = $(element).find(".vodh h2").text();
//                     let qingxi = $(element).find(".vodh span").text();
//                     let pingfen = $(element).find(".vodh label").text();

//                     let daoyan = $(element).find(".vodinfobox li").eq(1).text();
//                     let zhuyan = $(element)
//                         .find(".vodinfobox li")
//                         .eq(2)

//                         .text();
//                     let leixing = $(element)
//                         .find(".vodinfobox li")
//                         .eq(3)

//                         .text();
//                     let diqu = $(element)
//                         .find(".vodinfobox li")
//                         .eq(4)

//                         .text();
//                     let yuyan = $(element)
//                         .find(".vodinfobox li")
//                         .eq(5)

//                         .text();
//                     let shangying = $(element)
//                         .find(".vodinfobox li")
//                         .eq(6)

//                         .text();
//                     let pianchang = $(element)
//                         .find(".vodinfobox li")
//                         .eq(7)

//                         .text();

//                     let videoList = [];
//                     $(element)
//                         .find("#play_2 li")
//                         .each((i, ele) => {
//                             videoList.push($(ele).find("input").attr("value"));
//                         });

//                     dataList.push({
//                         videoList,
//                         content,
//                         cover,
//                         title,
//                         qingxi,
//                         pingfen,
//                         daoyan,
//                         zhuyan,
//                         leixing,
//                         diqu,
//                         yuyan,
//                         shangying,
//                         pianchang,
//                     });
//                 });
//                 break;
//             case "okzy":
//                 items.each((i, element) => {
//                     let cover = $(element).find(".vodImg img").attr("src");
//                     let content = $(element).find(".vodplayinfo").eq(0).text();
//                     let title = $(element).find(".vodh h2").text();
//                     let qingxi = $(element).find(".vodh span").text();
//                     let pingfen = $(element).find(".vodh label").text();

//                     let daoyan = $(element)
//                         .find(".vodinfobox li")
//                         .eq(1)

//                         .text();
//                     let zhuyan = $(element)
//                         .find(".vodinfobox li")
//                         .eq(2)

//                         .text();
//                     let leixing = $(element)
//                         .find(".vodinfobox li")
//                         .eq(3)

//                         .text();
//                     let diqu = $(element)
//                         .find(".vodinfobox li")
//                         .eq(4)

//                         .text();
//                     let yuyan = $(element)
//                         .find(".vodinfobox li")
//                         .eq(5)

//                         .text();
//                     let shangying = $(element)
//                         .find(".vodinfobox li")
//                         .eq(6)

//                         .text();
//                     let pianchang = $(element)
//                         .find(".vodinfobox li")
//                         .eq(7)

//                         .text();

//                     let videoList = [];

//                     $(element)
//                         .find(".vodplayinfo ul")
//                         .first()
//                         .find("li")
//                         .each((i, ele) => {
//                             videoList.push($(ele).find("input").attr("value"));
//                         });

//                     dataList.push({
//                         videoList,
//                         content,
//                         cover,
//                         title,
//                         qingxi,
//                         pingfen,
//                         daoyan,
//                         zhuyan,
//                         leixing,
//                         diqu,
//                         yuyan,
//                         shangying,
//                         pianchang,
//                     });
//                 });
//                 break;
//             case "subo":
//                 items.each((i, element) => {
//                     let cover = $(element).find(".vodImg img").attr("src");
//                     let content = $(element).find(".vodplayinfo").eq(1).text();
//                     let title = $(element).find(".vodh h2").text();
//                     let qingxi = $(element).find(".vodh span").text();
//                     let pingfen = $(element).find(".vodh label").text();

//                     let daoyan = $(element)
//                         .find(".vodinfobox li")
//                         .eq(1)

//                         .text();
//                     let zhuyan = $(element)
//                         .find(".vodinfobox li")
//                         .eq(2)

//                         .text();
//                     let leixing = $(element)
//                         .find(".vodinfobox li")
//                         .eq(3)

//                         .text();
//                     let diqu = $(element)
//                         .find(".vodinfobox li")
//                         .eq(4)

//                         .text();
//                     let yuyan = $(element)
//                         .find(".vodinfobox li")
//                         .eq(5)

//                         .text();
//                     let shangying = $(element)
//                         .find(".vodinfobox li")
//                         .eq(6)

//                         .text();
//                     let pianchang = $(element)
//                         .find(".vodinfobox li")
//                         .eq(7)

//                         .text();

//                     let videoList = [];

//                     $(element)
//                         .find(".vodplayinfo ul")
//                         .eq(1)
//                         .find("li")
//                         .each((i, ele) => {
//                             videoList.push($(ele).find("input").attr("value"));
//                         });

//                     dataList.push({
//                         videoList,
//                         content,
//                         cover,
//                         title,
//                         qingxi,
//                         pingfen,
//                         daoyan,
//                         zhuyan,
//                         leixing,
//                         diqu,
//                         yuyan,
//                         shangying,
//                         pianchang,
//                     });
//                 });
//                 break;
//             case "mahuazy":
//                 items.each((i, element) => {
//                     let cover = $(element).find(".vodImg img").attr("src");
//                     let content = $(element).find(".vodplayinfo").eq(0).text();
//                     let title = $(element).find(".vodh h2").text();
//                     let qingxi = $(element).find(".vodh span").text();
//                     let pingfen = $(element).find(".vodh label").text();

//                     let daoyan = $(element)
//                         .find(".vodinfobox li")
//                         .eq(1)

//                         .text();
//                     let zhuyan = $(element)
//                         .find(".vodinfobox li")
//                         .eq(2)

//                         .text();
//                     let leixing = $(element)
//                         .find(".vodinfobox li")
//                         .eq(3)

//                         .text();
//                     let diqu = $(element)
//                         .find(".vodinfobox li")
//                         .eq(4)

//                         .text();
//                     let yuyan = $(element)
//                         .find(".vodinfobox li")
//                         .eq(5)

//                         .text();
//                     let shangying = $(element)
//                         .find(".vodinfobox li")
//                         .eq(6)

//                         .text();
//                     let pianchang = $(element)
//                         .find(".vodinfobox li")
//                         .eq(7)

//                         .text();

//                     let videoList = [];

//                     $(element)
//                         .find("#play_1 ul")
//                         .find("li")
//                         .each((i, ele) => {
//                             videoList.push($(ele).find("input").attr("value"));
//                         });

//                     dataList.push({
//                         videoList,
//                         content,
//                         cover,
//                         title,
//                         qingxi,
//                         pingfen,
//                         daoyan,
//                         zhuyan,
//                         leixing,
//                         diqu,
//                         yuyan,
//                         shangying,
//                         pianchang,
//                     });
//                 });
//                 break;
//             case "zuixinzy":
//                 items.each((i, element) => {
//                     let cover = $(element).find(".vodImg img").attr("src");
//                     let content = $(element).find(".vodplayinfo").eq(0).text();
//                     let title = $(element).find(".vodh h2").text();
//                     let qingxi = $(element).find(".vodh span").text();
//                     let pingfen = $(element).find(".vodh label").text();

//                     let daoyan = $(element)
//                         .find(".vodinfobox li")
//                         .eq(1)

//                         .text();
//                     let zhuyan = $(element)
//                         .find(".vodinfobox li")
//                         .eq(2)

//                         .text();
//                     let leixing = $(element)
//                         .find(".vodinfobox li")
//                         .eq(3)

//                         .text();
//                     let diqu = $(element)
//                         .find(".vodinfobox li")
//                         .eq(4)

//                         .text();
//                     let yuyan = $(element)
//                         .find(".vodinfobox li")
//                         .eq(5)

//                         .text();
//                     let shangying = $(element)
//                         .find(".vodinfobox li")
//                         .eq(6)

//                         .text();
//                     let pianchang = $(element)
//                         .find(".vodinfobox li")
//                         .eq(7)

//                         .text();

//                     let videoList = [];

//                     $(element)
//                         .find(".vodplayinfo ul")
//                         .eq(0)
//                         .find("li")
//                         .each((i, ele) => {
//                             videoList.push($(ele).find("input").attr("value"));
//                         });

//                     dataList.push({
//                         videoList,
//                         content,
//                         cover,
//                         title,
//                         qingxi,
//                         pingfen,
//                         daoyan,
//                         zhuyan,
//                         leixing,
//                         diqu,
//                         yuyan,
//                         shangying,
//                         pianchang,
//                     });
//                 });
//                 break;
//             case "135zy":
//                 items.each((i, element) => {
//                     let cover = $(element).find(".vodImg img").attr("src");
//                     let content = $(element).find(".vodplayinfo").eq(0).text();
//                     let title = $(element).find(".vodh h2").text();
//                     let qingxi = $(element).find(".vodh span").text();
//                     let pingfen = $(element).find(".vodh label").text();

//                     let daoyan = $(element)
//                         .find(".vodinfobox li")
//                         .eq(1)

//                         .text();
//                     let zhuyan = $(element)
//                         .find(".vodinfobox li")
//                         .eq(2)

//                         .text();
//                     let leixing = $(element)
//                         .find(".vodinfobox li")
//                         .eq(3)

//                         .text();
//                     let diqu = $(element)
//                         .find(".vodinfobox li")
//                         .eq(4)

//                         .text();
//                     let yuyan = $(element)
//                         .find(".vodinfobox li")
//                         .eq(5)

//                         .text();
//                     let shangying = $(element)
//                         .find(".vodinfobox li")
//                         .eq(6)

//                         .text();
//                     let pianchang = $(element)
//                         .find(".vodinfobox li")
//                         .eq(7)

//                         .text();

//                     let videoList = [];

//                     $(element)
//                         .find(".vodplayinfo ul")
//                         .eq(0)
//                         .find("li")
//                         .each((i, ele) => {
//                             videoList.push($(ele).find("input").attr("value"));
//                         });

//                     dataList.push({
//                         videoList,
//                         content,
//                         cover,
//                         title,
//                         qingxi,
//                         pingfen,
//                         daoyan,
//                         zhuyan,
//                         leixing,
//                         diqu,
//                         yuyan,
//                         shangying,
//                         pianchang,
//                     });
//                 });
//                 break;
//             case "123ku":
//                 items.each((i, element) => {
//                     let cover = $(element).find(".vodImg img").attr("src");
//                     let content = $(element).find(".vodplayinfo").eq(1).text();
//                     let title = $(element).find(".vodh h2").text();
//                     let qingxi = $(element).find(".vodh span").text();
//                     let pingfen = $(element).find(".vodh label").text();

//                     let daoyan = $(element)
//                         .find(".vodinfobox li")
//                         .eq(1)

//                         .text();
//                     let zhuyan = $(element)
//                         .find(".vodinfobox li")
//                         .eq(2)

//                         .text();
//                     let leixing = $(element)
//                         .find(".vodinfobox li")
//                         .eq(3)

//                         .text();
//                     let diqu = $(element)
//                         .find(".vodinfobox li")
//                         .eq(4)

//                         .text();
//                     let yuyan = $(element)
//                         .find(".vodinfobox li")
//                         .eq(5)

//                         .text();
//                     let shangying = $(element)
//                         .find(".vodinfobox li")
//                         .eq(6)

//                         .text();
//                     let pianchang = $(element)
//                         .find(".vodinfobox li")
//                         .eq(7)

//                         .text();

//                     let videoList = [];

//                     $(element)
//                         .find("#play_2 ul")
//                         .find("li")
//                         .each((i, ele) => {
//                             videoList.push($(ele).find("input").attr("value"));
//                         });

//                     dataList.push({
//                         videoList,
//                         content,
//                         cover,
//                         title,
//                         qingxi,
//                         pingfen,
//                         daoyan,
//                         zhuyan,
//                         leixing,
//                         diqu,
//                         yuyan,
//                         shangying,
//                         pianchang,
//                     });
//                 });
//                 break;
//             default:
//                 break;
//         }

//         // await page.close();
//         // await ctx.app.pool.releaseHs(brower);
//         dataList[0].url = search.url;
//         return dataList;
//     } catch (error) {
//         console.log(error);
//         // await page.close();
//         // await ctx.app.pool.releaseHs(brower);
//     }
// };

const searchZiyuan = async (ctx, search) => {
    if (!search.keywords) return [];
    let url = `http://www.kukan6.com/index.php?s=search-index-wd-${encodeURI(search.keywords)}-sid-1`;

    let dataList = [];
    let response = await axios.get(url, {
        headers: { "User-Agent": userAgent.random() },
    });
    const $ = cheerio.load(response.data, {
        ignoreWhitespace: true,
        normalizeWhitespace: true,
    });

    try {
        let items = $(".show-list li");
        items.each((i, element) => {
            let url = `http://www.kukan6.com${$(element).find(".play-img").attr("href")}`;
            let title = $(element).find("h5 a").text();
            let cover = $(element).find("img").attr("src");
            dataList.push({
                url,
                title,
                cover,
            });
        });

        return dataList;
    } catch (error) {
        console.log(error);
    }
};

const getHotZiyuan = async (ctx) => {
    let dataList = [];
    let result = await ctx.app.redis.get("http://www.kukan6.com/");
    if (result) {
        dataList = JSON.parse(result);
        return dataList;
    } else {
        const reOptions = await ctx.app.gotoUrl("http://www.kukan6.com/");
        if (!reOptions) return;
        const $ = reOptions.$;
        const page = reOptions.page;
        const brower = reOptions.brower;
        try {
            let types = $("#latest-focus li[id^=latest] span");
            types.each((i, element) => {
                let playlists = $(`#latest-focus div[id^=con_latest_${i + 1}] .play-img`);
                let playArray = [];
                playlists.each((i, element) => {
                    let herf = $(element).attr("href");
                    let cover = $(element).find("img").attr("src");
                    if (cover.indexOf("http") === -1) {
                        cover = $(element).find("img").attr("data-original");
                    }
                    let title = $(element).parent().find("h3 a").text();
                    let gengxin = $(element).find(".text").text();
                    playArray.push({
                        url: `http://www.kukan6.com${herf}`,
                        title,
                        cover,
                        gengxin,
                    });
                });

                dataList.push({
                    type: $(element).text(),
                    playlist: playArray,
                });
            });

            await ctx.app.redis.set("http://www.kukan6.com/", JSON.stringify(dataList), "EX", 86400);

            await page.close();
            await ctx.app.pool.releaseHs(brower);
            return dataList;
        } catch (error) {
            console.log(error);
            await page.close();
            await ctx.app.pool.releaseHs(brower);
        }
    }
};

const getHotZyDetail = async (ctx, search) => {
    let dataList = [];
    const reOptions = await ctx.app.gotoUrl(search.url);
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let items = $("#content");
        items.each((i, element) => {
            let title = $(element).find(".detail-title h1").text();
            let zhuyanList = [];
            $(element)
                .find(".detail-info dl")
                .eq(0)
                .find("a")
                .each((i, ele) => {
                    zhuyanList.push($(ele).text());
                });

            let zhuyan = `主演：${zhuyanList.join(" ")}`;
            let leixingList = [];
            $(element)
                .find(".detail-info dl")
                .eq(2)
                .find("a")
                .each((i, ele) => {
                    leixingList.push($(ele).text());
                });

            let leixing = `类型：${leixingList.join(" ")}`;
            let pingfen = $(element).find("#pingfen2").text();
            let diqu = $(element).find(".detail-info dl").eq(3).text();
            let yuyan = $(element).find(".detail-info dl").eq(4).text();
            let daoyan = $(element).find(".detail-info dl").eq(5).text();
            let content = $(element)
                .find(".detail-info dl")
                .eq(9)
                .text()
                .replace("详细剧情", "")
                .replace(/[ ]|\n/g, "");
            let cover = $(element).find(".detail-cols img").attr("src");

            let videoList = [];
            $("#ckm3u8-pl-list .player_list a").each((i, ele) => {
                let list = `http://www.kukan6.com${$(ele).attr("href")}`;
                videoList.push(list);
            });
            if (videoList.length === 0) {
                $("#kuyun-pl-list .player_list a").each((i, ele) => {
                    let list = `http://www.kukan6.com${$(ele).attr("href")}`;
                    videoList.push(list);
                });
            }

            dataList.push({
                videoList,
                content,
                cover,
                title,
                pingfen,
                daoyan,
                zhuyan,
                leixing,
                diqu,
                yuyan,
                url: search.url,
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

const getVideoList = async (url) => {
    // 在发起其他内容
    let response = await axios.get(url, {
        headers: { "User-Agent": userAgent.random() },
    });
    const $video = cheerio.load(response.data, {
        ignoreWhitespace: true,
        normalizeWhitespace: true,
    });

    let videoText = $video("#play-focus script").html();
    let chapterImagesReg1 = /"https:(.*?)\"/g;
    if (chapterImagesReg1.exec(videoText)) {
        let execContent = chapterImagesReg1.exec(videoText)[0];
        let chapterImages = execContent.replace(/\"|\\/g, "");
        return chapterImages;
    }
    return "";
};

module.exports = {
    getHotZyDetail,
    searchZiyuan,
    getHotZiyuan,
    getVideoList,
};
