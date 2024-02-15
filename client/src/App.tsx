import './App.css'
import Login from "./components/login/login.tsx";
import AuthProvider from "react-auth-kit";
import store from "./misc/store.ts";

function App() {

  return (
    <>
      <AuthProvider store={store}>
          <Login></Login>
      </AuthProvider>
    </>
  )
}

export default App
