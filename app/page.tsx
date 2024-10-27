import React  from 'react'; 
import Chart from '../components/Chart';
import Table from '../components/Table';


const HomePage = () => {
  

  return (
    <div className="w-full h-full p-4 flex flex-col border-black">
      <h1 className="text-2xl font-bold mb-4">Stock Analysis Dashboard</h1>
      <div className="mb-8">
        <Chart />
      </div>
      <div>
        <Table />
      </div>
    </div>
  );
};

export default HomePage;
