import login from './Login';
import TimeSheet from './TimeSheet';
import Report from './reports';
import Workno from './workno';
import List from './list';
import Assignwork from './assigns';
import Role from './role';
import Invite from './email';
import InviteRegister from './invite';
import Profile from './profile';
import Setting from './Setting';
import Team from './team';
import Work from './work';
import Monday from './monday';
import Created from './create';
import Company from './company';
import Group from './group';
import Enum from './enum';
import User from './user';
import Image from './image';
import Calendar from './calendar'
// import TimeSheet from './TimeSheet';
// import TimeSheetDetail from './TimeSheetDetail';

const useApi = {
  login: login,
  timeSheet: TimeSheet,
  report: Report,
  workno: Workno,
  list: List,
  aswork: Assignwork,
  role: Role,
  invite: Invite,
  inviteRegister: InviteRegister,
  profile: Profile,
  setting: Setting,
  team: Team,
  work: Work,
  monday: Monday,
  created: Created,
  company: Company,
  group: Group,
  enum: Enum,
  users: User,
  image: Image,
  calendar: Calendar

  //   timesheet: TimeSheet,
  //   TimeSheetDetail: TimeSheetDetail
};
export default useApi;
