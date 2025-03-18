import GenderCheckBox from './GenderCheckBox.jsx'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import useSignup from "../../hooks/useSignup.js"

function Signup() {
    const [inputs,setInputs]=useState({
        fullName:" ",
        username:" ",
        password:" ",
        confirmPassword:" ",
        gender:" ",
    })


    const {signup,loading}=useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
       await signup(inputs);

    }    

    const handlecheckbox=(gender)=>{
        setInputs({...inputs,gender});
    }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
            <h1 className="text-3xl font-semibold text-center text-gray-300">
                Sign up
                <span className="text-blue-200 "> Chat-app</span>
            </h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">Full Name</span>
                    </label>
                    <input type="text" placeholder="Enter your name" className="input w-full input-bordered h-10" 
                    value={inputs.fullName}
                    onChange={(e) => setInputs({...inputs,fullName:e.target.value})}
                    />
                </div>
                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">Username</span>
                    </label>
                    <input type="text" placeholder="username" className="input w-full input-bordered h-10" 
                    value={inputs.username}
                    onChange={(e) => setInputs({...inputs,username:e.target.value})}
                    />
                </div>

                <div>
                    <label className="label">
                        <span className="text-base label-text">Password</span>
                    </label>
                    <input type="text" placeholder="Enter Password" className="input w-full input-bordered h-10"
                    value={inputs.password}
                    onChange={(e) => setInputs({...inputs,password:e.target.value})}
                    />
                </div>

                <div>
                    <label className="label">
                        <span className="text-base label-text">Confirm Password</span>
                    </label>
                    <input type="text" placeholder="Confirm Password" className="input w-full input-bordered h-10" 
                    value={inputs.confirmPassword}
                    onChange={(e) => setInputs({...inputs,confirmPassword:e.target.value})}
                    />
                </div>

                <GenderCheckBox onChangeCheckbox={handlecheckbox} selectedGender={inputs.gender}  />
    
                    <Link to={"/Login"} href="#" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block" >
                       Already have an account?
                    </Link>
                <div>
                    <button className="btn btn-block btn-sm mt-2 border border-slate-700" disabled={loading} >
                        {loading ? <span className='loading loading-spinner'></span>:"Sign Up"}
                    </button>
                </div>
            </form> 
        </div>   
    </div>
  )
}

export default Signup


//STARTER CODE FOR SIGNUP PAGE 
// function Signup() {
//   return (
//     <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//         <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
//             <h1 className="text-3xl font-semibold text-center text-gray-300">
//                 Sign up
//                 <span className="text-blue-200 "> Chat-app</span>
//             </h1>

//             <form action="">
//                 <div>
//                     <label className="label p-2">
//                         <span className="text-base label-text">Full Name</span>
//                     </label>
//                     <input type="text" placeholder="Enter your name" className="input w-full input-bordered h-10"  />
//                 </div>
//                 <div>
//                     <label className="label p-2">
//                         <span className="text-base label-text">Username</span>
//                     </label>
//                     <input type="text" placeholder="username" className="input w-full input-bordered h-10"  />
//                 </div>

//                 <div>
//                     <label className="label">
//                         <span className="text-base label-text">Password</span>
//                     </label>
//                     <input type="text" placeholder="Enter Password" className="input w-full input-bordered h-10"  />
//                 </div>

//                 <div>
//                     <label className="label">
//                         <span className="text-base label-text">Confirm Password</span>
//                     </label>
//                     <input type="text" placeholder="Confirm Password" className="input w-full input-bordered h-10"  />
//                 </div>

//                 <GenderCheckBox/>
    
//                     <a href="#" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block" >
//                        Already have an account?
//                     </a>
//                 <div>
//                     <button className="btn btn-block btn-sm mt-2">Sign up</button>
//                 </div>
//             </form>
//         </div>   
//     </div>
//   )
// }

// export default Signup
