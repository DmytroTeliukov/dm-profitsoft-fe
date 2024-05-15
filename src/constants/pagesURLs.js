import * as pages from './pages';
import config from 'config';
import {menuDetailPage} from "./pages";

const result = {
  [pages.defaultPage]: `${config.UI_URL_PREFIX}/${pages.defaultPage}`,
  [pages.login]: `${config.UI_URL_PREFIX}/${pages.login}`,
  [pages.secretPage]: `${config.UI_URL_PREFIX}/${pages.secretPage}`,
  [pages.menuPage]: `${config.UI_URL_PREFIX}/${pages.menuPage}`,
  [pages.menuDetailPage]: `${config.UI_URL_PREFIX}/${pages.menuDetailPage}`,
};

export default result;
