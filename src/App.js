import { QueryClient, QueryClientProvider } from "react-query";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import ResponsiveGrid from "./components/ResponsiveGrid";
import Layout from './Layouts/Layout'
import {Routes ,Route} from 'react-router-dom'
import './styles/style.scss'
function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/products" element={<ResponsiveGrid/>}>
    
            </Route>

          </Route>
       

        </Routes>
       
      </div>
    </QueryClientProvider>
  );
}

export default App;
