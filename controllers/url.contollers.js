const Urls = require("../modules/Urls");

const createUrl = async (req, res) => {
  try {
    const short_url = Math.random().toString(36).substr(2, 6);
    const urlObject = new Urls({
      original_url: req.body.original_url,
      short_url: short_url,
      custom_url: req.body.custom_url || null,
      title: req.body.title,
      qr: process.env.SERVER_URL + "qr/" + req.file.filename,
      user_id: req.locals.user_id,
    });
    await urlObject.save();
    return res.status(201).json({
      message: "url saved ",
      data: urlObject,
    });
  } catch (error) {
    return res.status(200).json({
      message: "Failed to save the urls",
    });
  }
};

const getAllUserUrls = async (req, res) => {
  const { user_id } = req.locals;
  try {
    const urlsData = await Urls.find({ user_id });
    return res.status(200).json({
      message: "Urls fetched Sucessfully",
      data: urlsData,
    });
  } catch (error) {
    return res.status(200).json({
      message: "Failed to send the urls",
    });
  }
};

const getUrl = async (req, res) => {
  const { user_id } = req.locals;
  const id = req.params.id;

  try {
    const urlObj = await Urls.find({ user_id: user_id, _id: id });

    return res.status(200).json({
      message: "Urls fetched Sucessfully",
      data: urlObj,
    });
  } catch (error) {
    return res.status(200).json({
      message: "Failed to fetch the url",
    });
  }
};

const getLongUrl = async (req, res) => {
  const { user_id } = req.locals;
  const _id = req.params.url_id;

  try {
    const query = {
      $or: [{ short_url: _id }, { custom_url: _id }],
    };
    const shortLinkData = await Urls.findOne(query);
    return res.status(200).json({
      message: "Urls fetched Sucessfully",
      data: shortLinkData,
    });
  } catch (error) {
    return res.status(200).json({
      message: "Failed to fetch the Long Url",
    });
  }
};

const deleteUrl = async (req, res) => {
  const _id = req.params.url_id;
  try {
    await Urls.findByIdAndDelete({ _id });
    return res.status(200).json({
      message: "Sucessfully Url deleted",
    });
  } catch (error) {
    return res.status(200).json({
      message: "Failed to delete Url",
    });
  }
};
module.exports = { getAllUserUrls, createUrl, getUrl, getLongUrl, deleteUrl };
