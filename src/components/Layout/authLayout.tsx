import React, { useEffect, useState } from 'react';
import Layout from '.';
import { useNavigate } from 'react-router-dom';

interface AuthLayout {}

export const AuthLayout: React.FC<AuthLayout> = ({}) => {
	const navigate = useNavigate();


	const [user,setUser] = useState(false)

	return (
		<div className="flex flex-col w-screen  h-screen ">
			{user ? (
				<div className=" flex justify-center items-center w-full  h-full">
					Loading..
				</div>
			) : (
				<Layout />
			)}
		</div>
	);
};

export default AuthLayout;
