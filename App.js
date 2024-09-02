import { LogBox } from "react-native";
import Launcher from "./src/Launcher";

export default function App() {
  LogBox.ignoreLogs(['Require cycle:']);

  return (<Launcher />);
}
