import React, { useState } from 'react';

const BranchSelector = ({
  repo,
  changeRepo,
  branch,
  changeBranch,
  getTree,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <div className='flex flex-col justify-end md:pr-4'>
      <div className='relative'>
        <button
          className='text-white bg-slate-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-4 py-2.5 text-center inline-flex items-center'
          type='button'
          onClick={toggleMenu}
        >
          Branch
          <svg
            class='w-4 h-4 ml-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 9l-7 7-7-7'
            ></path>
          </svg>
        </button>
        <ul
          className={`${
            isOpen ? '' : 'hidden'
          }  bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow absolute min-w-max`}
          id='dropdown'
        >
          <li className='p-2 w-full'>Hola esto es una branch algo larga</li>
          <li className='p-2 w-full'>Hola esto es una branch algo larga</li>
          <li className='p-2 w-full'>Hola esto es una branch algo larga</li>
          <li className='p-2 w-full'>Hola esto es una branch algo larga</li>
        </ul>
      </div>
    </div>
  );
};

export default BranchSelector;
