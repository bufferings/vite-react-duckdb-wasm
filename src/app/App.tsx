import "./App.css";
import { HelloDockDB } from "./HelloDockDB.tsx";

function App() {
  return (
    <>
      <p>Vite + React + DuckDB-Wasm</p>
      <h1>2024年11月18日の最高気温</h1>
      <p>出典：e-Govデータポータル（https://data.e-gov.go.jp）</p>
      <HelloDockDB />
    </>
  );
}

export default App;
