import { Notes } from "./modules"
import { Layout } from "./modules/layout"

function App() {
  return(
    <div className="bg-slate-100 h-[100vh] font-poppins">
      <Layout>
        <Notes/>
      </Layout>
    </div>
  )
}

export default App
