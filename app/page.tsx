'use client';
import React from 'react';
import Chart from '../components/Chart';
import Table from '../components/Table';
import Navbar from '@/components/Navbar';

const HomePage = () => {
  return (
    <div className="w-screen h-full p-4 flex flex-col items-center justify-center border-black">
      <h1 className="text-3xl text-blue-500 font-bold my-4">
        Stock Analysis Dashboard
      </h1>

      <div className="w-[35%] px-4 my-2">
        <Navbar />
      </div>
      <div className="mb-8 w-full flex justify-center">
        <Chart />
      </div>
      <div className="w-full max-w-full justify-center">
        <Table />
      </div>
    </div>
  );
};

export default HomePage;
