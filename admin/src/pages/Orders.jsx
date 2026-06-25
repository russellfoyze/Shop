import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../config';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/order/list', {
        headers: { token },
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        setError(response.data.message || 'Failed to load orders');
      }
    } catch (err) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (orderId, status) => {
    try {
      await axios.post(
        backendUrl + '/api/order/update-status',
        { orderId, status },
        { headers: { token } }
      );
      fetchOrders();
    } catch (err) {
      setError(err.message || 'Failed to update status');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Orders</p>
            <h1 className="text-4xl font-semibold text-white">Latest orders</h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-400">Review and manage every order in one place.</p>
          </div>
        </div>

        <div className="rounded-[32px] bg-slate-900/90 border border-slate-800 p-6 shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Recent orders</p>
              <h2 className="text-2xl font-semibold text-white">Latest items</h2>
            </div>
            <p className="text-sm text-slate-400">Showing latest {orders.length} orders</p>
          </div>

          {loading && <p className="mt-6 text-slate-400">Loading orders...</p>}
          {error && <p className="mt-6 text-rose-400">{error}</p>}
          {!loading && !error && orders.length === 0 && <p className="mt-6 text-slate-400">No orders found.</p>}

          <div className="mt-6 grid gap-4 xl:grid-cols-4">
            {orders.map((order) => {
              const getStatusStyle = () => {
                if (['Done', 'Delivered', 'Completed'].includes(order.status)) {
                  return 'border-emerald-300 bg-emerald-950/40';
                } else if (['Cancelled', 'Canceled'].includes(order.status)) {
                  return 'border-rose-300 bg-rose-950/40';
                } else if (['Returned'].includes(order.status)) {
                  return 'border-purple-300 bg-purple-950/40';
                } else if (order.status === 'Pending') {
                  return 'border-blue-300 bg-blue-950/40';
                }
                return 'border-slate-800 bg-slate-950/40';
              };

              return (
                <div key={order._id} className={`overflow-hidden rounded-[32px] border-2 ${getStatusStyle()} shadow-xl flex flex-col`}>
                  <div className="h-[180px] w-full overflow-hidden bg-slate-950">
                    <img
                      src={order.items[0]?.image || 'https://via.placeholder.com/400x200?text=No+Image'}
                      alt={order.items[0]?.name || 'Order image'}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-4 gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Product</p>
                      <p className="text-lg font-semibold text-white truncate">{order.items[0]?.name || 'Order item'}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
                      <div>
                        <p className="uppercase tracking-[0.3em] text-slate-500">Size</p>
                        <p className="mt-1 text-white">{order.items[0]?.size || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="uppercase tracking-[0.3em] text-slate-500">Qty</p>
                        <p className="mt-1 text-white">{order.items[0]?.quantity || 0}</p>
                      </div>
                    </div>
                    <div className="text-sm text-slate-300">
                      <p className="uppercase tracking-[0.3em] text-slate-500">Delivery</p>
                      <p className="mt-1 line-clamp-2">{order.address}</p>
                    </div>
                    <div className="text-sm text-slate-300">
                      <p className="uppercase tracking-[0.3em] text-slate-500">Payment</p>
                      <p className="mt-1">{order.paymentMethod}</p>
                    </div>
                    <div className="grid gap-2 grid-cols-3 pt-2">
                      <button onClick={() => changeStatus(order._id, 'Done')} className="rounded-xl bg-emerald-600 px-2 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700">Done</button>
                      <button onClick={() => changeStatus(order._id, 'Cancelled')} className="rounded-xl bg-rose-600 px-2 py-2 text-xs font-semibold text-white transition hover:bg-rose-700">Cancel</button>
                      <button onClick={() => changeStatus(order._id, 'Returned')} className="rounded-xl bg-purple-600 px-2 py-2 text-xs font-semibold text-white transition hover:bg-purple-700">Return</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
