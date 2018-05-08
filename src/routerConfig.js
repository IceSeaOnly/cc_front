// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import BlankLayout from './layouts/BlankLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import HeaderAsideFooterResponsiveLayout from './layouts/HeaderAsideFooterResponsiveLayout';
import OfficeLogin from './pages/OfficeLogin';
import OfficeReg from './pages/OfficeReg';
import UserReg from './pages/UserReg';
import UserContractList from './pages/UserContractList';
import ApplyContract from './pages/ApplyContract';
import ContractInfo from './pages/ContractInfo';
import NotFound from './pages/NotFound';

const routerConfig = [
  {
    path: '/',
    layout: BlankLayout,
    component: Home,
  },
  {
    path: '/login',
    layout: BlankLayout,
    component: Login,
  },
  {
    path: '/officeLogin',
    layout: BlankLayout,
    component: OfficeLogin,
  },
  {
    path: '/officeReg',
    layout: BlankLayout,
    component: OfficeReg,
  },
  {
    path: '/userReg',
    layout: BlankLayout,
    component: UserReg,
  },
  {
    path: '/userContractList',
    layout: HeaderAsideFooterResponsiveLayout,
    component: UserContractList,
  },
  {
    path: '/applyContract',
    layout: HeaderAsideFooterResponsiveLayout,
    component: ApplyContract,
  },
  {
    path: '/contractInfo',
    layout: HeaderAsideFooterResponsiveLayout,
    component: ContractInfo,
  },
  {
    path: '*',
    layout: BlankLayout,
    component: NotFound,
  },
];

export default routerConfig;
