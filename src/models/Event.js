/**
 * Event Model - OOP Design Pattern
 * Represents a weather event with all necessary information
 */

export class Event {
    constructor(id, name, date, location, weather = null, createdAt = new Date()) {
        this.id = id;
        this.name = name;
        this.date = date; // ISO string format
        this.location = location; // { name, coordinates: {lat, lng}, displayName }
        this.weather = weather; // Weather data at the time of creation
        this.createdAt = createdAt;
        this.updatedAt = new Date();
        this.status = this.calculateStatus();
    }

    /**
     * Calculate event status based on date
     * @returns {string} 'upcoming', 'today', or 'past'
     */
    calculateStatus() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const eventDate = new Date(this.date);
        eventDate.setHours(0, 0, 0, 0);

        if (eventDate > today) {
            return 'upcoming';
        } else if (eventDate.getTime() === today.getTime()) {
            return 'today';
        } else {
            return 'past';
        }
    }

    /**
     * Check if event is upcoming
     * @returns {boolean}
     */
    isUpcoming() {
        return this.status === 'upcoming' || this.status === 'today';
    }

    /**
     * Check if event is in the past
     * @returns {boolean}
     */
    isPast() {
        return this.status === 'past';
    }

    /**
     * Get formatted date string
     * @returns {string} Formatted date (e.g., "Jan 15, 2025")
     */
    getFormattedDate() {
        const date = new Date(this.date);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    }

    /**
     * Get days until/since event
     * @returns {number} Positive for future, negative for past
     */
    getDaysUntil() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const eventDate = new Date(this.date);
        eventDate.setHours(0, 0, 0, 0);

        const diffTime = eventDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays;
    }

    /**
     * Get relative time description
     * @returns {string} e.g., "In 3 days", "Today", "2 days ago"
     */
    getRelativeTime() {
        const days = this.getDaysUntil();
        
        if (days === 0) {
            return 'Today';
        } else if (days === 1) {
            return 'Tomorrow';
        } else if (days === -1) {
            return 'Yesterday';
        } else if (days > 0) {
            return `In ${days} days`;
        } else {
            return `${Math.abs(days)} days ago`;
        }
    }

    /**
     * Update event details
     * @param {Object} updates - Object with fields to update
     */
    update(updates) {
        if (updates.name) this.name = updates.name;
        if (updates.date) {
            this.date = updates.date;
            this.status = this.calculateStatus();
        }
        if (updates.location) this.location = updates.location;
        if (updates.weather) this.weather = updates.weather;
        
        this.updatedAt = new Date();
        return this;
    }

    /**
     * Convert to plain object for storage
     * @returns {Object}
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            date: this.date,
            location: this.location,
            weather: this.weather,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
            status: this.status
        };
    }

    /**
     * Create Event instance from plain object
     * @param {Object} data
     * @returns {Event}
     */
    static fromJSON(data) {
        return new Event(
            data.id,
            data.name,
            data.date,
            data.location,
            data.weather,
            new Date(data.createdAt)
        );
    }

    /**
     * Generate unique ID for new event
     * @returns {string}
     */
    static generateId() {
        return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}

/**
 * EventManager - Manages collection of events
 */
export class EventManager {
    constructor() {
        this.events = [];
        this.loadFromStorage();
    }

    /**
     * Add new event
     * @param {Event} event
     */
    addEvent(event) {
        this.events.push(event);
        this.saveToStorage();
        return event;
    }

    /**
     * Get event by ID
     * @param {string} id
     * @returns {Event|null}
     */
    getEventById(id) {
        return this.events.find(event => event.id === id) || null;
    }

    /**
     * Update existing event
     * @param {string} id
     * @param {Object} updates
     */
    updateEvent(id, updates) {
        const event = this.getEventById(id);
        if (event) {
            event.update(updates);
            this.saveToStorage();
        }
        return event;
    }

    /**
     * Delete event
     * @param {string} id
     */
    deleteEvent(id) {
        this.events = this.events.filter(event => event.id !== id);
        this.saveToStorage();
    }

    /**
     * Get all upcoming events (sorted by date)
     * @returns {Event[]}
     */
    getUpcomingEvents() {
        return this.events
            .filter(event => event.isUpcoming())
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    /**
     * Get all past events (sorted by date, most recent first)
     * @returns {Event[]}
     */
    getPastEvents() {
        return this.events
            .filter(event => event.isPast())
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    /**
     * Get all events
     * @returns {Event[]}
     */
    getAllEvents() {
        return [...this.events].sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    /**
     * Get events count
     * @returns {Object} {total, upcoming, past}
     */
    getEventsCount() {
        return {
            total: this.events.length,
            upcoming: this.getUpcomingEvents().length,
            past: this.getPastEvents().length
        };
    }

    /**
     * Save events to localStorage
     */
    saveToStorage() {
        try {
            const data = this.events.map(event => event.toJSON());
            localStorage.setItem('aura_events', JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save events to storage:', error);
        }
    }

    /**
     * Load events from localStorage
     */
    loadFromStorage() {
        try {
            const data = localStorage.getItem('aura_events');
            if (data) {
                const eventsData = JSON.parse(data);
                this.events = eventsData.map(eventData => Event.fromJSON(eventData));
            }
        } catch (error) {
            console.error('Failed to load events from storage:', error);
            this.events = [];
        }
    }

    /**
     * Clear all events
     */
    clearAll() {
        this.events = [];
        this.saveToStorage();
    }
}
