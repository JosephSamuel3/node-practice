const usersStorage = require("../storages/usersStorage");
const { body, validationResult, matchedData } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const emailErr = "Invalid email";
const ageErr = "Age must be between 18 and 120";
const BioErr = "Bio must be a maximum of 200 characters"

exports.usersListGet = (req, res) => {
  res.render("index", {
    title: "User list",
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("createUser", {
    title: "Create user",
  });
};

const validateUser = [
  body("firstName").trim()
    .isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
  body("lastName").trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
  body("email")
    .isEmail().withMessage(`Email ${emailErr}`),
  body("age")
    .optional().isInt({ min: 18, max: 120 }).withMessage(`Age ${ageErr}`),
  body("bio")
    .optional().trim().isLength({ max: 200 }).withMessage(`Bio ${BioErr}`)
];

// We can pass an entire array of middleware validations to our controller.
exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = matchedData(req);
    usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/");
  }
];

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUser", {
    title: "Update user",
    user: user,
  });
};

exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = matchedData(req);
    usersStorage.updateUser(req.params.id, { firstName, lastName, email, age, bio });
    res.redirect("/");
  }
];

// Tell the server to delete a matching user, if any. Otherwise, respond with an error.
exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};

exports.usersSearchGet = (req, res) => {
  const firstName = (req.query.firstName || "").toLowerCase().trim();
  const lastName = (req.query.lastName || "").toLowerCase().trim();
  const email = (req.query.email || "").toLowerCase().trim();
  const searchSubmitted = Object.keys(req.query).length > 0;

  const users = searchSubmitted
    ? usersStorage.getUsers().filter((user) => {
        const matchesFirst = firstName ? user.firstName.toLowerCase().includes(firstName) : true;
        const matchesLast = lastName ? user.lastName.toLowerCase().includes(lastName) : true;
        const matchesEmail = email ? (user.email || "").toLowerCase().includes(email) : true;

        return matchesFirst && matchesLast && matchesEmail;
      })
    : [];

  res.render("search", {
    title: "Search users",
    query: {
      firstName: req.query.firstName || "",
      lastName: req.query.lastName || "",
      email: req.query.email || "",
    },
    users,
    showResults: searchSubmitted,
  });
}