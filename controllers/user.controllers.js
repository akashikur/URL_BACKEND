const zod = require("zod");
const User = require("../modules/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUpBody = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

const sighupUser = async (req, res) => {
  const { sucess } = signUpBody.safeParse(req.body);

  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    return res.status(411).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(
    req.body.password,
    Number(process.env.BCRIPT_SALT)
  );

  try {
    const userObj = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      profile: process.env.SERVER_URL + req.file.filename,
    });

    const user_id = userObj._id;

    const token = jwt.sign({ user_id }, process.env.JWT_SECRET);

    return res.status(201).json({
      status: 201,
      message: "user created successfully",
      data: token,
    });
  } catch (error) {
    return res.status(411).json({ message: "Error while fetching " });
  }
};

const loginBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

const loginUser = async (req, res) => {
  // const { sucess } = signUpBody.safeParse(req.body);

  // if (!sucess) {
  //   return res.status(411).json({ message: "Incorrect Input" });

  // }

  let userData;
  try {
    userData = await User.findOne({ email: req.body.email });
    if (!userData) {
      return res.status(411).json({ message: "User doesn't exists" });
    }
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Error while fetching user data",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    userData.password
  );
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password" });
  }
  const token = jwt.sign({ user_id: userData._id }, process.env.JWT_SECRET);

  return res.status(200).json({
    status: 200,
    message: "User Logged in successfully",
    data: token,
  });
};

const getUser = async (req, res) => {
  const user_id = req.locals.user_id;

  try {
    let userObj = await User.findOne({ _id: user_id });
    return res.status(200).json({
      status: 200,
      message: "User fetched successfully",
      data: userObj,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Error while fetching user data",
    });
  }
};

module.exports = { sighupUser, loginUser, getUser };
