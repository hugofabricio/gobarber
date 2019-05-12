const moment = require("moment");
const { Op } = require("sequelize");
const { User, Appointment } = require("../models");

class ScheduleController {
  async index(req, res) {
    const date = moment(parseInt(req.query.date));
    const { id } = req.session.user;

    const appointments = await Appointment.findAll({
      include: [{ model: User, as: "user" }],
      where: {
        provider_id: id,
        date: {
          [Op.between]: [
            date.startOf("day").format(),
            date.endOf("day").format()
          ]
        }
      }
    });

    return res.render("schedules/index", { appointments });
  }
}

module.exports = new ScheduleController();
