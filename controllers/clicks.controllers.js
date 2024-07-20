const Clicks = require("../modules/Clicks");

const storeClicks = async (req, res) => {
  const user_id = req.locals.user_id;
  const { url_id, city, country, device } = req.body;

  try {
    const cliksObj = new Clicks({
      url_id: url_id,
      city: city,
      country: country,
      device: device,
      user_id: user_id,
    });
    await cliksObj.save();
    return res.status(201).json({
      message: "successfully clicks stored",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error while storing clicks",
    });
  }
};

const getClicksForUrls = async (req, res) => {
  const user_id = req.locals.user_id;
  try {
    const allClicks = await Clicks.find({ user_id });
    return res.status(201).json({
      message: "successfully fetched clicks",
      data: allClicks,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error while getting all clicks",
    });
  }
};

const getUrlClicks = async (req, res) => {
  const url_id = req.params.url_id;
  try {
    const allUrlClicks = await Clicks.find({ url_id });
    return res.status(201).json({
      message: "successfully fetched clicks",
      data: allUrlClicks,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error while getting all clicks",
      data: error.message,
    });
  }
};

module.exports = { storeClicks, getClicksForUrls, getUrlClicks };
