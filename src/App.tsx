import FilterDashboard from "./components/filter-dashboard"


function App() {

  return (
   <main className="container mx-auto p-4">
    <h1>Rick and Morty Dashboard</h1>

    <section className="mt-10">
      <FilterDashboard />
    </section>
   </main>
  )
}

export default App
