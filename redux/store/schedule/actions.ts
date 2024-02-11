export type ACTION_INSTANCE =
  | ReturnType<typeof SET_CURRENT_SCHEDULE_DATE>
  | ReturnType<typeof SET_MONTH_SCHEDULE_DATA>
  | ReturnType<typeof SET_CALENDAR>
  | ReturnType<typeof SET_CALENDAR_YEAR>
  | ReturnType<typeof SET_CALENDAR_MONTH>
  | ReturnType<typeof SET_CALENDAR_DAY>
  | ReturnType<typeof SET_CALENDAR_DAY_OF_WEEK>
  | ReturnType<typeof SET_CALENDAR_START_DATE_OF_WEEK_LIST>
  | ReturnType<typeof SET_TODAY_SCHEDULE_LIST>
  | ReturnType<typeof SET_SCHEDULE_CATEGORY_LIST>
  | ReturnType<typeof SET_MONTH_SCHEDULE_LIST>
  | ReturnType<typeof SET_TOGGLE_UP_TO_DATE_MONTH_SCHEDULE>;

type CURRENT_SCHEDULE_DATE_STATE = {
  currentScheduleDate: string;
};
/**
 * @param 달력에서 날짜를 클릭하였을 떄의 날짜를 담아두는 action
 */
export const SET_CURRENT_SCHEDULE_DATE = (
  payload: CURRENT_SCHEDULE_DATE_STATE
) => {
  return {
    type: 'CURRENT_SCHEDULE_DATE',
    payload: payload,
  };
};

type MONTH_SCHEDULE_DATA_STATE = {
  monthScheduleDate: [];
};
/**
 * @param 한달정도의 날짜에 대한 일정을 담아두는 action
 */
export const SET_MONTH_SCHEDULE_DATA = (payload: MONTH_SCHEDULE_DATA_STATE) => {
  return {
    type: 'MONTH_SCHEDULE_DATA',
    payload: payload,
  };
};
/**
 * @param 달력
 */
type SET_CALENDAR_STATE = {
  calendar: [];
};
export const SET_CALENDAR = (payload: SET_CALENDAR_STATE) => {
  return {
    type: 'CALENDAR',
    payload: payload,
  };
};
/**
 * @param 달력에서 보이는 연도(year) 설정
 */
type SET_CALENDAR_YEAR_STATE = {
  calendarYear: string;
};
export const SET_CALENDAR_YEAR = (payload: SET_CALENDAR_YEAR_STATE) => {
  return {
    type: 'CALENDAR_YEAR',
    payload: payload,
  };
};
/**
 * @param 달력에서 보이는 월(month, 0~11) 설정
 */
type SET_CALENDAR_MONTH_STATE = {
  calendarMonth: string;
};
export const SET_CALENDAR_MONTH = (payload: SET_CALENDAR_MONTH_STATE) => {
  return {
    type: 'CALENDAR_MONTH',
    payload: payload,
  };
};
/**
 * @param 달력에서 보이는 일(day) 설정
 */
type SET_CALENDAR_DAY_STATE = {
  calendarDay: string;
};
export const SET_CALENDAR_DAY = (payload: SET_CALENDAR_DAY_STATE) => {
  return {
    type: 'CALENDAR_DAY',
    payload: payload,
  };
};
type SET_CALENDAR_DAY_OF_WEEK_STATE = {
  calendarDayOFWeeK: string;
};
/**
 * @param 달력에서 보이는 요일(day of week) 설정
 */
export const SET_CALENDAR_DAY_OF_WEEK = (
  payload: SET_CALENDAR_DAY_OF_WEEK_STATE
) => {
  return {
    type: 'CALENDAR_DAY_OF_WEEK',
    payload: payload,
  };
};
type SET_CALENDAR_START_DATE_OF_WEEK_LIST_STATE = {
  calendarStartDateOfWeekList: [];
};
/**
 * @description 달력에서 각주의 첫재날짜를 모아놓은 배열
 */
export const SET_CALENDAR_START_DATE_OF_WEEK_LIST = (
  payload: SET_CALENDAR_START_DATE_OF_WEEK_LIST_STATE
) => {
  return {
    type: 'CALENDAR_START_DATE_OF_WEEK_LIST',
    payload: payload,
  };
};

type TODAY_SCHEDULE_STATE = {
  todayScheduleList: [];
};
/**
 * @description 오늘의 할일들을 모아놓는 배열
 */
export const SET_TODAY_SCHEDULE_LIST = (payload: TODAY_SCHEDULE_STATE) => {
  return {
    type: 'TODAY_SCHEDULE_LIST',
    payload: payload,
  };
};

type SCHEDULE_CATEGORY_STATE = {
  scheduleCategoryList: [];
};
/**
 * @description 할일의 카테고리를 모아놓은 배열
 */
export const SET_SCHEDULE_CATEGORY_LIST = (
  payload: SCHEDULE_CATEGORY_STATE
) => {
  return {
    type: 'SCHEDULE_CATEGORY_LIST',
    payload: payload,
  };
};

type MONTH_SCHEDULE_STATE = {
  monthScheduleList: [];
};
/**
 * @description 할일의 1달의 일정을 모아놓은 배열
 */
export const SET_MONTH_SCHEDULE_LIST = (payload: MONTH_SCHEDULE_STATE) => {
  return {
    type: 'MONTH_SCHEDULE_LIST',
    payload: payload,
  };
};

type TOGGLE_UP_TO_DATE_MONTH_SCHEDULE_STATE = {
  toggleUptoDateMonthSchedule: boolean;
};
/**
 * @description 할일의 1달의 일정을 모아놓은 배열
 */
export const SET_TOGGLE_UP_TO_DATE_MONTH_SCHEDULE = (
  payload: TOGGLE_UP_TO_DATE_MONTH_SCHEDULE_STATE
) => {
  return {
    type: 'TOGGLE_UP_TO_DATE_MONTH_SCHEDULE',
    payload: payload,
  };
};

const scheduleAction = {
  SET_CURRENT_SCHEDULE_DATE,
  SET_MONTH_SCHEDULE_DATA,
  SET_CALENDAR,
  SET_CALENDAR_YEAR,
  SET_CALENDAR_MONTH,
  SET_CALENDAR_DAY,
  SET_CALENDAR_DAY_OF_WEEK,
  SET_CALENDAR_START_DATE_OF_WEEK_LIST,
  SET_TODAY_SCHEDULE_LIST,
  SET_SCHEDULE_CATEGORY_LIST,
  SET_MONTH_SCHEDULE_LIST,
  SET_TOGGLE_UP_TO_DATE_MONTH_SCHEDULE,
};

export default scheduleAction;
