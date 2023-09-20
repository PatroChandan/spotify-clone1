import { Icon } from '@iconify/react';
import TextInput from '../components/shared/TextInput';
import PasswordInput from '../components/shared/PasswordInput';
import { Link } from 'react-router-dom';


const SignupComponent = () =>{
    return(
        <div className="w-full h-full flex flex-col items-center">
            <div className='logo p-5 border-b border-solid border-b-gray-400 w-full flex justify-center'>
                <Icon icon="logos:spotify" width={'150'}/>
            </div>
            <div className='inputRegion w-1/4 py-10 flex items-center justify-center flex-col'>
                <div className='font-bold mb-4 text-lg'>
                    Sign up for free to start listening.
                </div>
                <TextInput label={"Email address"} placeholder={"Enter your Email"} className={"my-6"}/>
                <TextInput label={"Confirm Email address"} placeholder={"Enter your Email again"} className={"my-6"}/>
                <PasswordInput label={"Create Password"} placeholder={"Create Password"}/>
                <TextInput label={"What should we call you?"} placeholder={"Enter a profile name"} className={"my-6"}/>
                <div className='w-full flex items-center justify-center my-10'>
                    <button className='bg-green-400 text-lg font-semibold p-3 px-10 rounded-full'>
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