import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaPhone, FaClock, FaLocationArrow } from 'react-icons/fa';

const StoreLocator = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStore, setSelectedStore] = useState(null);

    // Dummy store data
    const stores = [
        {
            id: 1,
            name: "Downtown Flagship",
            address: "123 Fashion Ave, New York, NY 10001",
            phone: "(212) 555-0123",
            hours: "Mon-Sat: 10AM - 9PM, Sun: 11AM - 7PM",
            distance: "0.8 miles",
            coordinates: { lat: 40.7128, lng: -74.0060 }
        },
        {
            id: 2,
            name: "Westside Mall",
            address: "456 Shopping Blvd, Paramus, NJ 07652",
            phone: "(201) 555-0199",
            hours: "Mon-Sat: 10AM - 9:30PM, Sun: 11AM - 7PM",
            distance: "12.4 miles",
            coordinates: { lat: 40.9128, lng: -74.0760 }
        },
        {
            id: 3,
            name: "Brooklyn Heights",
            address: "789 Montague St, Brooklyn, NY 11201",
            phone: "(718) 555-0155",
            hours: "Mon-Sat: 10AM - 8PM, Sun: 12PM - 6PM",
            distance: "3.2 miles",
            coordinates: { lat: 40.6960, lng: -73.9933 }
        },
        {
            id: 4,
            name: "Queens Center",
            address: "90-15 Queens Blvd, Elmhurst, NY 11373",
            phone: "(718) 555-0188",
            hours: "Mon-Sat: 10AM - 9:30PM, Sun: 11AM - 8PM",
            distance: "8.5 miles",
            coordinates: { lat: 40.7337, lng: -73.8703 }
        }
    ];

    const filteredStores = stores.filter(store =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Find a Store</h1>
                <p className="text-gray-600">Locate your nearest store to experience our products in person</p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)] min-h-[600px]">

                {/* Sidebar - Search and List */}
                <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                    {/* Search Area */}
                    <div className="p-4 border-b border-gray-100 bg-white z-10">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by city, zip, or store name..."
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                        </div>
                        <button className="flex items-center justify-center w-full mt-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                            <FaLocationArrow className="mr-2" />
                            Use my current location
                        </button>
                    </div>

                    {/* Store List */}
                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                        {filteredStores.length > 0 ? (
                            filteredStores.map(store => (
                                <div
                                    key={store.id}
                                    onClick={() => setSelectedStore(store)}
                                    className={`p-4 rounded-lg cursor-pointer transition border ${selectedStore?.id === store.id ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-200' : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-200'}`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-gray-900">{store.name}</h3>
                                        <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{store.distance}</span>
                                    </div>
                                    <div className="space-y-1.5 text-sm text-gray-600">
                                        <div className="flex items-start">
                                            <FaMapMarkerAlt className="mt-1 mr-2 text-gray-400 flex-shrink-0" />
                                            <span>{store.address}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaClock className="mr-2 text-gray-400 flex-shrink-0" />
                                            <span>{store.hours}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaPhone className="mr-2 text-gray-400 flex-shrink-0" />
                                            <span>{store.phone}</span>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex space-x-2">
                                        <button className="flex-1 py-1.5 text-xs font-medium border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition">
                                            Details
                                        </button>
                                        <button className="flex-1 py-1.5 text-xs font-medium bg-gray-900 text-white rounded hover:bg-black transition">
                                            Directions
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 px-4">
                                <div className="bg-gray-50 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-3">
                                    <FaMapMarkerAlt className="text-2xl text-gray-400" />
                                </div>
                                <h3 className="text-gray-900 font-medium mb-1">No stores found</h3>
                                <p className="text-gray-500 text-sm">Try adjusting your search criteria</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="lg:col-span-2 bg-gray-200 rounded-xl overflow-hidden relative shadow-sm border border-gray-200 min-h-[400px]">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 bg-gray-100">
                        <FaMapMarkerAlt className="text-6xl text-gray-300 mb-4" />
                        <p className="text-lg font-medium">Interactive Map Integration</p>
                        <p className="text-sm text-gray-400 max-w-md text-center mt-2 px-4">
                            (Integrate Google Maps or Mapbox here. This area would typically show the map view of all store locations.)
                        </p>
                        {selectedStore && (
                            <div className="mt-8 bg-white p-6 rounded-xl shadow-lg max-w-sm w-full mx-4 animate-fade-in-up">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedStore.name}</h3>
                                <p className="text-gray-600 mb-4">{selectedStore.address}</p>
                                <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                                    Navigate to Store
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreLocator;