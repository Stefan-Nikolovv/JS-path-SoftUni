import { Routes, Route } from "react-router-dom";




import { CreateCar } from "./Components/Create/CreateCar";
import { Details } from "./Components/Details/Details";
import { EditCar } from "./Components/Edit/EditCar";
import { Footer } from "./Components/Footer/Footer";
import { Header } from "./Components/Header/Header";
import { Home } from "./Components/Home/Home";
import { Login } from "./Components/Login/Login";
import { MyList } from "./Components/MyListCars/MyListCars";
import { Register } from "./Components/Register/Register";
import { SearchAllCars } from "./Components/Search/SearchAllCars";
import{ AllCars } from './Components/AllListOfCars/AllCars';
import { AuthComponent } from '../src/contexts/authContext';
import { CarConponent }  from "../src/contexts/carContext";
import { Logout } from "./Components/Logout/Logout";

function App() {
  
  return (
    <AuthComponent>
      <CarConponent>
    <div id="container">
      
      <Header />
      <main id="site-content">
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/catalog" element={<AllCars/>} />
        <Route path="/create" element={<CreateCar/>} />
        <Route path="/edit/:carId" element={<EditCar/>} />
        <Route path="/details/:carId" element={<Details/>} />
        <Route path="/mylist" element={<MyList/>}/>
        <Route path="/search" element={<SearchAllCars/>}/>
        <Route path="/logout" element={<Logout/>}/>
        </Routes>
      </main>

        <Footer/>
    </div>
    </CarConponent>
    </AuthComponent>
    
  );
}

export default App;
