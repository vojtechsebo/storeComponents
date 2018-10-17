/**
 * @class StoreComponents
 * @author Vojtech Sebo
 */
class StoreComponents {
  constructor() {
    this.components = {};
    this.logs = [];
  }

  /**
   * Registre component to the store.
   * @memberof StoreComponents
   * @param {String} name
   * @param {Function} component
   */
  registerComponent = (name, component) => {
    if (typeof component === 'function') {
      this.components[name] = component;
    } else {
      console.warn(`Each component must be function.`);
    }
  };

  /**
   * Initialize all components in StoreComponents.
   * @memberof StoreComponents
   * @param {StringArray} components
   */
  initComponents = components => {
    components.forEach(component => {
      const componentName = component.name;
      const componentType = component.type;
      const info = {
        name: componentName,
        meta: {}
      };

      if ((name = componentType) in this.components || (name = componentName) in this.components) {
        info['name'] = name;

        try {
          const startTime = performance.now();

          this.components[name](name);
          const endTime = performance.now();
          info['status'] = 1;
          info.meta['state'] = 'INITIALIZED';
          info.meta['time'] = `${(endTime - startTime).toFixed(2)} ms.`;
        } catch (error) {
          info['status'] = 2;
          info.meta['state'] = 'ERROR';
          info.meta['err'] = error;
        }
      } else {
        info['status'] = 0;
        info.meta['state'] = 'NOT FOUND';
      }
      this.logs.push(info);
    });
  };

  /**
   * Throw init status to console. 
   * @memberof StoreComponents
   */
  showLogs = () => {
    console.group('STORE COMPONENTS');
    this.logs.forEach(log => {
      switch (log.status) {
        case 0:
          console.log(`%c ${log.name}`, 'font-weight: 700; color: #9a9a9a', log.meta);
          break;
        case 1:
          console.log(`%c ${log.name}`, 'font-weight: 700; color: #48a850', log.meta);
          break;
        default:
          console.log(`%c ${log.name}`, 'font-weight: 700; color: #c62828 ', log.meta);
          break;
      }
    });
    console.groupEnd();
  };
}

export default StoreComponents;
