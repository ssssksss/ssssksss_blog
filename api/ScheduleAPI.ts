import { ApiProcessHandler } from './service/ApiProcessHandler';

const addScheduleCategory = props => {
  return ApiProcessHandler({
    url: '/api/schedule/category',
    method: 'POST',
    data: {
      name: props.name,
      backgroundColor: props.backgroundColor,
    },
    apiCategory: '할일 카테고리',
    isShowMessage: true,
  });
};

const getScheduleCategoryList = props => {
  return ApiProcessHandler({
    url: '/api/schedule/category',
    method: 'GET',
    apiCategory: '할일 카테고리',
  });
};

const updateScheduleCategory = props => {
  return ApiProcessHandler({
    url: '/api/schedule/category',
    method: 'PUT',
    apiCategory: '할일 카테고리',
    data: {
      id: props.id,
      name: props.name,
      backgroundColor: props.backgroundColor,
    },
    isShowMessage: true,
  });
};

const deleteScheduleCategory = props => {
  return ApiProcessHandler({
    url: '/api/schedule/category',
    method: 'DELETE',
    apiCategory: '할일 카테고리',
    params: {
      id: props.id,
    },
    isShowMessage: true,
  });
};

const addSchedule = props => {
  return ApiProcessHandler({
    url: '/api/schedule',
    method: 'POST',
    data: {
      title: props.title,
      content: props.content,
      startDateTime: props.startDateTime,
      endDateTime: props.endDateTime,
      scheduleCategoryId: props.scheduleCategoryId,
    },
    apiCategory: '할일',
    isShowMessage: true,
  });
};

const getScheduleList = props => {
  return ApiProcessHandler({
    url: '/api/schedule',
    method: 'GET',
    params: {
      type: props.type,
      startDateTime: props.startDateTime,
      endDateTime: props.endDateTime,
    },
    apiCategory: '할일',
  });
};

const updateSchedule = props => {
  return ApiProcessHandler({
    url: '/api/schedule',
    method: 'PUT',
    data: {
      id: props.id,
      title: props.title,
      content: props.content,
      startDateTime: props.startDateTime,
      endDateTime: props.endDateTime,
      scheduleCategoryId: props.scheduleCategoryId,
    },
    apiCategory: '할일',
    isShowMessage: true,
  });
};

const deleteSchedule = props => {
  return ApiProcessHandler({
    url: '/api/schedule',
    method: 'DELETE',
    params: {
      id: props.id,
    },
    apiCategory: '할일',
    isShowMessage: true,
  });
};

const toggleCheckSchedule = props => {
  return ApiProcessHandler({
    url: '/api/schedule/check',
    method: 'PATCH',
    apiCategory: '할일 체크',
    data: {
      id: props.id,
    },
  });
};

export const ScheduleAPI = {
  addScheduleCategory,
  getScheduleCategoryList,
  updateScheduleCategory,
  deleteScheduleCategory,
  addSchedule,
  getScheduleList,
  updateSchedule,
  deleteSchedule,
  toggleCheckSchedule,
};
