const axios = require("axios");
const cheerio = require("cheerio");

class rssNote {
    constructor() {}
    // 获取rss结果
    static async getRssResult(url) {
        let response = await axios.get(url);
        let $ = cheerio.load(response.data, {
            xmlMode: true,
        });
        let dataList = [];
        let items = $("entry");
        if (items.length === 0) {
            items = $("item");
            items.each((i, ele) => {
                let title = $(ele).find("title").text();
                let url = $(ele).find("link").text();
                dataList.push({
                    title,
                    url,
                });
            });
        } else {
            items.each((i, ele) => {
                let title = $(ele).find("title").text();
                let url = $(ele).find("link").attr("href");
                dataList.push({
                    title,
                    url,
                });
            });
        }

        return dataList;
    }
}

module.exports = rssNote;
