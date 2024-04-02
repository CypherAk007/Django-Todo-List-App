import {Route, BrowserRouter as Router , Routes} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import UpdateScreen from './screens/UpdateScreen';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeScreen></HomeScreen>} exact></Route>
        <Route path='/todo/edit_task/:id' element={<UpdateScreen></UpdateScreen>}></Route>
      </Routes>

    </Router>

  )
}

export default App;
