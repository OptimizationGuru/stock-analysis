import React from 'react';
import Chart from '../components/Chart';
import Table from '../components/Table';

const HomePage = () => {
  return (
    <div className="w-screen h-full p-4 flex flex-col items-center justify-center border-black">
      <h1 className="text-3xl text-blue-500 font-bold mb-4">
        Stock Analysis Dashboard
      </h1>
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
