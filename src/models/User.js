/**
 * User Model - OOP Design Pattern
 * Extended user model with name and surname
 */

export class User {
    constructor(name, surname, email, createdAt = new Date()) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = new Date();
    }

    /**
     * Get full name
     * @returns {string}
     */
    getFullName() {
        return `${this.name} ${this.surname}`;
    }

    /**
     * Get initials
     * @returns {string}
     */
    getInitials() {
        return `${this.name.charAt(0)}${this.surname.charAt(0)}`.toUpperCase();
    }

    /**
     * Get first name only
     * @returns {string}
     */
    getFirstName() {
        return this.name;
    }

    /**
     * Update user details
     * @param {Object} updates
     */
    update(updates) {
        if (updates.name) this.name = updates.name;
        if (updates.surname) this.surname = updates.surname;
        if (updates.email) this.email = updates.email;
        
        this.updatedAt = new Date();
        return this;
    }

    /**
     * Convert to plain object
     * @returns {Object}
     */
    toJSON() {
        return {
            name: this.name,
            surname: this.surname,
            email: this.email,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString()
        };
    }

    /**
     * Create User instance from plain object
     * @param {Object} data
     * @returns {User}
     */
    static fromJSON(data) {
        return new User(
            data.name,
            data.surname,
            data.email,
            new Date(data.createdAt)
        );
    }
}
