import React, {useState} from "react";
import "../styles/NavBar.css";
import { Link } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { SlArrowRight } from "react-icons/sl";
import { AiFillCaretDown} from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";

export default function LoggedUserNavBar()
{
    const [gradeSelectLogic, setGradeSelectLogic] = useState(false);
    const [subMenuLogic, setSubMenuLogic] = useState(false);
    const [subContentLogic, setSubContentLogic] = useState(false);
    const [showInput, setShowInput] = useState(false);

    const unSetMouse = () => {
      setShowInput(false);
    };
  
    const setMouse = () => {
      setShowInput(true);
    };
    const [gradeList, setGradeList] = useState([
        {
            grade: 'Grade 1',
            subjects: [
              
                    {
                        SubName: 'English',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
                    { 
                        SubName: 'Sinhala',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
              
               ]
        }, 
        {
            grade: 'Grade 2',
            subjects: [
              
                    {
                        SubName: 'English',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
                    { 
                        SubName: 'Sinhala',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
              
               ]
        }, 
        {
            grade: 'Grade 3',
            subjects: [
              
                    {
                        SubName: 'English',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
                    { 
                        SubName: 'Sinhala',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
                    { 
                        SubName: 'Environment',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
                    { 
                        SubName: 'Buddhism',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
              
               ]
        }, 
        {
            grade: 'Grade 4',
            subjects: [
              
                    {
                        SubName: 'English',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
                    { 
                        SubName: 'Sinhala',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
                    {
                        SubName: 'Buddhism',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
                    { 
                        SubName: 'Art',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
               ]
        }, 
        {
            grade: 'Grade 5',
            subjects: [
              
                    {
                        SubName: 'English',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
                    { 
                        SubName: 'Sinhala',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
              
               ]
        }, 
        {
            grade: 'Grade 6',
            subjects: [
              
                    {
                        SubName: 'English',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
                    { 
                        SubName: 'Sinhala',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
                    {
                        SubName: 'Science',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
                    { 
                        SubName: 'Maths',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
               ]
        }, 
        {
            grade: 'Grade 7',
            subjects: [
              
                    {
                        SubName: 'English',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
                    { 
                        SubName: 'Sinhala',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
              
               ]
        }, 
        {
            grade: 'Grade 8',
            subjects: [
              
                    {
                        SubName: 'English',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
                    { 
                        SubName: 'Sinhala',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
              
               ]
        }, 
        {
            grade: 'Grade 9',
            subjects: [
              
                    {
                        SubName: 'English',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
                    { 
                        SubName: 'Sinhala',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
              
               ]
        }, 
        {
            grade: 'Grade 10',
            subjects: [
              
                    {
                        SubName: 'English',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
                    { 
                        SubName: 'Sinhala',
                        SubContent:
                        ['Grammer', 'Spoken', 'Writing', 'Essays', 'Recitation']
                    },
                    {
                        SubName: 'ICT',
                        SubContent:
                        ['Database', 'Excel', 'Java', 'Essays', 'Recitation']
                    },
                    { 
                        SubName: 'Commerce',
                        SubContent:
                        ['Accounts', 'Business', 'Writing', 'Essays', 'Recitation']
                    },
              
               ]
        }, 
    ]
    )


    function handleGrade()
    {
        setSubMenuLogic(false);
        setGradeSelectLogic(false);
        setSubContentLogic(false);
    }



    return(
        <>
        <div className="navbar-container">
            <div className="navbar-left-section">
                <Link to="/admin_side_nav" className="navbar-menu-item" style={{color:'black'}}><div className="navbar-logo-section">eMaster</div></Link>
                <div className="navbar-menu-section">

                {showInput ? (
                    <li className="navbar-menu-item search ">
                    | &nbsp;
                    <input
                        placeholder="Search..."
                        onMouseLeave={unSetMouse}
                        onMouseEnter={setMouse}
                    />
                    </li>
                ) : (
                    <li className="navbar-menu-item">
                    | &nbsp;
                    <BiSearch size={22}
                        onMouseLeave={unSetMouse}
                        onMouseEnter={setMouse}
                    />
                    </li>
                )}

                    <Link to="/" className="navbar-menu-item">Home</Link>
                    <Link to="/teacher_signin"  className="navbar-menu-item">TeachWithUs</Link>
                    <li className="navbar-menu-item nav-grade" onClick={(e)=>{setGradeSelectLogic(true)}}>Grade <AiFillCaretDown size={10} /></li>
                    {gradeSelectLogic && 
                    <div className="navbar-gradelist-content" style={{display:'block'}}>
                        <ul>
                        {gradeList.map((item)=>(
                            <div>
                                <li className="navbar-gradelist-item" key={item.grade}>{item.grade} <SlArrowRight className="navbar-gradelist-sub-item-icon" onClick={(e)=>{setSubMenuLogic(true)}}/></li>
                                {subMenuLogic && 
                                    <div className="navbar-gradelist-sub-content" style={{display:"block"}}>
                                        <ul>
                                        {item.subjects.map((data,id)=>(  
                                            <div>
                                                <li className="navbar-gradelist-sub-item" key={id}>{data.SubName}<SlArrowRight className="navbar-gradelist-sub-item-icon" onClick={(e)=>{setSubContentLogic(true)}}/></li>

                                                {subContentLogic && 
                                                    <div className="navbar-gradelist-sub-item-content" style={{display:"block"}}>
                                                        <ul>
                                                        {data.SubContent.map((subitem,id)=>( 
                                                            <li className="navbar-gradelist-sub-item final-item" onClick={handleGrade} key={id}>{subitem}</li>
                                                         ))}
                                                        </ul>
                                                    </div>
                                                }
                                            </div>
                                        ))}
                                        </ul>
                                    </div>
                                }
                            </div>
                            ))}
                        </ul>
                    </div>
            }
                    <Link to="/teacher_dash" className="navbar-menu-item">AboutUs</Link>
                </div>
                            
            </div>
            <div className="navbar-cart-section">
                <Link to="/shopping_cart"><li className="navbar-cart-section-item cart"><BsFillCartFill size={25}/></li></Link>
                <li className="navbar-cart-section-item cart" style={{marginRight:'1rem'}}><BiUserCircle size={25}/></li>
                
            </div>
        </div>
        </>
    );
}