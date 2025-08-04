// Calendar JavaScript Functionality

class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = new Date();
        this.events = this.getSampleEvents();
        
        this.init();
    }

    init() {
        this.renderCalendar();
        this.bindEvents();
        this.updateSelectedDate();
        this.renderEvents();
        this.bindFilterEvents();
    }

    bindEvents() {
        // Month navigation
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });

        // View buttons
        document.querySelectorAll('.view_btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.view_btn').forEach(b => b.classList.remove('active'));
                e.target.closest('.view_btn').classList.add('active');
                // Add view switching logic here
            });
        });

        // Quick action buttons
        document.querySelector('.quick_action_btn.primary').addEventListener('click', () => {
            this.showAddEventModal();
        });

        document.querySelector('.quick_action_btn.secondary').addEventListener('click', () => {
            this.showReminderModal();
        });

        document.querySelector('.add_event_btn').addEventListener('click', () => {
            this.showAddEventModal();
        });
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Update month display
        const monthNames = [
            'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
            'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
        ];
        
        document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        const calendarDays = document.getElementById('calendarDays');
        calendarDays.innerHTML = '';
        
        // Generate calendar days
        for (let i = 0; i < 42; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar_day';
            
            // Check if it's current month
            if (currentDate.getMonth() !== month) {
                dayElement.classList.add('other_month');
            }
            
            // Check if it's today
            const today = new Date();
            if (currentDate.toDateString() === today.toDateString()) {
                dayElement.classList.add('today');
            }
            
            // Check if it's selected
            if (currentDate.toDateString() === this.selectedDate.toDateString()) {
                dayElement.classList.add('selected');
            }
            
            // Add day number
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day_number';
            dayNumber.textContent = currentDate.getDate();
            dayElement.appendChild(dayNumber);
            
            // Add event dots
            const dayEvents = this.getEventsForDate(currentDate);
            if (dayEvents.length > 0) {
                const eventsContainer = document.createElement('div');
                eventsContainer.className = 'day_events';
                
                dayEvents.slice(0, 3).forEach(event => {
                    const eventDot = document.createElement('div');
                    eventDot.className = `event_dot ${event.type}`;
                    eventsContainer.appendChild(eventDot);
                });
                
                dayElement.appendChild(eventsContainer);
            }
            
            // Add click event
            dayElement.addEventListener('click', () => {
                this.selectDate(currentDate);
            });
            
            calendarDays.appendChild(dayElement);
        }
    }

    selectDate(date) {
        this.selectedDate = date;
        this.renderCalendar();
        this.updateSelectedDate();
        this.renderEvents();
    }

    updateSelectedDate() {
        const monthNames = [
            'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
            'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
        ];
        
        const month = monthNames[this.selectedDate.getMonth()];
        const day = this.selectedDate.getDate();
        
        document.getElementById('selectedDate').textContent = `${month} ${day}`;
    }

    renderEvents() {
        const eventsList = document.getElementById('eventsList');
        const dayEvents = this.getEventsForDate(this.selectedDate);
        
        if (dayEvents.length === 0) {
            eventsList.innerHTML = `
                <div class="no_events">
                    <i class="fas fa-calendar-day"></i>
                    <p>ამ დღეს არ არის დაგეგმილი აქტივობა</p>
                    <button class="add_event_btn" onclick="calendar.showAddEventModal()">
                        <i class="fas fa-plus"></i>
                        <span>დაამატე აქტივობა</span>
                    </button>
                </div>
            `;
            return;
        }
        
        eventsList.innerHTML = dayEvents.map(event => `
            <div class="event_item ${event.type}">
                <div class="event_time">${event.time}</div>
                <div class="event_content">
                    <h4 class="event_title">${event.title}</h4>
                    <p class="event_location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${event.location}
                    </p>
                    <div class="event_meta">
                        <span class="event_type ${event.type}">${this.getEventTypeName(event.type)}</span>
                        <span class="event_status ${event.status}">${this.getEventStatusName(event.status)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getEventsForDate(date) {
        return this.events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === date.toDateString();
        });
    }

    getEventTypeName(type) {
        const types = {
            olympiad: 'ოლიმპიადა',
            workshop: 'სახელოსნო',
            tournament: 'ტურნირი',
            course: 'კურსი'
        };
        return types[type] || type;
    }

    getEventStatusName(status) {
        const statuses = {
            registered: 'დარეგისტრირებული',
            pending: 'მოლოდინში',
            open: 'ღია რეგისტრაცია',
            closed: 'დახურული'
        };
        return statuses[status] || status;
    }

    bindFilterEvents() {
        document.querySelectorAll('.filter_btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                
                // Update active filter
                document.querySelectorAll('.filter_btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                // Filter upcoming events
                this.filterUpcomingEvents(filter);
            });
        });
    }

    filterUpcomingEvents(filter) {
        const cards = document.querySelectorAll('.upcoming_card');
        
        cards.forEach(card => {
            if (filter === 'all' || card.classList.contains(filter)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    showAddEventModal() {
        // Create modal HTML
        const modal = document.createElement('div');
        modal.className = 'event_modal active';
        modal.innerHTML = `
            <div class="modal_overlay">
                <div class="modal_content">
                    <button class="modal_close">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="modal_body">
                        <h3>ახალი აქტივობის დამატება</h3>
                        <form class="event_form">
                            <div class="form_group">
                                <label>აქტივობის სახელი</label>
                                <input type="text" placeholder="შეიყვანეთ სახელი" required>
                            </div>
                            <div class="form_row">
                                <div class="form_group">
                                    <label>თარიღი</label>
                                    <input type="date" required>
                                </div>
                                <div class="form_group">
                                    <label>დრო</label>
                                    <input type="time" required>
                                </div>
                            </div>
                            <div class="form_group">
                                <label>მისამართი</label>
                                <input type="text" placeholder="შეიყვანეთ მისამართი" required>
                            </div>
                            <div class="form_row">
                                <div class="form_group">
                                    <label>ტიპი</label>
                                    <select required>
                                        <option value="">აირჩიეთ ტიპი</option>
                                        <option value="olympiad">ოლიმპიადა</option>
                                        <option value="workshop">სახელოსნო</option>
                                        <option value="tournament">ტურნირი</option>
                                        <option value="course">კურსი</option>
                                    </select>
                                </div>
                                <div class="form_group">
                                    <label>სტატუსი</label>
                                    <select required>
                                        <option value="">აირჩიეთ სტატუსი</option>
                                        <option value="open">ღია რეგისტრაცია</option>
                                        <option value="pending">მოლოდინში</option>
                                        <option value="registered">დარეგისტრირებული</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form_actions">
                                <button type="button" class="btn_secondary" onclick="this.closest('.event_modal').remove()">გაუქმება</button>
                                <button type="submit" class="btn_primary">დამატება</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal on overlay click
        modal.querySelector('.modal_overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                modal.remove();
            }
        });
        
        // Close modal on close button
        modal.querySelector('.modal_close').addEventListener('click', () => {
            modal.remove();
        });
        
        // Handle form submission
        modal.querySelector('.event_form').addEventListener('submit', (e) => {
            e.preventDefault();
            // Add event logic here
            modal.remove();
            this.showNotification('აქტივობა წარმატებით დაემატა!', 'success');
        });
    }

    showReminderModal() {
        const modal = document.createElement('div');
        modal.className = 'event_modal active';
        modal.innerHTML = `
            <div class="modal_overlay">
                <div class="modal_content">
                    <button class="modal_close">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="modal_body">
                        <h3>შეგახსენებთ</h3>
                        <p>მიიღეთ შეგახსენებთ ახალ აქტივობებზე და მნიშვნელოვან თარიღებზე</p>
                        <div class="reminder_options">
                            <label class="reminder_option">
                                <input type="checkbox" checked>
                                <span>ელ-ფოსტით</span>
                            </label>
                            <label class="reminder_option">
                                <input type="checkbox" checked>
                                <span>ბრაუზერის შეგახსენებით</span>
                            </label>
                            <label class="reminder_option">
                                <input type="checkbox">
                                <span>SMS-ით</span>
                            </label>
                        </div>
                        <div class="form_actions">
                            <button type="button" class="btn_secondary" onclick="this.closest('.event_modal').remove()">გაუქმება</button>
                            <button type="button" class="btn_primary" onclick="this.closest('.event_modal').remove(); calendar.showNotification('შეგახსენებთ ჩართულია!', 'success')">შენახვა</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal on overlay click
        modal.querySelector('.modal_overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                modal.remove();
            }
        });
        
        // Close modal on close button
        modal.querySelector('.modal_close').addEventListener('click', () => {
            modal.remove();
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }

    getSampleEvents() {
        return [
            {
                title: 'მათემატიკის რესპუბლიკური ოლიმპიადა',
                date: '2024-12-15',
                time: '09:00',
                location: 'თბილისის სახელმწიფო უნივერსიტეტი',
                type: 'olympiad',
                status: 'registered'
            },
            {
                title: 'პროგრამირების სახელოსნო',
                date: '2024-12-15',
                time: '14:30',
                location: 'IT Academy Step Georgia',
                type: 'workshop',
                status: 'pending'
            },
            {
                title: 'დებატების ტურნირი',
                date: '2024-12-15',
                time: '16:00',
                location: 'GIDE ცენტრი',
                type: 'tournament',
                status: 'open'
            },
            {
                title: 'ფიზიკის საერთაშორისო ოლიმპიადა',
                date: '2024-12-20',
                time: '10:00',
                location: 'ბათუმი',
                type: 'olympiad',
                status: 'open'
            },
            {
                title: 'AI და მანქანური სწავლება',
                date: '2024-12-22',
                time: '15:00',
                location: 'ონლაინ',
                type: 'workshop',
                status: 'open'
            },
            {
                title: 'ქიმიის ტურნირი',
                date: '2024-12-25',
                time: '11:00',
                location: 'თბილისი',
                type: 'tournament',
                status: 'open'
            }
        ];
    }
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.calendar = new Calendar();
});

// Add modal styles
const modalStyles = `
<style>
.event_modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: none;
}

.event_modal.active {
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal_overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
}

.modal_content {
    position: relative;
    background: #FFFFFF;
    border-radius: 20px;
    padding: 30px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal_close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: #f1f5f9;
    color: #64748b;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.modal_close:hover {
    background: #e2e8f0;
    color: #1e293b;
}

.modal_body h3 {
    font-family: var(--text-font);
    font-weight: 700;
    font-size: 24px;
    color: #1e293b;
    margin-bottom: 20px;
    text-transform: uppercase;
}

.event_form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form_group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form_group label {
    font-family: var(--text-font);
    font-weight: 600;
    font-size: 14px;
    color: #1e293b;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.form_group input,
.form_group select {
    padding: 12px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-family: var(--text-font);
    font-size: 14px;
    transition: all 0.3s ease;
}

.form_group input:focus,
.form_group select:focus {
    outline: none;
    border-color: #00E6FB;
    box-shadow: 0 0 0 3px rgba(0, 230, 251, 0.1);
}

.form_row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.form_actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 20px;
}

.btn_primary,
.btn_secondary {
    padding: 12px 24px;
    border-radius: 8px;
    border: none;
    font-family: var(--text-font);
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.btn_primary {
    background: linear-gradient(135deg, #00E6FB 0%, #00D4E6 100%);
    color: #022762;
}

.btn_primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 230, 251, 0.3);
}

.btn_secondary {
    background: #f1f5f9;
    color: #64748b;
}

.btn_secondary:hover {
    background: #e2e8f0;
    color: #1e293b;
}

.reminder_options {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 20px 0;
}

.reminder_option {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
}

.reminder_option input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #00E6FB;
}

.reminder_option span {
    font-family: var(--text-font);
    font-size: 14px;
    color: #1e293b;
}

.no_events {
    text-align: center;
    padding: 40px 20px;
    color: #64748b;
}

.no_events i {
    font-size: 48px;
    margin-bottom: 16px;
    color: #cbd5e1;
}

.no_events p {
    font-family: var(--text-font);
    font-size: 16px;
    margin-bottom: 24px;
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #FFFFFF;
    border-radius: 12px;
    padding: 16px 20px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 1001;
    animation: slideIn 0.3s ease;
    border-left: 4px solid #00E6FB;
}

.notification.success {
    border-left-color: #10b981;
}

.notification i {
    color: #00E6FB;
    font-size: 18px;
}

.notification.success i {
    color: #10b981;
}

.notification span {
    font-family: var(--text-font);
    font-weight: 600;
    font-size: 14px;
    color: #1e293b;
}

.notification button {
    background: none;
    border: none;
    color: #64748b;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.notification button:hover {
    background: #f1f5f9;
    color: #1e293b;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@media (max-width: 768px) {
    .modal_content {
        margin: 20px;
        padding: 20px;
    }
    
    .form_row {
        grid-template-columns: 1fr;
    }
    
    .form_actions {
        flex-direction: column;
    }
    
    .notification {
        left: 20px;
        right: 20px;
        top: 20px;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', modalStyles); 