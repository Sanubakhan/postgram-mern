import {Route, Routes} from 'react-router-dom';

import LoginUser from './Userauth/loginuser.jsx';
import RegisterUser from './Userauth/registeruser.jsx';
import ProfilePage from './Profile/Userprofile.jsx';
import EditProfile from './Profile/EditProfile.jsx';
import CreateProfile from './Profile/CreateProfile.jsx';
import Createpost from './Profile/Createpost.jsx';
import Home from './Home.jsx';

const App = () => {
  return (
    <div className='h-screen w-full bg-black'>
      <Routes>
        <Route path="/" element={<LoginUser />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/userprofile/:username" element={<ProfilePage />} />
        <Route path="/userprofile/:username/edit" element={<EditProfile />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="create-post" element={<Createpost />} />
        <Route path="/feed" element={<Home />} />


      </Routes>
     



    </div>
  )
}

export default App