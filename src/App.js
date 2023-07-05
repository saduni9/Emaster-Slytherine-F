import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import HomePage from './pages/HomePage';
import TeacherDashboard from "../src/components/TeacherSideNav";
import TeacherReg from './pages/TeacherReg';
import TeacherSignin from './pages/TeacherSignin';
import SignIn from "./pages/SignIn";
import CourseDetail from "./pages/CourseDetail";
import SingleCourse from "./pages/SingleCourse";
import AdminSideNav from "./components/AdminSideNav";
import ShoppingCart from "./pages/ShoppingCart";
import UserCourseInfo from "./pages/UserCourseInfo";
import StudentRegister from "./pages/StudentRegister";
import AddCourseForm from "../src/components/AddCourseForm";
import EarningsCard from "../src/components/EarningsCard";
import MyCoursesCard from "../src/components/MyCoursesCard";
import Forum from "../src/components/Forum";
import AboutUs from "./pages/AboutUs";
import ForgotPassword from  "./pages/ForgetP"
import ResetPassword from "./pages/ResetP";


function App() {
  return (
      <Routes>
              <Route index element={<HomePage/>}/>
              <Route path="/about" element={<AboutUs/>}/>
              <Route path="/teacher_reg" element={<TeacherReg/>}/>
              <Route path="/teacher_signin" element={<TeacherSignin/>}/>
              <Route path="/student_reg" element={<StudentRegister/>}/>
              <Route path="/admin_dash" element={<AdminSideNav/>}/>
              <Route path="/admin_side_nav" element={<AdminSideNav/>}/>
              <Route path="/signin" element={<SignIn/>}/>
              <Route path="/course_detail" element={<CourseDetail/>}/>
              <Route path="/single_course/:id" element={<SingleCourse/>}/>
              <Route path="/teacher_dash" element={<TeacherDashboard/>}/>
              <Route path="/shopping_cart" element={<ShoppingCart/>}/>
              <Route path="/user_course_info" element={<UserCourseInfo/>}/>
              <Route path="/earnings_card" element={<EarningsCard/>}/>
              <Route path="/my_courses_card" element={<MyCoursesCard/>}/>
              <Route path="/forum" element={<Forum/>}/>
              <Route path="/add_course" element={<AddCourseForm/>}/>
              <Route path="/forgotPassword" element={<ForgotPassword/>}/>
              <Route path="/resetPassword" element={<ResetPassword/>}/>
      </Routes>


  );
}

export default App;
