import React from 'react';
import { MapPin, Calendar, Edit2, Trash2, CloudSun } from 'lucide-react';

/**
 * EventCard Component
 * Displays event information in a card format
 */
const EventCard = ({ event, onEdit, onDelete }) => {
    const getStatusColor = () => {
        switch (event.status) {
            case 'today':
                return 'border-yellow-500/30 bg-yellow-500/10';
            case 'upcoming':
                return 'border-purple-500/30 bg-purple-500/10';
            case 'past':
                return 'border-gray-500/30 bg-gray-500/10';
            default:
                return 'border-white/20';
        }
    };

    const getStatusBadge = () => {
        switch (event.status) {
            case 'today':
                return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">Today</span>;
            case 'upcoming':
                return <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">{event.getRelativeTime()}</span>;
            case 'past':
                return <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full">{event.getRelativeTime()}</span>;
            default:
                return null;
        }
    };

    return (
        <div className={`glass-panel-light rounded-2xl p-4 border-2 ${getStatusColor()} hover:bg-white/10 transition-all`}>
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-white truncate">{event.name}</h3>
                    {getStatusBadge()}
                </div>
                <div className="flex gap-2 ml-2">
                    <button
                        onClick={() => onEdit(event)}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        title="Edit event"
                    >
                        <Edit2 className="w-4 h-4 text-blue-400" />
                    </button>
                    <button
                        onClick={() => onDelete(event.id)}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        title="Delete event"
                    >
                        <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-300">{event.getFormattedDate()}</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-pink-400" />
                <span className="text-sm text-gray-300 truncate">
                    {typeof event.location === 'string' ? event.location : event.location?.name || 'Unknown location'}
                </span>
            </div>

            {/* Weather Info (if available) */}
            {event.weather && (
                <div className="mt-3 pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2">
                        <CloudSun className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs text-gray-400">
                            {event.weather.temperature}°F • Wind {event.weather.windSpeed} mph • Rain {event.weather.chanceOfRain}%
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventCard;
