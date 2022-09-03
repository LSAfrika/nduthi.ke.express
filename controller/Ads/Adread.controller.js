const { query } = require("express");
const Admodel = require("../../models/Advert.model");

exports.getad = async (req, res) => {
  try {
    id = req.params.id;
    const ad = await Admodel.findById(id).populate(
      "ownerid",
      "username phone createdAt"
    );

    if (ad) {
      res.send({ ...ad._doc });
    }
  } catch (error) {
    console.log("error: ", error.message);
    res.send({ err: error.message });
  }
};

exports.getallads = async (req, res) => {
  try {
    const pagesize = 5;
    let pagination = req.query.pagination;
    console.log("all query params: \n", req.query);
    // return;
    let paginationnumber = parseInt(pagination);
    // console.log("params attained:", paginationnumber);
    isnotaumber = isNaN(paginationnumber);
    // console.log("is not a number value: ", isnotaumber);
    if (isnotaumber === true) {
      paginationnumber = 0;
      console.log("params Not a number:", paginationnumber);
    }

    const ads = await Admodel.find({
      // adactivation: { $gt: Date.now() },
    })
      .skip(paginationnumber * pagesize)
      .limit(pagesize)
      .populate("ownerid", "username phone createdAt");

    // let returnedads = [];
    if (ads) {
      // ads.forEach((ad) => {
      //   const {
      //     _id,
      //     brand,
      //     name,
      //     enginecc,
      //     price,
      //     negotiable,
      //     condition,
      //     county,
      //     subcounty,
      //     mpesaid,
      //     ownerid,
      //     counter,
      //     Images,
      //     createdAt,
      //   } = ad;
      //   const resad = {
      //     id: _id,
      //     brand,
      //     name,
      //     enginecc,
      //     price,
      //     negotiable,
      //     condition,
      //     county,
      //     subcounty,
      //     mpesaid,
      //     ownerid,
      //     counter,
      //     Images,
      //     createdAt,
      //   };

      //   returnedads.push(resad);
      // });

      // res.send({ returnedads });
      res.send({ ads });
    }
  } catch (error) {
    console.log("error: ", error);
    res.send({ err: error.message });
  }
};

exports.getfilteredads = async (req, res) => {
  try {
    let finalfilterresults;
    let filteredadsbrand = Admodel;
    let filteredadscounty = Admodel;
    let filteredadssubcounty = Admodel;
    const pagesize = 5;
    let pagination = req.query.pagination;
    let _brand = req.query.brand;
    let _county = req.query.county;
    let _subcounty = req.query.subcounty;
    console.log("brand query params: \n", req.query);

    let paginationnumber = parseInt(pagination);

    let isnotaumber = isNaN(paginationnumber);

    if (isnotaumber === true) {
      paginationnumber = 0;
      console.log("params Not a number:", paginationnumber);
    }

    if (_brand !== "" && _county !== "" && _subcounty !== "") {
      filteredadsbrand = await Admodel.find({
        // adactivation: { $gt: Date.now() },

        brand: _brand,
        county: _county,
        subcounty: _subcounty,
      })
        .skip(paginationnumber * pagesize)
        .limit(pagesize)
        .populate("ownerid", "username phone createdAt");

      console.log("all aprams polpulated ");
      return res.send({ filteredadsbrand });
    }
    if (_brand !== "" && _county !== "") {
      filteredadsbrand = await Admodel.find({
        // adactivation: { $gt: Date.now() },

        brand: _brand,
        county: _county,
      })
        .skip(paginationnumber * pagesize)
        .limit(pagesize)
        .populate("ownerid", "username phone createdAt");

      console.log("brand and county polpulated ");
      return res.send({ filteredadsbrand });
    }
    if (_county !== "" && _subcounty !== "") {
      filteredadsbrand = await Admodel.find({
        // adactivation: { $gt: Date.now() },

        county: _county,
        subcounty: _subcounty,
      })
        .skip(paginationnumber * pagesize)
        .limit(pagesize)
        .populate("ownerid", "username phone createdAt");

      console.log("county and subcounty polpulated ");
      return res.send({ filteredadsbrand });
    }

    if (_brand !== "") {
      filteredadsbrand = await Admodel.find({
        // adactivation: { $gt: Date.now() },

        brand: _brand,
      })
        .skip(paginationnumber * pagesize)
        .limit(pagesize)
        .populate("ownerid", "username phone createdAt");

      console.log("only brand  polpulated ");

      return res.send({ filteredadsbrand });
    }
    if (_county !== "") {
      filteredadsbrand = await Admodel.find({
        // adactivation: { $gt: Date.now() },

        county: _county,
      })
        .skip(paginationnumber * pagesize)
        .limit(pagesize)
        .populate("ownerid", "username phone createdAt");

      console.log("only county  polpulated ");

      return res.send({ filteredadsbrand });
    }
  } catch (error) {
    console.log("error: ", error);
    res.send({ err: error.message });
  }
};

exports.getalluserads = async (req, res) => {
  try {
    const id = req.params.id;
    const ads = await Admodel.find({
      ownerid: id,
      // adactivation: { $gt: Date.now() },
    }).populate("ownerid", "username phone createdAt");
    //{
    //  adactivation: { $gt: Date.now() },
    //  }

    let returnedads = [];
    if (ads) {
      ads.forEach((ad) => {
        const {
          _id,
          brand,
          name,
          enginecc,
          price,
          negotiable,
          condition,
          county,
          subcounty,
          mpesaid,
          ownerid,
          counter,
          Images,
          createdAt,
        } = ad;
        const resad = {
          id: _id,
          brand,
          name,
          enginecc,
          price,
          negotiable,
          condition,
          county,
          subcounty,
          mpesaid,
          ownerid,
          counter,
          Images,
          createdAt,
        };

        returnedads.push(resad);
      });
      // console.log(returnedads);
      res.send({ returnedads });
    }
  } catch (error) {
    console.log("error: ", error);
    res.send({ errmsg: error.message, fullerr: error });
  }
};
exports.getalluseradsdashboard = async (req, res) => {
  try {
    const id = req.params.id;
    const ads = await Admodel.find({ ownerid: id }).populate(
      "ownerid",
      "username phone createdAt"
    );
    //{
    //  adactivation: { $gt: Date.now() },
    //  }

    let returnedads = [];
    if (ads) {
      ads.forEach((ad) => {
        // const {
        //   _id,
        //   brand,
        //   name,
        //   enginecc,
        //   price,
        //   negotiable,
        //   condition,
        //   county,
        //   subcounty,
        //   mpesaid,
        //   ownerid,
        //   counter,
        //   Images,
        //   createdAt,
        //   adactivation
        // } = ad;
        // const resad = {
        //   id: _id,
        //   brand,
        //   name,
        //   enginecc,
        //   price,
        //   negotiable,
        //   condition,
        //   county,
        //   subcounty,
        //   mpesaid,
        //   ownerid,
        //   counter,
        //   Images,
        //   createdAt,
        //   adactivation
        // };

        returnedads.push(ad);
        // returnedads.push(resad);
      });
      // console.log(returnedads);
      res.send({ returnedads });
    }
  } catch (error) {
    console.log("error: ", error);
    res.send({ errmsg: error.message, fullerr: error });
  }
};

exports.similarads = async (req, res) => {
  try {
    const count = await Admodel.count();
    console.log("totaldocs: \n", count);
    const minimumcount = count - 3;
    const skip = Math.floor(Math.random() * minimumcount);
    console.log("random gen: ", skip);

    const ad = await Admodel.find()
      .limit(3)
      .skip(skip * 1)
      .populate("ownerid", "username phone createdAt");

    if (ad) {
      res.send({ ad });
    }
  } catch (error) {
    console.log("error: ", error.message);
    res.send({ err: error.message });
  }
};

function brandfilter(brandvalue) {
  if (brandvalue !== "") return { brand: brandvalue };
}

//*todo REMEBER TO AD AD ACTIVATION FILTER ON REQUEST IN PRODUCTION
