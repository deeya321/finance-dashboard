const Home = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <h1 className="text-xl font-bold mb-6">Finance Dashboard</h1>

        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-blue-500">Dashboard</li>
          <li className="cursor-pointer hover:text-blue-500">Transactions</li>
          <li className="cursor-pointer hover:text-blue-500">Insights</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-gray-500">Total Balance</h3>
            <p className="text-xl font-bold">₹50,000</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-gray-500">Income</h3>
            <p className="text-xl font-bold text-green-500">₹80,000</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-gray-500">Expenses</h3>
            <p className="text-xl font-bold text-red-500">₹30,000</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;