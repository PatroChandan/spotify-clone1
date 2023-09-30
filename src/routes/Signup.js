import { Icon } from '@iconify/react';
import TextInput from '../components/shared/TextInput';
import PasswordInput from '../components/shared/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelpers';
import { useCookies } from 'react-cookie';


const SignupComponent = () =>{
    
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [cookie,setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const signUp = async () =>{
        // const data = {username,email,password};
        const response = await makeUnauthenticatedPOSTRequest("/user/signup",username,email,password);
        if(response){
            console.log(response.data);
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token",token,{path:"/",expires:date});
            alert("Success");
            navigate("/home")
        }else{
            alert("Failure");
        }
    }

    return(
        <div className="w-full h-full flex flex-col items-center">
            <div className='logo p-5 border-b border-solid border-b-gray-400 w-full flex justify-center'>
                <Icon icon="logos:spotify" width={'150'}/>
            </div>
            <div className='inputRegion w-1/4 py-10 flex items-center justify-center flex-col'>
                <div className='font-bold mb-4 text-lg'>
                    Sign up for free to start listening.
                </div>
                <TextInput label={"User Name"} placeholder={"Enter your User name"} className={"my-4"} 
                    value={username}
                    setValue={setUsername}
                />

                <TextInput label={"Email address"} placeholder={"Enter your Email"} className={"my-4"}
                    value={email}
                    setValue={setEmail}
                />
                
                <PasswordInput label={"Create Password"} placeholder={"Create Password"} className={"my-4"}
                    value={password}
                    setValue={setPassword }
                />
                
                <div className='w-full flex items-center justify-center my-10'>
                    <button className='bg-green-400 text-lg font-semibold p-3 px-10 w-full rounded-full'
                    onClick={(e)=>{
                        e.preventDefault();
                        signUp();
                    }}
                    >
                        SIGN UP
                    </button>
                </div>
                <div className='w-full border border-solid border-gray-300'></div>
                <div className='my-6 font-semibold text-lg'>
                    Already have an account?
                </div>
                <div className='border border-gray-500 text-gray-500 w-full flex items-center justify-center py-3 rounded-full font-bold'>
                <Link to={"/login"}>
                LOG IN INSTEAD
                </Link>
                    
                </div>
            </div>
        </div>
    )
}
export default SignupComponent;