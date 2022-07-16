const Storage = require("../models/Storage");
const { verifyTokenAndStaff } = require("./verifyToken");
const router = require("express").Router();

router.get("/", verifyTokenAndStaff, async (req, res) => {
  try {
    const qPage = req.query.page;
    const qStatus = req.query.status;
    let perPage = 10; // số lượng sản phẩm xuất hiện trên 1 page
    let page = qPage || 1;
    let count = 0;

    try {
      let branches;
      if (qStatus === "import") {
        branches = await Storage.find({ status: "Import" })
          .skip(perPage * page - perPage)
          .limit(perPage);
        count = await Storage.find({ status: "Import" }).count();
      }
      if (qStatus === "export") {
        branches = await Storage.find({ status: "Export" })
          .skip(perPage * page - perPage)
          .limit(perPage);
        count = await Storage.find({ status: "Export" }).count();
      }
      res.status(200).json({
        branches, // sản phẩm trên một page
        currentPage: page, // page hiện tại
        totalPages: Math.ceil(count / perPage), // tổng số các page: ;
        totalItems: count,
      });
    } catch (error) {
      res.status(500).json(err);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

module.exports = router;
