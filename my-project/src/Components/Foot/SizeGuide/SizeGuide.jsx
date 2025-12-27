import React, { useState } from 'react';

// Size Guide Component
const SizeGuide = () => {
    const [activeCategory, setActiveCategory] = useState('womens');
    const [activeSizeSystem, setActiveSizeSystem] = useState('us');
    const [selectedSize, setSelectedSize] = useState(null);
    const [measurementUnit, setMeasurementUnit] = useState('inches');

    // Size categories
    const categories = [
        { id: 'womens', name: "Women's", icon: '👚' },
        { id: 'mens', name: "Men's", icon: '👕' },
        { id: 'kids', name: "Kids'", icon: '👶' },
        { id: 'shoes', name: "Shoes", icon: '👟' }
    ];

    // Size systems
    const sizeSystems = [
        { id: 'us', name: 'US' },
        { id: 'uk', name: 'UK' },
        { id: 'eu', name: 'EU' },
        { id: 'cm', name: 'CM' }
    ];

    // Size charts data
    const sizeCharts = {
        womens: {
            title: "Women's Clothing",
            icon: '👚',
            description: 'For tops, dresses, and bottoms',
            measurement: measurementUnit === 'inches' ? 'Inches' : 'Centimeters',
            columns: measurementUnit === 'inches'
                ? ['US Size', 'Bust', 'Waist', 'Hips']
                : ['US Size', 'Bust (cm)', 'Waist (cm)', 'Hips (cm)'],
            sizes: [
                { size: 'XS', bust: measurementUnit === 'inches' ? '32-33' : '81-84', waist: measurementUnit === 'inches' ? '24-25' : '61-64', hips: measurementUnit === 'inches' ? '34-35' : '86-89' },
                { size: 'S', bust: measurementUnit === 'inches' ? '34-35' : '86-89', waist: measurementUnit === 'inches' ? '26-27' : '66-69', hips: measurementUnit === 'inches' ? '36-37' : '91-94' },
                { size: 'M', bust: measurementUnit === 'inches' ? '36-37' : '91-94', waist: measurementUnit === 'inches' ? '28-29' : '71-74', hips: measurementUnit === 'inches' ? '38-39' : '97-99' },
                { size: 'L', bust: measurementUnit === 'inches' ? '38-39' : '97-99', waist: measurementUnit === 'inches' ? '30-31' : '76-79', hips: measurementUnit === 'inches' ? '40-41' : '102-104' },
                { size: 'XL', bust: measurementUnit === 'inches' ? '40-41' : '102-104', waist: measurementUnit === 'inches' ? '32-33' : '81-84', hips: measurementUnit === 'inches' ? '42-43' : '107-109' },
                { size: '2XL', bust: measurementUnit === 'inches' ? '42-43' : '107-109', waist: measurementUnit === 'inches' ? '34-35' : '86-89', hips: measurementUnit === 'inches' ? '44-45' : '112-114' }
            ]
        },
        mens: {
            title: "Men's Clothing",
            icon: '👕',
            description: 'For shirts, t-shirts, and pants',
            measurement: measurementUnit === 'inches' ? 'Inches' : 'Centimeters',
            columns: measurementUnit === 'inches'
                ? ['US Size', 'Chest', 'Waist', 'Hips']
                : ['US Size', 'Chest (cm)', 'Waist (cm)', 'Hips (cm)'],
            sizes: [
                { size: 'S', chest: measurementUnit === 'inches' ? '34-36' : '86-91', waist: measurementUnit === 'inches' ? '28-30' : '71-76', hips: measurementUnit === 'inches' ? '34-36' : '86-91' },
                { size: 'M', chest: measurementUnit === 'inches' ? '38-40' : '97-102', waist: measurementUnit === 'inches' ? '32-34' : '81-86', hips: measurementUnit === 'inches' ? '38-40' : '97-102' },
                { size: 'L', chest: measurementUnit === 'inches' ? '42-44' : '107-112', waist: measurementUnit === 'inches' ? '36-38' : '91-97', hips: measurementUnit === 'inches' ? '42-44' : '107-112' },
                { size: 'XL', chest: measurementUnit === 'inches' ? '46-48' : '117-122', waist: measurementUnit === 'inches' ? '40-42' : '102-107', hips: measurementUnit === 'inches' ? '46-48' : '117-122' },
                { size: '2XL', chest: measurementUnit === 'inches' ? '50-52' : '127-132', waist: measurementUnit === 'inches' ? '44-46' : '112-117', hips: measurementUnit === 'inches' ? '50-52' : '127-132' },
                { size: '3XL', chest: measurementUnit === 'inches' ? '54-56' : '137-142', waist: measurementUnit === 'inches' ? '48-50' : '122-127', hips: measurementUnit === 'inches' ? '54-56' : '137-142' }
            ]
        },
        kids: {
            title: "Kids' Clothing",
            icon: '👶',
            description: 'Ages 2-12 years',
            measurement: 'Age / Height',
            columns: ['Age', 'Height', 'Chest', 'Waist'],
            sizes: [
                { size: '2T', age: '2 Years', height: '33-35"', chest: '21"', waist: '20"' },
                { size: '3T', age: '3 Years', height: '35-38"', chest: '22"', waist: '20.5"' },
                { size: '4T', age: '4 Years', height: '38-41"', chest: '23"', waist: '21"' },
                { size: '5-6', age: '5-6 Years', height: '41-47"', chest: '24"', waist: '21.5"' },
                { size: '7-8', age: '7-8 Years', height: '47-53"', chest: '26"', waist: '22.5"' },
                { size: '9-10', age: '9-10 Years', height: '53-57"', chest: '28"', waist: '23.5"' },
                { size: '11-12', age: '11-12 Years', height: '57-61"', chest: '30"', waist: '25"' }
            ]
        },
        shoes: {
            title: "Shoes",
            icon: '👟',
            description: 'Footwear sizing',
            measurement: measurementUnit === 'inches' ? 'Inches' : 'Centimeters',
            columns: measurementUnit === 'inches'
                ? ['US Size', 'Length', 'EU Size', 'UK Size']
                : ['US Size', 'Length (cm)', 'EU Size', 'UK Size'],
            sizes: [
                { size: '6', length: measurementUnit === 'inches' ? '9.25"' : '23.5 cm', eu: '38.5', uk: '5.5' },
                { size: '7', length: measurementUnit === 'inches' ? '9.5"' : '24.1 cm', eu: '39.5', uk: '6.5' },
                { size: '8', length: measurementUnit === 'inches' ? '9.75"' : '24.8 cm', eu: '41', uk: '7.5' },
                { size: '9', length: measurementUnit === 'inches' ? '10"' : '25.4 cm', eu: '42', uk: '8.5' },
                { size: '10', length: measurementUnit === 'inches' ? '10.25"' : '26 cm', eu: '43', uk: '9.5' },
                { size: '11', length: measurementUnit === 'inches' ? '10.5"' : '26.7 cm', eu: '44.5', uk: '10.5' },
                { size: '12', length: measurementUnit === 'inches' ? '10.75"' : '27.3 cm', eu: '46', uk: '11.5' }
            ]
        }
    };

    // How to measure guide
    const measurementGuide = [
        {
            title: 'Bust/Chest',
            description: 'Measure around the fullest part of your bust/chest, keeping the tape measure level.',
            icon: '📏',
            image: '👚'
        },
        {
            title: 'Waist',
            description: 'Measure around the narrowest part of your natural waist, typically just above the belly button.',
            icon: '📐',
            image: '🩳'
        },
        {
            title: 'Hips',
            description: 'Measure around the fullest part of your hips, approximately 8 inches below your waist.',
            icon: '📏',
            image: '👖'
        },
        {
            title: 'Inseam',
            description: 'Measure from the crotch seam to the bottom of the leg along the inside seam.',
            icon: '📐',
            image: '🦵'
        }
    ];

    // Fit recommendations
    const fitRecommendations = [
        {
            type: 'Regular Fit',
            description: 'Standard cut with comfortable room throughout the body.',
            icon: '✅',
            bestFor: 'Everyday wear, casual occasions'
        },
        {
            type: 'Slim Fit',
            description: 'Closer to the body with tapered silhouette.',
            icon: '👌',
            bestFor: 'Formal occasions, tailored look'
        },
        {
            type: 'Relaxed Fit',
            description: 'Extra room throughout for maximum comfort.',
            icon: '😌',
            bestFor: 'Lounge wear, athletic activities'
        },
        {
            type: 'Oversized',
            description: 'Intentional loose fit for fashion-forward style.',
            icon: '🌟',
            bestFor: 'Trendy, streetwear style'
        }
    ];

    // Size conversion
    const sizeConversion = {
        womens: [
            { us: 'XS', uk: '6', eu: '34', au: '8' },
            { us: 'S', uk: '8', eu: '36', au: '10' },
            { us: 'M', uk: '10', eu: '38', au: '12' },
            { us: 'L', uk: '12', eu: '40', au: '14' },
            { us: 'XL', uk: '14', eu: '42', au: '16' },
            { us: '2XL', uk: '16', eu: '44', au: '18' }
        ],
        mens: [
            { us: 'S', uk: '36', eu: '46', au: 'S' },
            { us: 'M', uk: '38', eu: '48', au: 'M' },
            { us: 'L', uk: '40', eu: '50', au: 'L' },
            { us: 'XL', uk: '42', eu: '52', au: 'XL' },
            { us: '2XL', uk: '44', eu: '54', au: '2XL' }
        ]
    };

    const currentChart = sizeCharts[activeCategory];

    return (
        <div className="min-h-screen bg-gray-50 p-4 pb-20">
            {/* Header */}
            <header className="mb-6 pt-4">
                <div className="flex items-center mb-2">
                    <button className="mr-3 p-2 rounded-lg bg-white border border-gray-200 shadow-sm">
                        ←
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">Size Guide</h1>
                </div>
                <p className="text-gray-600">Find your perfect fit with our comprehensive size guide</p>
            </header>

            {/* Category Selector */}
            <section className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Select Category</h2>
                <div className="grid grid-cols-2 gap-3">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${activeCategory === category.id
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 bg-white'
                                }`}
                        >
                            <span className="text-2xl mb-2">{category.icon}</span>
                            <span className="font-medium text-gray-800">{category.name}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* Size System Toggle */}
            <section className="mb-6">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold text-gray-800">Size System</h2>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setMeasurementUnit('inches')}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${measurementUnit === 'inches'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700'
                                }`}
                        >
                            Inches
                        </button>
                        <button
                            onClick={() => setMeasurementUnit('cm')}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${measurementUnit === 'cm'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700'
                                }`}
                        >
                            CM
                        </button>
                    </div>
                </div>

                <div className="flex overflow-x-auto pb-2">
                    {sizeSystems.map((system) => (
                        <button
                            key={system.id}
                            onClick={() => setActiveSizeSystem(system.id)}
                            className={`flex-shrink-0 px-4 py-3 mr-2 rounded-lg font-medium ${activeSizeSystem === system.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 border border-gray-200'
                                }`}
                        >
                            {system.name}
                        </button>
                    ))}
                </div>
            </section>

            {/* Size Chart */}
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 flex items-center">
                            <span className="mr-2">{currentChart.icon}</span>
                            {currentChart.title}
                        </h2>
                        <p className="text-gray-600 text-sm mt-1">{currentChart.description}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-gray-500">Measurements in</div>
                        <div className="font-medium text-gray-800">{currentChart.measurement}</div>
                    </div>
                </div>

                {/* Size Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    {currentChart.columns.map((column, index) => (
                                        <th
                                            key={index}
                                            className="py-3 px-4 text-left font-semibold text-gray-700 text-sm"
                                        >
                                            {column}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {currentChart.sizes.map((row, rowIndex) => (
                                    <tr
                                        key={rowIndex}
                                        className={`border-t border-gray-100 ${selectedSize === row.size ? 'bg-blue-50' : 'hover:bg-gray-50'
                                            }`}
                                        onClick={() => setSelectedSize(row.size)}
                                    >
                                        <td className="py-3 px-4 font-bold text-gray-800">
                                            {row.size}
                                            {selectedSize === row.size && (
                                                <span className="ml-2 text-blue-600">✓</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-gray-700">{row.bust || row.chest || row.age || row.length}</td>
                                        <td className="py-3 px-4 text-gray-700">{row.waist || row.eu}</td>
                                        <td className="py-3 px-4 text-gray-700">{row.hips || row.uk || row.chest}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {selectedSize && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <div className="flex items-center">
                            <span className="text-blue-600 mr-3">✅</span>
                            <div>
                                <p className="font-medium text-gray-800">
                                    Selected: <span className="font-bold">{selectedSize}</span>
                                </p>
                                <p className="text-gray-600 text-sm mt-1">
                                    This size has been added to your selection
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* How to Measure */}
            <section className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">📏</span> How to Measure
                </h2>

                <div className="grid grid-cols-2 gap-3">
                    {measurementGuide.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-xl border border-gray-200"
                        >
                            <div className="flex items-start mb-3">
                                <div className="text-xl mr-3">{item.icon}</div>
                                <h3 className="font-medium text-gray-800">{item.title}</h3>
                            </div>
                            <div className="text-3xl mb-3 text-center">{item.image}</div>
                            <p className="text-gray-600 text-xs">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Size Conversion */}
            {(activeCategory === 'womens' || activeCategory === 'mens') && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">International Size Conversion</h2>

                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="py-3 px-4 text-left font-semibold text-gray-700">US</th>
                                        <th className="py-3 px-4 text-left font-semibold text-gray-700">UK</th>
                                        <th className="py-3 px-4 text-left font-semibold text-gray-700">EU</th>
                                        <th className="py-3 px-4 text-left font-semibold text-gray-700">AU</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sizeConversion[activeCategory].map((row, index) => (
                                        <tr key={index} className="border-t border-gray-100">
                                            <td className="py-3 px-4 font-medium text-gray-800">{row.us}</td>
                                            <td className="py-3 px-4 text-gray-700">{row.uk}</td>
                                            <td className="py-3 px-4 text-gray-700">{row.eu}</td>
                                            <td className="py-3 px-4 text-gray-700">{row.au}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            )}

            {/* Fit Recommendations */}
            <section className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Fit Recommendations</h2>

                <div className="space-y-3">
                    {fitRecommendations.map((fit, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-xl border border-gray-200"
                        >
                            <div className="flex items-start">
                                <div className="text-xl mr-3">{fit.icon}</div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-medium text-gray-800">{fit.type}</h3>
                                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                            {fit.bestFor}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm mt-1">{fit.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tips */}
            <section className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Size Tips</h2>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-100">
                    <div className="space-y-4">
                        <div className="flex">
                            <span className="text-blue-600 mr-3">💡</span>
                            <div>
                                <h3 className="font-medium text-gray-800 mb-1">Compare to a Similar Item</h3>
                                <p className="text-gray-600 text-sm">Compare measurements to a similar item you own that fits well.</p>
                            </div>
                        </div>

                        <div className="flex">
                            <span className="text-blue-600 mr-3">📝</span>
                            <div>
                                <h3 className="font-medium text-gray-800 mb-1">Consider the Fabric</h3>
                                <p className="text-gray-600 text-sm">Stretchy fabrics may allow for a tighter fit than non-stretchy ones.</p>
                            </div>
                        </div>

                        <div className="flex">
                            <span className="text-blue-600 mr-3">🎯</span>
                            <div>
                                <h3 className="font-medium text-gray-800 mb-1">Check Product Reviews</h3>
                                <p className="text-gray-600 text-sm">See what other customers say about sizing for specific items.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
                <div className="max-w-md mx-auto">
                    <div className="flex space-x-3">
                        <button className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                            Save My Size
                        </button>
                        <button className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                            Print Guide
                        </button>
                    </div>
                    <p className="text-center text-gray-500 text-xs mt-3">
                        Still unsure? Chat with our styling experts for personalized advice.
                    </p>
                </div>
            </section>
        </div>
    );
};

// Main App Component
const App = () => {
    return (
        <div className="max-w-md mx-auto bg-white min-h-screen">
            <SizeGuide />
        </div>
    );
};

export default SizeGuide;