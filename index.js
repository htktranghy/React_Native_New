import { AppRegistry } from 'react-native';
import App from './App';
import Index from './index.tsx';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => Index);
