const ticketmodel = require("../../models/ticketing.model");
exports.userticket = async (req, res) => {
  try {
    const { email, subject, ticket } = req.body;

    const savedticket = await ticketmodel.create({ email, subject, ticket });

    res.send({ message: "message received thank you", savedticket });
  } catch (error) {
    res.send({
      message: "error caught while receiving user ticket",
      err: error.message,
    });
  }
};
