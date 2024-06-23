import * as pages from './pages';
import config from 'config';

const result = {
  [pages.defaultPage]: `${config.UI_URL_PREFIX}/${pages.defaultPage}`,
  [pages.login]: `${config.UI_URL_PREFIX}/${pages.login}`,
  [pages.menuPage]: `${config.UI_URL_PREFIX}/${pages.menuPage}`,
  [pages.menuDetailPage]: `${config.UI_URL_PREFIX}/${pages.menuDetailPage}`,
  [pages.profilePage]: `${config.UI_URL_PREFIX}/${pages.profilePage}`,
};

export default result;
