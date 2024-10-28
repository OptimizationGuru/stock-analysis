'use client';
import React from 'react';
import Chart from '../components/Chart';
import Table from '../components/Table';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-start">
      <h1 className="text-3xl text-blue-500 font-bold my-4 text-center">
        Stock Analysis Dashboard
      </h1>

      <div className="w-full md:w-[45%] mb-[100px]">
        <Navbar />
      </div>

      <div className="w-full flex justify-center mb-4">
        <Chart />
      </div>

      <div className="w-full max-w-full">
        <Table />
      </div>
    </div>
  );
};

export default HomePage;
