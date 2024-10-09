import Navbar from "@/components/navbar.tsx";
import Hero from "@/components/hero.tsx";
import Footer from "@/components/footer.tsx";


const App = () => {
  return (
    <div className="bg-background flex min-h-screen flex-col overflow-y-auto">
        <Navbar />
        <main className="flex-1 h-full overflow-y-auto">
            <Hero />
        </main>
        <Footer />
    </div>
  )
}

export default App
