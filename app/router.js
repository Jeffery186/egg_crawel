"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
    const { router, controller } = app;
    router.get("/getWxByName", controller.wxgzh.index);
    router.get("/getRssByUrl", controller.rss.index);
    router.get("/hotSearch", controller.hotsearch.index);
    router.get("/hotSearchRept", controller.hotsearch.getRepaName);
    router.get("/getSearchZiyuan", controller.okziyuan.search);
    router.get("/getDetailZiyuan", controller.okziyuan.detail);
    router.get("/getHotZiyuan", controller.okziyuan.getHotData);

    router.get("/getSearchManhua", controller.manhua.search);
    router.get("/getDetailManhua", controller.manhua.detail);
    router.get("/getImagesManhua", controller.manhua.getImages);
    router.get("/getSearchXiaishuo", controller.xiaoshuo.search);
    router.get("/getSearchXszj", controller.xiaoshuo.searchzhangjie);
    router.get("/getSearchXszjDetail", controller.xiaoshuo.zhangjieDetail);
    router.get("/getMhRssHub", controller.manhua.rssHub);
    router.get("/getMhRssHub1", controller.manhua.testRssHub);
};
