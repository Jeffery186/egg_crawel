const cheerio = require("cheerio");
const axios = require("axios");
const userAgent = require("../util/user_agents");
const getZiyuan = async (ctx, search) => {
    let url = ctx.app.mapZiyuan[search.key]["view"]
        .replace("${page}", search.page)
        .replace("${id}", search.id);

    let dataList = [];
    const reOptions = await ctx.app.gotoUrl(url);
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let items;
        if (search.key === "wolongzy") {
            // 卧龙资源网
            items = $(".videoContent li");
            items.each((i, element) => {
                let url = `${ctx.app.mapZiyuan[search.key]["url"]}${$(element)
                    .find(".videoName")
                    .attr("href")}`;
                let title = $(element).find(".videoName").text();
                let type = $(element).find(".category").text();
                dataList.push({
                    url,
                    title,
                    type,
                });
            });
        } else {
            items = $(".xing_vb4");
            items.each((i, element) => {
                let url = `${ctx.app.mapZiyuan[search.key]["url"]}${$(element)
                    .find("a")
                    .attr("href")}`;
                let title = $(element).find("a").text();
                let type = $(element).next().text();
                dataList.push({
                    url,
                    title,
                    type,
                });
            });
        }

        await page.close();
        await ctx.app.pool.releaseHs(brower);
        return dataList;
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};

const getNewZiyuan = async (ctx, search) => {
    let url = ctx.app.mapZiyuan[search.key]["new"].replace(
        "${page}",
        search.page
    );

    let dataList = [];
    const reOptions = await ctx.app.gotoUrl(url);
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let items;
        if (search.key === "wolongzy") {
            // 卧龙资源网
            items = $(".videoContent li");
            items.each((i, element) => {
                let url = `${ctx.app.mapZiyuan[search.key]["url"]}${$(element)
                    .find(".videoName")
                    .attr("href")}`;
                let title = $(element).find(".videoName").text();
                let type = $(element).find(".category").text();
                dataList.push({
                    url,
                    title,
                    type,
                });
            });
        } else {
            items = $(".xing_vb4");
            items.each((i, element) => {
                let url = `${ctx.app.mapZiyuan[search.key]["url"]}${$(element)
                    .find("a")
                    .attr("href")}`;
                let title = $(element).find("a").text();
                let type = $(element).next().text();
                dataList.push({
                    url,
                    title,
                    type,
                });
            });
        }

        await page.close();
        await ctx.app.pool.releaseHs(brower);
        return dataList;
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};

const searchZiyuan = async (ctx, search) => {
    if (!search.key) return [];
    if (!ctx.app.mapZiyuan[search.key]["search"]) return [];
    let url = ctx.app.mapZiyuan[search.key]["search"]
        .replace("${page}", search.page)
        .replace("${keywords}", encodeURI(search.keywords));

    let dataList = [];
    let response = await axios.get(url, {
        headers: { "User-Agent": userAgent.random() },
    });
    const $ = cheerio.load(response.data, {
        ignoreWhitespace: true,
        normalizeWhitespace: true,
    });

    try {
        let items;
        if (search.key === "wolongzy") {
            // 卧龙资源网
            items = $(".videoContent li");
            items.each((i, element) => {
                let url = `${ctx.app.mapZiyuan[search.key]["url"]}${$(element)
                    .find(".videoName")
                    .attr("href")}`;
                let title = $(element).find(".videoName").text();
                let type = $(element).find(".category").text();
                dataList.push({
                    url,
                    title,
                    type,
                });
            });
        } else {
            items = $(".xing_vb4");
            items.each((i, element) => {
                let url = `${ctx.app.mapZiyuan[search.key]["url"]}${$(element)
                    .find("a")
                    .attr("href")}`;
                let title = $(element).find("a").text();
                let type = $(element).next().text();
                dataList.push({
                    url,
                    title,
                    type,
                });
            });
        }

        return dataList;
    } catch (error) {
        console.log(error);
    }
};

const parseFilmGetData = async (ctx, search) => {
    let dataList = [];
    let response = await axios.get(search.url, {
        headers: { "User-Agent": userAgent.random() },
    });
    const $ = cheerio.load(response.data, {
        ignoreWhitespace: true,
        normalizeWhitespace: true,
    });
    try {
        let items = $(".warp");
        switch (search.key) {
            case "zuidazy":
                items.each((i, element) => {
                    let cover = $(element).find(".vodImg img").attr("src");
                    let content = $(element).find(".vodplayinfo").eq(0).text();
                    let title = $(element).find(".vodh h2").text();
                    let qingxi = $(element).find(".vodh span").text();
                    let pingfen = $(element).find(".vodh label").text();

                    let daoyan = $(element).find(".vodinfobox li").eq(1).text();
                    let zhuyan = $(element)
                        .find(".vodinfobox li")
                        .eq(2)

                        .text();
                    let leixing = $(element)
                        .find(".vodinfobox li")
                        .eq(3)

                        .text();
                    let diqu = $(element)
                        .find(".vodinfobox li")
                        .eq(4)

                        .text();
                    let yuyan = $(element)
                        .find(".vodinfobox li")
                        .eq(5)

                        .text();
                    let shangying = $(element)
                        .find(".vodinfobox li")
                        .eq(6)

                        .text();
                    let pianchang = $(element)
                        .find(".vodinfobox li")
                        .eq(7)

                        .text();

                    let videoList = [];
                    $(element)
                        .find("#play_2 li")
                        .each((i, ele) => {
                            videoList.push($(ele).find("input").attr("value"));
                        });

                    dataList.push({
                        videoList,
                        content,
                        cover,
                        title,
                        qingxi,
                        pingfen,
                        daoyan,
                        zhuyan,
                        leixing,
                        diqu,
                        yuyan,
                        shangying,
                        pianchang,
                    });
                });
                break;
            case "okzy":
                items.each((i, element) => {
                    let cover = $(element).find(".vodImg img").attr("src");
                    let content = $(element).find(".vodplayinfo").eq(0).text();
                    let title = $(element).find(".vodh h2").text();
                    let qingxi = $(element).find(".vodh span").text();
                    let pingfen = $(element).find(".vodh label").text();

                    let daoyan = $(element)
                        .find(".vodinfobox li")
                        .eq(1)

                        .text();
                    let zhuyan = $(element)
                        .find(".vodinfobox li")
                        .eq(2)

                        .text();
                    let leixing = $(element)
                        .find(".vodinfobox li")
                        .eq(3)

                        .text();
                    let diqu = $(element)
                        .find(".vodinfobox li")
                        .eq(4)

                        .text();
                    let yuyan = $(element)
                        .find(".vodinfobox li")
                        .eq(5)

                        .text();
                    let shangying = $(element)
                        .find(".vodinfobox li")
                        .eq(6)

                        .text();
                    let pianchang = $(element)
                        .find(".vodinfobox li")
                        .eq(7)

                        .text();

                    let videoList = [];

                    $(element)
                        .find(".vodplayinfo ul")
                        .first()
                        .find("li")
                        .each((i, ele) => {
                            videoList.push($(ele).find("input").attr("value"));
                        });

                    dataList.push({
                        videoList,
                        content,
                        cover,
                        title,
                        qingxi,
                        pingfen,
                        daoyan,
                        zhuyan,
                        leixing,
                        diqu,
                        yuyan,
                        shangying,
                        pianchang,
                    });
                });
                break;
            case "subo":
                items.each((i, element) => {
                    let cover = $(element).find(".vodImg img").attr("src");
                    let content = $(element).find(".vodplayinfo").eq(1).text();
                    let title = $(element).find(".vodh h2").text();
                    let qingxi = $(element).find(".vodh span").text();
                    let pingfen = $(element).find(".vodh label").text();

                    let daoyan = $(element)
                        .find(".vodinfobox li")
                        .eq(1)

                        .text();
                    let zhuyan = $(element)
                        .find(".vodinfobox li")
                        .eq(2)

                        .text();
                    let leixing = $(element)
                        .find(".vodinfobox li")
                        .eq(3)

                        .text();
                    let diqu = $(element)
                        .find(".vodinfobox li")
                        .eq(4)

                        .text();
                    let yuyan = $(element)
                        .find(".vodinfobox li")
                        .eq(5)

                        .text();
                    let shangying = $(element)
                        .find(".vodinfobox li")
                        .eq(6)

                        .text();
                    let pianchang = $(element)
                        .find(".vodinfobox li")
                        .eq(7)

                        .text();

                    let videoList = [];

                    $(element)
                        .find(".vodplayinfo ul")
                        .eq(1)
                        .find("li")
                        .each((i, ele) => {
                            videoList.push($(ele).find("input").attr("value"));
                        });

                    dataList.push({
                        videoList,
                        content,
                        cover,
                        title,
                        qingxi,
                        pingfen,
                        daoyan,
                        zhuyan,
                        leixing,
                        diqu,
                        yuyan,
                        shangying,
                        pianchang,
                    });
                });
                break;
            case "mahuazy":
                items.each((i, element) => {
                    let cover = $(element).find(".vodImg img").attr("src");
                    let content = $(element).find(".vodplayinfo").eq(0).text();
                    let title = $(element).find(".vodh h2").text();
                    let qingxi = $(element).find(".vodh span").text();
                    let pingfen = $(element).find(".vodh label").text();

                    let daoyan = $(element)
                        .find(".vodinfobox li")
                        .eq(1)

                        .text();
                    let zhuyan = $(element)
                        .find(".vodinfobox li")
                        .eq(2)

                        .text();
                    let leixing = $(element)
                        .find(".vodinfobox li")
                        .eq(3)

                        .text();
                    let diqu = $(element)
                        .find(".vodinfobox li")
                        .eq(4)

                        .text();
                    let yuyan = $(element)
                        .find(".vodinfobox li")
                        .eq(5)

                        .text();
                    let shangying = $(element)
                        .find(".vodinfobox li")
                        .eq(6)

                        .text();
                    let pianchang = $(element)
                        .find(".vodinfobox li")
                        .eq(7)

                        .text();

                    let videoList = [];

                    $(element)
                        .find("#play_1 ul")
                        .find("li")
                        .each((i, ele) => {
                            videoList.push($(ele).find("input").attr("value"));
                        });

                    dataList.push({
                        videoList,
                        content,
                        cover,
                        title,
                        qingxi,
                        pingfen,
                        daoyan,
                        zhuyan,
                        leixing,
                        diqu,
                        yuyan,
                        shangying,
                        pianchang,
                    });
                });
                break;
            case "zuixinzy":
                items.each((i, element) => {
                    let cover = $(element).find(".vodImg img").attr("src");
                    let content = $(element).find(".vodplayinfo").eq(0).text();
                    let title = $(element).find(".vodh h2").text();
                    let qingxi = $(element).find(".vodh span").text();
                    let pingfen = $(element).find(".vodh label").text();

                    let daoyan = $(element)
                        .find(".vodinfobox li")
                        .eq(1)

                        .text();
                    let zhuyan = $(element)
                        .find(".vodinfobox li")
                        .eq(2)

                        .text();
                    let leixing = $(element)
                        .find(".vodinfobox li")
                        .eq(3)

                        .text();
                    let diqu = $(element)
                        .find(".vodinfobox li")
                        .eq(4)

                        .text();
                    let yuyan = $(element)
                        .find(".vodinfobox li")
                        .eq(5)

                        .text();
                    let shangying = $(element)
                        .find(".vodinfobox li")
                        .eq(6)

                        .text();
                    let pianchang = $(element)
                        .find(".vodinfobox li")
                        .eq(7)

                        .text();

                    let videoList = [];

                    $(element)
                        .find(".vodplayinfo ul")
                        .eq(0)
                        .find("li")
                        .each((i, ele) => {
                            videoList.push($(ele).find("input").attr("value"));
                        });

                    dataList.push({
                        videoList,
                        content,
                        cover,
                        title,
                        qingxi,
                        pingfen,
                        daoyan,
                        zhuyan,
                        leixing,
                        diqu,
                        yuyan,
                        shangying,
                        pianchang,
                    });
                });
                break;
            case "135zy":
                items.each((i, element) => {
                    let cover = $(element).find(".vodImg img").attr("src");
                    let content = $(element).find(".vodplayinfo").eq(0).text();
                    let title = $(element).find(".vodh h2").text();
                    let qingxi = $(element).find(".vodh span").text();
                    let pingfen = $(element).find(".vodh label").text();

                    let daoyan = $(element)
                        .find(".vodinfobox li")
                        .eq(1)

                        .text();
                    let zhuyan = $(element)
                        .find(".vodinfobox li")
                        .eq(2)

                        .text();
                    let leixing = $(element)
                        .find(".vodinfobox li")
                        .eq(3)

                        .text();
                    let diqu = $(element)
                        .find(".vodinfobox li")
                        .eq(4)

                        .text();
                    let yuyan = $(element)
                        .find(".vodinfobox li")
                        .eq(5)

                        .text();
                    let shangying = $(element)
                        .find(".vodinfobox li")
                        .eq(6)

                        .text();
                    let pianchang = $(element)
                        .find(".vodinfobox li")
                        .eq(7)

                        .text();

                    let videoList = [];

                    $(element)
                        .find(".vodplayinfo ul")
                        .eq(0)
                        .find("li")
                        .each((i, ele) => {
                            videoList.push($(ele).find("input").attr("value"));
                        });

                    dataList.push({
                        videoList,
                        content,
                        cover,
                        title,
                        qingxi,
                        pingfen,
                        daoyan,
                        zhuyan,
                        leixing,
                        diqu,
                        yuyan,
                        shangying,
                        pianchang,
                    });
                });
                break;
            case "123ku":
                items.each((i, element) => {
                    let cover = $(element).find(".vodImg img").attr("src");
                    let content = $(element).find(".vodplayinfo").eq(1).text();
                    let title = $(element).find(".vodh h2").text();
                    let qingxi = $(element).find(".vodh span").text();
                    let pingfen = $(element).find(".vodh label").text();

                    let daoyan = $(element)
                        .find(".vodinfobox li")
                        .eq(1)

                        .text();
                    let zhuyan = $(element)
                        .find(".vodinfobox li")
                        .eq(2)

                        .text();
                    let leixing = $(element)
                        .find(".vodinfobox li")
                        .eq(3)

                        .text();
                    let diqu = $(element)
                        .find(".vodinfobox li")
                        .eq(4)

                        .text();
                    let yuyan = $(element)
                        .find(".vodinfobox li")
                        .eq(5)

                        .text();
                    let shangying = $(element)
                        .find(".vodinfobox li")
                        .eq(6)

                        .text();
                    let pianchang = $(element)
                        .find(".vodinfobox li")
                        .eq(7)

                        .text();

                    let videoList = [];

                    $(element)
                        .find("#play_2 ul")
                        .find("li")
                        .each((i, ele) => {
                            videoList.push($(ele).find("input").attr("value"));
                        });

                    dataList.push({
                        videoList,
                        content,
                        cover,
                        title,
                        qingxi,
                        pingfen,
                        daoyan,
                        zhuyan,
                        leixing,
                        diqu,
                        yuyan,
                        shangying,
                        pianchang,
                    });
                });
                break;
            default:
                break;
        }

        // await page.close();
        // await ctx.app.pool.releaseHs(brower);
        dataList[0].url = search.url;
        return dataList;
    } catch (error) {
        console.log(error);
        // await page.close();
        // await ctx.app.pool.releaseHs(brower);
    }
};

module.exports = {
    getZiyuan,
    getNewZiyuan,
    searchZiyuan,
    parseFilmGetData,
};
