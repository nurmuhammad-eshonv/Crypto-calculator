import data from "./assets/data.json"
import Card from "./components/Card"
function App() {
  return (
    <div>
        <Card countries={data}/>
    </div>
  )
}

export default App