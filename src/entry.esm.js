
// Import vue components
import * as components from '@/components/index';
import { initJqueryCode } from './jquery';

// install function executed by Vue.use()
const install = function installLaravelFormsVue(Vue, options) { 
  initJqueryCode();
  Vue.prototype.$laravelFormsConfig = {
    componentTranslations: options.componentTranslations,
  };
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  }); 
};

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/components/index';
