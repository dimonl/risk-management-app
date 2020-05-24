import {Risk} from './interfaces';
import {HttpHeaders} from '@angular/common/http';

export const userAPI = 'https://5e91b53bbbff8100169689b0.mockapi.io/todo/users';
export const RisksAPI = 'https://5e91b53bbbff8100169689b0.mockapi.io/todo/risks';

export const emptyRisk: Risk = new Risk('', '', '', '', 0, 0);

export const SORT_TYPE = {
  by_time: 'by_time',
  by_probability: 'by_probability',
  by_name: 'by_name',
};

export const STORAGE_SAVED_TYPES = {
  id: 'id',
  name: 'name',
};

export const JSON_HEADER = new HttpHeaders().set('Content-Type', 'application/json');

export const MENU_NAMES = {
  manageRisk: 'Manage Risk',
  mainPage: 'Main Page',
};
