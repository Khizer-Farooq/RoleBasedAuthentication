const authService =
  require("../services/authService");




// REGISTER
exports.register = async (req, res) => {

  try {

    const result =
      await authService.registerUser(
        req.body
      );

    res.status(201).json(result);

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

};




// LOGIN
exports.login = async (req, res) => {

  try {

    const result =
      await authService.loginUser(
        req.body
      );

    res.status(200).json(result);

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

};




// VERIFY EMAIL
exports.verifyEmail =
  async (req, res) => {

    try {

      const result =
        await authService.verifyUserEmail(
          req.params.token
        );



      res.send(`
        <h1>${result.message}</h1>
      `);

    } catch (error) {

      res.status(400).json({
        message: error.message
      });

    }

};




// REFRESH TOKEN
exports.refreshAccessToken =
  async (req, res) => {

    try {

      const result =
        await authService.generateNewAccessToken(
          req.body.refreshToken
        );



      res.json(result);

    } catch (error) {

      res.status(403).json({
        message: error.message
      });

    }

};