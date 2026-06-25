import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../config';

const Dashboard = ({ token }) => {
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

  const stats = useMemo(() => {
    const doneCount = orders.filter((order) => ['Done', 'Delivered', 'Completed'].includes(order.status)).length;
    const cancelCount = orders.filter((order) => ['Cancelled', 'Canceled'].includes(order.status)).length;
    const returnedCount = orders.filter((order) => ['Returned'].includes(order.status)).length;
    const pendingCount = orders.filter((order) => order.status === 'Pending').length;
    const totalOrders = orders.length;

    const validOrders = orders.filter((order) => !['Cancelled', 'Canceled', 'Returned'].includes(order.status));
    const revenue = validOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const doneRevenue = orders
      .filter((order) => ['Done', 'Delivered', 'Completed'].includes(order.status))
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const pendingRevenue = orders
      .filter((order) => order.status === 'Pending')
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const months = Array.from({ length: 12 }, (_, index) => ({
      label: monthNames[index],
      key: `${currentYear}-${index}`,
      revenue: 0,
    }));

    const monthMap = months.reduce((acc, month) => {
      acc[month.key] = month;
      return acc;
    }, {});

    validOrders.forEach((order) => {
      const createdAt = order.createdAt ? new Date(order.createdAt) : null;
      if (!createdAt || Number.isNaN(createdAt.getTime())) return;
      if (createdAt.getFullYear() !== currentYear) return;
      const key = `${createdAt.getFullYear()}-${createdAt.getMonth()}`;
      if (monthMap[key]) {
        monthMap[key].revenue += order.totalAmount || 0;
      }
    });

    const monthlyRevenue = months;
    const maxMonthlyRevenue = Math.max(...monthlyRevenue.map((item) => item.revenue), 1);

    return {
      doneCount,
      cancelCount,
      returnedCount,
      pendingCount,
      revenue,
      doneRevenue,
      pendingRevenue,
      totalOrders,
      monthlyRevenue,
      maxMonthlyRevenue,
      statusBreakdown: [
        { label: 'Done', count: doneCount, color: '#16a34a' },
        { label: 'Cancelled', count: cancelCount, color: '#dc2626' },
        { label: 'Returned', count: returnedCount, color: '#a855f7' },
        { label: 'Pending', count: pendingCount, color: '#0ea5e9' },
      ],
    };
  }, [orders]);

  const donutSegments = useMemo(() => {
    const total = stats.totalOrders || 1;
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    let runningOffset = 0;

    return stats.statusBreakdown
      .filter((item) => item.count > 0)
      .map((item) => {
        const ratio = item.count / total;
        const dashArray = `${ratio * circumference} ${circumference}`;
        const dashOffset = runningOffset;
        runningOffset += ratio * circumference;
        return {
          ...item,
          dashArray,
          dashOffset,
        };
      });
  }, [stats]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Analytics</p>
            <h1 className="text-4xl font-semibold text-white">Dashboard</h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-400">Monitor order performance, revenue impact, and return trends from a single dashboard built for operations.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-[32px] bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Total Orders</p>
              <p className="mt-4 text-3xl font-semibold text-white">{stats.totalOrders}</p>
              <p className="mt-2 text-sm text-slate-500">All orders received</p>
            </div>
            <div className="rounded-[32px] bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Revenue</p>
              <p className="mt-4 text-3xl font-semibold text-emerald-400">৳{stats.revenue.toLocaleString()}</p>
              <p className="mt-2 text-sm text-slate-500">Confirmed sales only</p>
            </div>
            <div className="rounded-[32px] bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Completed</p>
              <p className="mt-4 text-3xl font-semibold text-emerald-300">{stats.doneCount}</p>
              <p className="mt-2 text-sm text-slate-500">Finished orders</p>
            </div>
            <div className="rounded-[32px] bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Returns</p>
              <p className="mt-4 text-3xl font-semibold text-purple-300">{stats.returnedCount}</p>
              <p className="mt-2 text-sm text-slate-500">Returned orders</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
          <div className="rounded-[32px] bg-slate-900/90 border border-slate-800 p-6 shadow-xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Sales Trend</p>
                <h2 className="text-2xl font-semibold text-white">Monthly revenue</h2>
              </div>
              <div className="rounded-2xl bg-slate-950/80 px-4 py-3 text-sm text-slate-300 border border-slate-800">
                <span className="font-semibold text-white">Live update</span> • {new Date().toLocaleDateString()}
              </div>
            </div>

            <div className="mt-8 rounded-[32px] bg-slate-950/80 p-5">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-3 w-3 rounded-full bg-fuchsia-400" />
                  <span>Revenue</span>
                </div>
                <div className="text-xs uppercase tracking-[0.3em] text-slate-500">Current month</div>
              </div>
              <div className="mt-6 overflow-hidden rounded-[32px] bg-slate-900/90 p-4">
                <svg viewBox="0 0 360 220" className="h-[260px] w-full">
                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#c084fc" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                    <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[0, 0.25, 0.5, 0.75, 1].map((value) => {
                    const y = 20 + value * 160;
                    const label = Math.round((1 - value) * stats.maxMonthlyRevenue).toLocaleString();
                    return (
                      <g key={value}>
                        <line x1="0" y1={y} x2="360" y2={y} stroke="#334155" strokeWidth="1" />
                        <text x="-6" y={y + 4} fontSize="10" textAnchor="end" fill="#94a3b8">{label}</text>
                      </g>
                    );
                  })}
                  <polyline
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    points={stats.monthlyRevenue.map((point, index) => {
                      const x = index * (360 / (stats.monthlyRevenue.length - 1));
                      const y = 20 + (1 - point.revenue / stats.maxMonthlyRevenue) * 160;
                      return `${x},${y}`;
                    }).join(' ')}
                  />
                  <polygon
                    fill="url(#fillGradient)"
                    points={`0,180 ${stats.monthlyRevenue.map((point, index) => {
                      const x = index * (360 / (stats.monthlyRevenue.length - 1));
                      const y = 20 + (1 - point.revenue / stats.maxMonthlyRevenue) * 160;
                      return `${x},${y}`;
                    }).join(' ')} 360,180`}
                  />
                  {stats.monthlyRevenue.map((point, index) => {
                    const x = index * (360 / (stats.monthlyRevenue.length - 1));
                    const y = 20 + (1 - point.revenue / stats.maxMonthlyRevenue) * 160;
                    return (
                      <circle key={point.key} cx={x} cy={y} r="4" fill="#ec4899" stroke="#fff" strokeWidth="1.5" />
                    );
                  })}
                </svg>
                <div className="mt-4 grid grid-cols-12 gap-2 text-[10px] uppercase tracking-[0.24em] text-slate-500">
                  {stats.monthlyRevenue.map((point) => (
                    <span key={point.key} className="col-span-1 text-center">{point.label}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Done revenue</p>
                <p className="mt-3 text-xl font-semibold text-emerald-300">৳{stats.doneRevenue.toLocaleString()}</p>
              </div>
              <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Pending revenue</p>
                <p className="mt-3 text-xl font-semibold text-blue-300">৳{stats.pendingRevenue.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-6 rounded-[32px] bg-slate-900/90 border border-slate-800 p-6 shadow-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Insights</p>
              <div className="mt-5 grid gap-4">
                <div className="rounded-3xl bg-slate-950/80 border border-slate-800 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Average order value</p>
                  <p className="mt-3 text-xl font-semibold text-white">৳{(stats.totalOrders ? Math.round(stats.revenue / stats.totalOrders) : 0).toLocaleString()}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 border border-slate-800 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Pending impact</p>
                  <p className="mt-3 text-xl font-semibold text-blue-300">৳{stats.pendingRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] bg-slate-900/90 border border-slate-800 p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Order Mix</p>
                <h2 className="text-2xl font-semibold text-white">Status Distribution</h2>
              </div>
              <div className="rounded-2xl bg-slate-950/80 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-400 border border-slate-800">Live</div>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-6">
              <div className="relative h-56 w-56">
                <svg viewBox="0 0 200 200" className="h-full w-full">
                  <circle cx="100" cy="100" r="70" fill="none" stroke="#0f172a" strokeWidth="28" />
                  {donutSegments.map((segment) => (
                    <circle
                      key={segment.label}
                      cx="100"
                      cy="100"
                      r="70"
                      fill="none"
                      stroke={segment.color}
                      strokeWidth="28"
                      strokeDasharray={segment.dashArray}
                      strokeDashoffset={segment.dashOffset}
                      strokeLinecap="round"
                      transform="rotate(-90 100 100)"
                    />
                  ))}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-slate-950/90 p-4 text-center shadow-[0_0_0_8px_rgba(15,23,42,0.7)]">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Total</p>
                    <p className="mt-2 text-3xl font-semibold text-white">{stats.totalOrders}</p>
                  </div>
                </div>
              </div>
              <div className="grid w-full gap-3">
                {stats.statusBreakdown.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-3xl bg-slate-950/90 border border-slate-800 p-4">
                    <span className="inline-flex h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-300">{item.label}</p>
                      <p className="truncate text-sm font-semibold text-white">{item.count} orders</p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.3em] text-slate-500">{Math.round((item.count / Math.max(stats.totalOrders, 1)) * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
