import React, { useState, useEffect } from 'react';
import { Plus, Search, Bell, Sparkles, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOutletContext } from 'react-router-dom';
import { EventManager } from '../models/Event';
import EventCard from '../components/EventCard';
import CreateEventModal from '../components/CreateEventModal';

const DashboardPage = () => {
    const { user } = useAuth();
    const { onAskAura } = useOutletContext();
    const [eventManager] = useState(() => new EventManager());
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [showPastEvents, setShowPastEvents] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    // Debug log
    console.log('DashboardPage rendered, isCreateModalOpen:', isCreateModalOpen);

    // Load events on mount
    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = () => {
        setUpcomingEvents(eventManager.getUpcomingEvents());
        setPastEvents(eventManager.getPastEvents());
    };

    const handleCreateEvent = (eventData) => {
        console.log('🟢 DashboardPage handleCreateEvent called with:', eventData);
        
        if (editingEvent) {
            // Update existing event
            eventManager.updateEvent(editingEvent.id, {
                name: eventData.name,
                date: eventData.date,
                location: eventData.location,
                weather: eventData.weather
            });
            console.log('✏️ Event updated:', editingEvent.id);
            setEditingEvent(null);
        } else {
            // Create new event
            const newEvent = eventManager.addEvent(
                eventData.name,
                eventData.date,
                eventData.location,
                eventData.weather
            );
            console.log('🟢 Event created by EventManager:', newEvent);
        }
        
        // Event listesini güncelle
        loadEvents();
        
        console.log('✅ Event saved to localStorage:', eventData);
        console.log('📋 Updated upcoming events:', eventManager.getUpcomingEvents());
        console.log('📋 Updated past events:', eventManager.getPastEvents());
    };

    const handleEditEvent = (event) => {
        console.log('✏️ Edit event clicked:', event);
        setEditingEvent(event);
        setIsCreateModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsCreateModalOpen(false);
        setEditingEvent(null);
    };

    const handleDeleteEvent = (eventId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            eventManager.deleteEvent(eventId);
            loadEvents();
        }
    };

    return (
        <div className="flex flex-col h-full overflow-y-auto">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <p className="text-gray-300">Welcome</p>
                    <h1 className="text-2xl font-bold">{user ? user.getFullName() : 'Guest User'}</h1>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="glass-panel-light px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/20 transition-colors bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                    >
                        <Plus className="w-4 h-4" /> Create Event
                    </button>
                    <button 
                        onClick={onAskAura} 
                        className="glass-panel-light px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/20 transition-colors"
                    >
                        <Sparkles className="w-4 h-4 text-yellow-300" /> Ask Aura
                    </button>
                    <button className="glass-panel-light p-2 rounded-full hover:bg-white/20 transition-colors">
                        <Search />
                    </button>
                    <button className="glass-panel-light p-2 rounded-full hover:bg-white/20 transition-colors">
                        <Bell />
                    </button>
                </div>
            </div>

            {/* Upcoming Events Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-purple-300">📅 Upcoming Events</h2>
                    <span className="text-sm text-gray-400">
                        {upcomingEvents.length} event{upcomingEvents.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {upcomingEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {upcomingEvents.map(event => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onEdit={handleEditEvent}
                                onDelete={handleDeleteEvent}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="glass-panel-light rounded-2xl p-8 text-center">
                        <div className="text-gray-400">
                            <Calendar className="w-16 h-16 mx-auto mb-2 opacity-50" />
                            <p className="text-lg">No upcoming events</p>
                            <p className="text-sm mt-2">Click "Create Event" button above to get started!</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Past Events Section */}
            <div className="mb-8">
                <button
                    onClick={() => setShowPastEvents(!showPastEvents)}
                    className="flex justify-between items-center w-full mb-4 hover:bg-white/5 p-2 rounded-lg transition-colors"
                >
                    <h2 className="text-xl font-bold text-gray-400">🕒 Past Events</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                            {pastEvents.length} event{pastEvents.length !== 1 ? 's' : ''}
                        </span>
                        <span className={`transform transition-transform ${showPastEvents ? 'rotate-180' : ''}`}>
                            ▼
                        </span>
                    </div>
                </button>

                {showPastEvents && (
                    pastEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {pastEvents.map(event => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    onEdit={handleEditEvent}
                                    onDelete={handleDeleteEvent}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="glass-panel-light rounded-2xl p-6 text-center">
                            <p className="text-gray-500">No past events</p>
                        </div>
                    )
                )}
            </div>

            {/* Create Event Modal */}
            <CreateEventModal 
                isOpen={isCreateModalOpen}
                onClose={handleCloseModal}
                onCreateEvent={handleCreateEvent}
                editingEvent={editingEvent}
            />
        </div>
    );
};

export default DashboardPage;
