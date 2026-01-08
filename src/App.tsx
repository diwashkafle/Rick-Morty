import FilterDashboard from "./components/filter-dashboard"
import {Routes, Route} from "react-router-dom";
import CharacterDetailPage from "./pages/CharacterDetailPage";


function App() {

  return (
  
    <Routes>
      <Route path="/characters/:id" element={<CharacterDetailPage />} />
      <Route path="/" element={
        <main className="max-w-7xl mx-auto p-4">
    <h1 className="p-2 flex justify-center px-4 border text-lg sm:text-2xl font-semibold text-gray-700 border-gray-200 bg-gray-50">Rick and Morty Dashboard</h1>
    <section className="mt-10">
      <FilterDashboard />
    </section>
   </main>
      } />
    </Routes>
 
  )
}

export default App
