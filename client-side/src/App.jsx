import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import ChatBoot from "./components/Chatbot";
import AddPropertyModal from "./components/modals/AddPropertyModal";
import SearchModal from "./components/modals/SearchModal";

function App() {

  return (
    <div className="relative mx-auto min-h-screen bg-beige-primary-bg flex flex-col">
      <Header />
      <HomePage />
      <Footer />
      <ChatBoot />
      
      <AddPropertyModal/>
      <SearchModal/>
    </div>
  )
}

export default App;