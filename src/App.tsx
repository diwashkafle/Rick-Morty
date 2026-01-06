import FilterDashboard from "./components/filter-dashboard"


function App() {

  return (
   <main className="container mx-auto p-4">
    <h1 className="p-2 flex justify-center px-4 border text-2xl font-semibold text-gray-700 border-gray-200 bg-gray-50">Rick and Morty Dashboard</h1>
    <section className="mt-10">
      <FilterDashboard />
    </section>
   </main>
  )
}

export default App
