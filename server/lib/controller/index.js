const loginController = require("./Auth");
const userController = require("./User");
const timeSheetController = require("./TimeSheet");

const Assign = require("./Assign");
const Report = require("./Reports");
const List = require("./List");
const Role = require("./Role");
const Email = require("./Email");
const Created = require("./Create");
const Profile = require("./Profile");
const Setting = require("./setting");
const Team = require("./Team");
const Work = require("./Work");
const Monday = require("./Monday_API");
const Group = require("./Groups");
const Enum = require("./Enum");
const Image = require("./Image");
const Calendar = require("./Calendar");

const controller = {
  enum: Enum,
  role: Role,
  report: Report,
  login: loginController,
  user: userController,
  timesheet: timeSheetController,
  list: List,
  assign: Assign,
  email: Email,
  create: Created,
  profile: Profile,
  setting: Setting,
  team: Team,
  monday: Monday,
  work: Work,
  group: Group,
  image: Image,
  calendar: Calendar,
};

module.exports = controller;
