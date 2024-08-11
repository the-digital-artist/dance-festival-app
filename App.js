import { LogBox } from "react-native";
import Launcher from "./src/Launcher";
import DataModel from "./src/DataModel";

export default function App() {
  LogBox.ignoreLogs(['Require cycle:']);
  // console.log(''+JSON.stringify(new DataModel(), null, 2));
  // return (null);
  
  return (<Launcher/>);
}
