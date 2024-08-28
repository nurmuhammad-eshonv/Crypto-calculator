import data from "./assets/data.json"
import Card from "./components/Card"
import "./App.css"
// import Card2 from "./components/Card2"
function App() {
  return (
    <div>
        <Card countries={data}/>
    </div>
  )
}

export default App