import { App_container } from "./app_container/App_container";
import {Header} from "./header/Header"

export function App() {
  return (
    <div className="App">
      <Header />
      <App_container />
    </div>
  );
}

export default App;
