# storeComponents
Javascript web components store, which holds all the components and triggers them based on the external input.

### Create    
```
const storeComponents = new StoreComponents();
```

### Registration
```
storeComponents.registerComponent([name], [function]);  
```

### Initialization   
```
storeComponents.initComponents([array of components {name: '', type: ''}]);
```

### Log
```
storeComponents.showLogs();
```

## Example
```
const Greeting = () => {
  console.log('Hello world!')
}

const storeComponents = new StoreComponents();
storeComponents.registerComponent('Home', Greeting);
storeComponents.initComponents([{name: 'Home', type: null}]);
```
