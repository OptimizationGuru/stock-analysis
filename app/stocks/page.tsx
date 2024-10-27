import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {StockChart} from '../../components/Chart';
import DataTable from '../../components/Table';
import { updateData, setMockData } from '../../redux/stocksSlice';

const StocksPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const ws = new WebSocket('ws://stocks-live-server.com');
    
    ws.onmessage = (event) => {
      const liveData = JSON.parse(event.data);
      dispatch(updateData(liveData));
    };

    ws.onerror = () => dispatch(setMockData());

    return () => ws.close();
}, [dispatch]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Stock Analysis</h1>
      {/* <StockChart /> */}
      <DataTable />
    </div>
  );
};

export default StocksPage;
