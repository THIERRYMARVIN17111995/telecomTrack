export default function Statistiques() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
       
            <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-500 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">2,543</p>
                <p className="text-green-600 text-sm mt-2">↑ 12% from last month</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-500 text-sm">Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">$45,231</p>
                <p className="text-green-600 text-sm mt-2">↑ 8% from last month</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-500 text-sm">Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">1,245</p>
                <p className="text-red-600 text-sm mt-2">↓ 3% from last month</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-500 text-sm">Active Sessions</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">892</p>
                <p className="text-green-600 text-sm mt-2">↑ 5% from last month</p>
            </div>
        </div>
    )
}