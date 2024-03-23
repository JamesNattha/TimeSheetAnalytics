const express = require("express");
const router = express.Router();
const indexController = require("../lib/controller/index");

// Login
router.route("/login").post(indexController.login.login);
router.route("/login/onauth").post(indexController.login.onAuthApi);
router.route("/register").post(indexController.login.register);
router.route("/activate").post(indexController.login.activateAccount);
router.route("/forgotpassword").post(indexController.login.forgotPassword);
router.route("/resetpassword").post(indexController.login.resetPassword);
router.route("/resendEmail").post(indexController.login.resendEmail);

//reports
router.route("/reports/project").post(indexController.report.fetchProjectposition)
router.route("/reports/profile").post(indexController.report.fetchUserforProject)
router.route("/reports/timesheet").post(indexController.report.fetchTimesheets)
router.route("/reports/group").post(indexController.report.fetchProjectByGroup)
router.route("/reports/group/user").post(indexController.report.fetchUserByGroup)
router.route("/reports/monday").post(indexController.report.fetchMondayReport)
router.route("/reports/position").post(indexController.report.fetchUserPosition)

//assign
router.route("/assign/update").post(indexController.assign.updatedSendto);

//role
router.route("/role/createrole").post(indexController.role.createRole);
router.route("/role").post(indexController.role.getRole);
router.route("/role/fetch").post(indexController.role.getUserRole);
router.route("/role/update").post(indexController.role.updateRole);
router.route("/role/getmyrole").post(indexController.role.getMyRole);

// User
router.route("/user").post(indexController.user.createUser);
router.route("/user/fetchUser").post(indexController.user.fetchUser);
router.route("/user/fetchMyself").post(indexController.user.fetchMyself);
router.route("/user/fetchAllUser").post(indexController.user.fetchAllUser);

// //workno new tb
// router.route("/workno/createworkno").post(indexController.workno.createWorkNo);
// router.route("/workno/updateworkno").post(indexController.workno.updateWorkNo);
// router.route("/workno").post(indexController.workno.fetchwork);
// router.route("/workno/deleteworkno").post(indexController.workno.deleteWorkNo);

//List
router.route("/list").post(indexController.list.getAllUsers);
router.route("/list/getwork").post(indexController.list.getAllwork);
router.route("/list/deletework").post(indexController.list.deleteWork);

// TimeSheet
router
  .route("/timesheet/create")
  .post(indexController.timesheet.createTimeSheet);
router
  .route("/timesheet/fetchTimeSheetByDate")
  .post(indexController.timesheet.fetchTimeSheetByDate);
router
  .route("/timesheet/deleteTimeSheet")
  .post(indexController.timesheet.deleteTimeSheet);
router
  .route("/timesheet/updateTimeSheet")
  .post(indexController.timesheet.updateTimeSheet);
router
  .route("/timesheet/dataReport")
  .post(indexController.timesheet.dataReport);

//Email
router.route("/sendinvite/").post(indexController.email.sendInviteEmail);
router.route("/sendconfirm/").post(indexController.email.sendConfirmEmail);
router.route("/password/reset").post(indexController.email.sendResetEmail);
// Assuming you have an "/activate" route in your Express app

router.route("/created").post(indexController.create.created);
router
  .route("/created/department")
  .post(indexController.create.fetchDepartment);
router.route("/created/gender").post(indexController.create.getGender);
router.route("/created/group").post(indexController.create.fetchGroup);
router.route("/created/position").post(indexController.create.fetchPosition);
router.route("/created/profile").post(indexController.create.getProfile);

//create speace
router.route("/createdgroup").post(indexController.create.createGroup);
router
  .route("/createddepartment")
  .post(indexController.create.createDepartment);
router.route("/createdposition").post(indexController.create.createPosition);

//--------------------------------------------------------------------COMPANY ZONE------------------------------------------------------------------------------------------------
//company
router.route("/getdepartment").post(indexController.create.getDepartment);
router.route("/getposition").post(indexController.create.getPosition);
router.route("/getgroup").post(indexController.create.getGroup);

router.route("/group/getGroup").post(indexController.group.getGroup);

//update
router
  .route("/update/department")
  .post(indexController.create.updateDepartment);
router.route("/update/position").post(indexController.create.updatePosition);
router.route("/update/group").post(indexController.create.updateGroup);

//delete
router
  .route("/delete/department")
  .post(indexController.create.isDeleteDepartment);
router.route("/delete/position").post(indexController.create.isDeletePosition);
router.route("/delete/group").post(indexController.create.isDeleteGroup);
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//profile api
router.route("/setting-profile").post(indexController.profile.getProfile);
router.route("/update-profile").post(indexController.profile.updateUser);
router.route("/delete-profile").post(indexController.profile.deleteUser);
router.route("/upload-profile").post(indexController.profile.uploadAvatar);
router
  .route("/update-setting-profile")
  .post(indexController.profile.updateSettingprofile);
router
  .route("/update/change-password")
  .post(indexController.login.changePassword);
// router.route("/public/avatar/:filename").post(indexController.image.getImage);
router.route("/profile/avatar").post(indexController.profile.fetchImgUser);

//setting api
router.route("/setting/profile").post(indexController.setting.fetchuserProfile);

//team api
router
  .route("/setting/team/department")
  .post(indexController.team.fetchDepartmentTeam);
router.route("/setting/team/group").post(indexController.team.fetchGroupTeam);
router
  .route("/setting/create/project-team")
  .post(indexController.team.createTeamProject);
router
  .route("/setting/team/fetch-user")
  .post(indexController.team.fetchDataProject);
router
  .route("/setting/team/fetch-team-project")
  .post(indexController.team.fetchTeamProject);

//Monday
router.route("/monday/createMonday").post(indexController.monday.createMonday);
router.route("/monday/fetchMonday").post(indexController.monday.fetchMonday);
router.route("/monday").post(indexController.monday.getMondayData);
router.route("/monday/getBoardId").post(indexController.monday.getBoardId);
// router
//   .route("/monday/getUpdatedData")
//   .post(indexController.monday.getUpdatedData);
router.route("/monday/getDataAll").post(indexController.monday.getDataAll);
router
  .route("/monday/fetchMondayUser")
  .post(indexController.monday.fetchMondayUser);
router.route("/monday/getProject").post(indexController.monday.getProjectName);

//-----------------------------------------------Client-------------------------------------------
//Work Client
router
  .route("/work/fetchDataClient")
  .post(indexController.work.fetchDataClient);
router
  .route("/work/fetchSubDataClient")
  .post(indexController.work.fetchSubDataClient);
router
  .route("/work/fetchSubDataProject")
  .post(indexController.work.fetchSubDataProject); //Use this to fetch Client
router
  .route("/work/fetchTaskProject")
  .post(indexController.work.fetchTaskProject); //Use this to fetch Client
router.route("/work/createClient").post(indexController.work.createClient);
router.route("/work/deleteClient").post(indexController.work.deleteClient);
router.route("/work/updateClient").post(indexController.work.updateClient);

//-----------------------------------------------Project-------------------------------------------
//Work Project
router
  .route("/work/fetchDataProject")
  .post(indexController.work.fetchDataProject);
router.route("/work/createProject").post(indexController.work.createProject);
router.route("/work/deleteProject").post(indexController.work.deleteProject);
router.route("/work/updateProject").post(indexController.work.updateProject);

//-----------------------------------------------Task planning-------------------------------------------
// Work Work
router.route("/work/fetchDataWork").post(indexController.work.fetchDataWork);
router.route("/work/fetchGetWorkCode").post(indexController.work.fetchGetWorkCode);
router.route("/work/createWork").post(indexController.work.createWork);
router.route("/work/demoCreateWork").post(indexController.work.demoCreateWork);
router.route("/work/deleteWork").post(indexController.work.deleteWork);
router.route("/work/updateWork").post(indexController.work.updateWork);
router
  .route("/work/updateStatusSuccess")
  .post(indexController.work.updateStatusSuccess);
router
  .route("/work/updateStatusInprogress")
  .post(indexController.work.updateStatusInprogress);
router
  .route("/work/updateStopwatch")
  .post(indexController.work.updateStopwatch);
router
  .route("/work/updateStopwatchStop")
  .post(indexController.work.updateStopwatchStop);

//----------------------------------------------- Enum -------------------------------------------
//Enum
router.route("/enum/getEnum").post(indexController.enum.getEnum);
router.route("/enum/level").post(indexController.enum.getEnumLevel);
router.route("/enum/gender").post(indexController.enum.getEnumGender);
router.route("/enum/calendar").post(indexController.enum.getEnumCalendar);

//------------------------------------------------Carlendars------------------------------------------
//----------Api thirdParty
router
  .route("/financail-holiday")
  .post(indexController.calendar.apiHolidayThaiBank);
  //-----------Api Export
  router
  .route("/financail-holiday/export")
  .post(indexController.calendar.apiHolidayThaiBankExport);
//----------In Local
router.route("/fetch-calendar").post(indexController.calendar.fetchHolidays);
router.route("/calendar/created").post(indexController.calendar.createEvent);
router.route("/calendar/updated").post(indexController.calendar.updateEvent);
router.route("/calendar/deleted").post(indexController.calendar.deleteEvent);
router.route("/calendar/upload").post(indexController.calendar.createEventfile);

module.exports = router;
