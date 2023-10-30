import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './store';

import Home from './components/home';
import Users from './components/users';
import UserCard from './components/users/card';
import News from './components/news';
import NewsCard from './components/news/card';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:username" element={<UserCard />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:tag" element={<NewsCard />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
