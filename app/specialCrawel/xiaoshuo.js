// 搜索 https://so.html5.qq.com/page/real/novel_result?t=2&entryScene=009&channel_id=25&q=万古神帝
// 详情 https://bookshelf.html5.qq.com/?t=native&ch=004645#!/catalog/1100648963&entryScene=009&channel_id=25&q=万古神帝
// 章节 https://bookshelf.html5.qq.com/api/migration/list_charpter?resourceid=1100648963&start=1&serialnum=2810&sort=asc&t=202007101626
//https://bookshelf.html5.qq.com/qbread/adread/chapter?resourceid=1100648963&serialid=207&ch=001312

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
                let title = $(element).find(".book-name span").text();
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

module.exports = { serachXiaoshuo };
