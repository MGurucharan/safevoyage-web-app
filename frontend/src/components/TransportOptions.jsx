import React from 'react';
import { ArrowLeft, Plane, Car, Bus, Train, Clock, DollarSign, ArrowRight, Zap, Wallet } from 'lucide-react';

const TransportOptions = ({ from, to, category, onBack }) => {
  // Mock transport data - TODO: Integrate with real transportation APIs for live pricing and availability
  const getTransportOptions = () => {
    if (category === 'international') {
      return [
        {
          id: 1,
          type: 'flight',
          icon: Plane,
          name: 'Direct Flight',
          duration: '8h 45m',
          cost: '$650',
          details: 'Emirates Airlines - 1 stop in Dubai',
          color: 'from-blue-500 to-blue-600',
          type_label: 'Fastest',
          savings: null
        },
        {
          id: 2,
          type: 'flight',
          icon: Plane,
          name: 'Budget Flight',
          duration: '12h 30m',
          cost: '$420',
          details: 'Air India - 2 stops',
          color: 'from-green-500 to-green-600',
          type_label: 'Cheapest',
          savings: '$230'
        }
      ];
    } else {
      return [
        {
          id: 1,
          type: 'flight',
          icon: Plane,
          name: 'Domestic Flight',
          duration: '2h 15m',
          cost: '$120',
          details: 'IndiGo Airlines - Direct',
          color: 'from-blue-500 to-blue-600',
          type_label: 'Fastest',
          savings: null
        },
        {
          id: 2,
          type: 'train',
          icon: Train,
          name: 'Express Train',
          duration: '8h 30m',
          cost: '$25',
          details: 'Rajdhani Express - AC 2-Tier',
          color: 'from-green-500 to-green-600',
          type_label: 'Cheapest',
          savings: '$95'
        },
        {
          id: 3,
          type: 'bus',
          icon: Bus,
          name: 'Luxury Bus',
          duration: '12h 45m',
          cost: '$18',
          details: 'Volvo Multi-Axle - Sleeper',
          color: 'from-orange-500 to-orange-600',
          type_label: 'Budget',
          savings: '$102'
        },
        {
          id: 4,
          type: 'car',
          icon: Car,
          name: 'Private Car',
          duration: '10h 20m',
          cost: '$85',
          details: 'Self-drive or with driver',
          color: 'from-purple-500 to-purple-600',
          type_label: 'Flexible',
          savings: null
        }
      ];
    };
  };

  const transportOptions = getTransportOptions();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-bold text-gray-900">Transportation Options</h4>
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="font-semibold text-gray-900">{from}</span>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400" />
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="font-semibold text-gray-900">{to}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transportOptions.map((option) => {
          const Icon = option.icon;
          return (
            <div
              key={option.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-blue-300 relative overflow-hidden"
            >
              {/* Type Label */}
              {option.type_label && (
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    option.type_label === 'Fastest' ? 'bg-blue-100 text-blue-700' :
                    option.type_label === 'Cheapest' ? 'bg-green-100 text-green-700' :
                    option.type_label === 'Budget' ? 'bg-orange-100 text-orange-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {option.type_label === 'Fastest' && <Zap className="h-3 w-3 inline mr-1" />}
                    {option.type_label === 'Cheapest' && <Wallet className="h-3 w-3 inline mr-1" />}
                    {option.type_label}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${option.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {option.cost}
                    {option.savings && (
                      <div className="text-sm text-green-600 font-medium">Save {option.savings}</div>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">per person</div>
                </div>
              </div>

              <h5 className="font-bold text-gray-900 mb-2">{option.name}</h5>
              <p className="text-sm text-gray-600 mb-4">{option.details}</p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{option.duration}</span>
                </div>
                <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm font-semibold">
                  Book Now
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="mt-6 space-y-4">
        <div className="p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Prices and timings are estimates. Actual costs may vary based on season, availability, and booking time.
          </p>
        </div>
        
        {/* TODO: Integrate with real transportation APIs for live pricing and availability */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-green-600 font-bold text-lg">Free Cancellation</div>
            <div className="text-green-700 text-sm">Up to 24 hours before</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-purple-600 font-bold text-lg">SafeVoyage Protected</div>
            <div className="text-purple-700 text-sm">Travel insurance included</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportOptions;