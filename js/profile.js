// Profile Page JavaScript Functionality

class Profile {
    constructor() {
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.bindEvents();
        this.animateOnScroll();
        this.initializeSkillBars();
        this.initializeProgressBars();
    }

    bindEvents() {
        // Activity filters
        document.querySelectorAll('.filter_btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilterClick(e.target);
            });
        });

        // Profile action buttons
        document.querySelector('.profile_btn.primary').addEventListener('click', () => {
            this.showEditProfileModal();
        });

        document.querySelector('.profile_btn.secondary').addEventListener('click', () => {
            this.shareProfile();
        });

        // Section action buttons
        document.querySelectorAll('.section_btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.closest('section');
                if (section.classList.contains('achievement_section')) {
                    this.showAddAchievementModal();
                } else if (section.classList.contains('portfolio_section')) {
                    this.showAddProjectModal();
                } else if (section.classList.contains('goals_section')) {
                    this.showAddGoalModal();
                }
            });
        });

        // Portfolio cards
        document.querySelectorAll('.portfolio_btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showProjectDetails(e.target.closest('.portfolio_card'));
            });
        });

        // Achievement cards
        document.querySelectorAll('.achievement_card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.showAchievementDetails(e.currentTarget);
            });
        });

        // Goal cards
        document.querySelectorAll('.goal_card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.showGoalDetails(e.currentTarget);
            });
        });
    }

    handleFilterClick(button) {
        // Remove active class from all buttons
        document.querySelectorAll('.filter_btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to clicked button
        button.classList.add('active');

        // Get filter value
        const filter = button.textContent.toLowerCase();
        this.currentFilter = filter;

        // Filter timeline items
        this.filterTimelineItems(filter);
    }

    filterTimelineItems(filter) {
        const timelineItems = document.querySelectorAll('.timeline_item');
        
        timelineItems.forEach(item => {
            const typeElement = item.querySelector('.timeline_type');
            const type = typeElement ? typeElement.textContent.toLowerCase() : '';
            
            if (filter === 'ყველა' || filter === 'all') {
                item.style.display = 'flex';
                item.style.opacity = '1';
            } else if (type.includes(filter)) {
                item.style.display = 'flex';
                item.style.opacity = '1';
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        });
    }

    animateOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all cards and sections
        document.querySelectorAll('.achievement_card, .portfolio_card, .goal_card, .sidebar_card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    initializeSkillBars() {
        const skillBars = document.querySelectorAll('.skill_progress');
        
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }

    initializeProgressBars() {
        const progressBars = document.querySelectorAll('.progress_fill');
        
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 800);
        });
    }

    showEditProfileModal() {
        const modal = this.createModal({
            title: 'პროფილის რედაქტირება',
            content: this.getEditProfileForm(),
            onSave: () => {
                this.saveProfileChanges();
                this.showNotification('პროფილი წარმატებით განახლდა!', 'success');
            }
        });
        
        document.body.appendChild(modal);
    }

    showAddAchievementModal() {
        const modal = this.createModal({
            title: 'ახალი ჯილდოს დამატება',
            content: this.getAchievementForm(),
            onSave: () => {
                this.addNewAchievement();
                this.showNotification('ჯილდო წარმატებით დაემატა!', 'success');
            }
        });
        
        document.body.appendChild(modal);
    }

    showAddProjectModal() {
        const modal = this.createModal({
            title: 'ახალი პროექტის დამატება',
            content: this.getProjectForm(),
            onSave: () => {
                this.addNewProject();
                this.showNotification('პროექტი წარმატებით დაემატა!', 'success');
            }
        });
        
        document.body.appendChild(modal);
    }

    showAddGoalModal() {
        const modal = this.createModal({
            title: 'ახალი მიზნის დამატება',
            content: this.getGoalForm(),
            onSave: () => {
                this.addNewGoal();
                this.showNotification('მიზანი წარმატებით დაემატა!', 'success');
            }
        });
        
        document.body.appendChild(modal);
    }

    createModal({ title, content, onSave }) {
        const modal = document.createElement('div');
        modal.className = 'profile_modal active';
        modal.innerHTML = `
            <div class="modal_overlay">
                <div class="modal_content">
                    <button class="modal_close">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="modal_body">
                        <h3>${title}</h3>
                        ${content}
                        <div class="form_actions">
                            <button type="button" class="btn_secondary" onclick="this.closest('.profile_modal').remove()">გაუქმება</button>
                            <button type="button" class="btn_primary save_btn">შენახვა</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

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

        // Save button functionality
        modal.querySelector('.save_btn').addEventListener('click', () => {
            onSave();
            modal.remove();
        });

        return modal;
    }

    getEditProfileForm() {
        return `
            <form class="profile_form">
                <div class="form_group">
                    <label>სახელი და გვარი</label>
                    <input type="text" value="გიორგი მაისურაძე" required>
                </div>
                <div class="form_row">
                    <div class="form_group">
                        <label>სკოლა</label>
                        <input type="text" value="თბილისის ფიზიკა-მათემატიკის სკოლა" required>
                    </div>
                    <div class="form_group">
                        <label>კლასი</label>
                        <select required>
                            <option value="11" selected>11-ე კლასი</option>
                            <option value="10">10-ე კლასი</option>
                            <option value="12">12-ე კლასი</option>
                        </select>
                    </div>
                </div>
                <div class="form_group">
                    <label>ელ-ფოსტა</label>
                    <input type="email" value="giorgi@example.com" required>
                </div>
                <div class="form_group">
                    <label>ქალაქი</label>
                    <input type="text" value="თბილისი" required>
                </div>
            </form>
        `;
    }

    getAchievementForm() {
        return `
            <form class="achievement_form">
                <div class="form_group">
                    <label>ჯილდოს სახელი</label>
                    <input type="text" placeholder="შეიყვანეთ ჯილდოს სახელი" required>
                </div>
                <div class="form_row">
                    <div class="form_group">
                        <label>თარიღი</label>
                        <input type="date" required>
                    </div>
                    <div class="form_group">
                        <label>ქულა</label>
                        <input type="number" placeholder="0-100" min="0" max="100" required>
                    </div>
                </div>
                <div class="form_group">
                    <label>აღწერა</label>
                    <textarea placeholder="ჯილდოს აღწერა" rows="3" required></textarea>
                </div>
                <div class="form_group">
                    <label>ტიპი</label>
                    <select required>
                        <option value="">აირჩიეთ ტიპი</option>
                        <option value="gold">ოქრო</option>
                        <option value="silver">ვერცხლი</option>
                        <option value="bronze">ბრინჯაო</option>
                    </select>
                </div>
            </form>
        `;
    }

    getProjectForm() {
        return `
            <form class="project_form">
                <div class="form_group">
                    <label>პროექტის სახელი</label>
                    <input type="text" placeholder="შეიყვანეთ პროექტის სახელი" required>
                </div>
                <div class="form_group">
                    <label>აღწერა</label>
                    <textarea placeholder="პროექტის აღწერა" rows="3" required></textarea>
                </div>
                <div class="form_row">
                    <div class="form_group">
                        <label>ტექნოლოგიები</label>
                        <input type="text" placeholder="Python, JavaScript, etc." required>
                    </div>
                    <div class="form_group">
                        <label>წელი</label>
                        <input type="number" value="2024" min="2020" max="2030" required>
                    </div>
                </div>
                <div class="form_group">
                    <label>სურათი</label>
                    <input type="file" accept="image/*">
                </div>
            </form>
        `;
    }

    getGoalForm() {
        return `
            <form class="goal_form">
                <div class="form_group">
                    <label>მიზნის სახელი</label>
                    <input type="text" placeholder="შეიყვანეთ მიზნის სახელი" required>
                </div>
                <div class="form_group">
                    <label>აღწერა</label>
                    <textarea placeholder="მიზნის აღწერა" rows="3" required></textarea>
                </div>
                <div class="form_row">
                    <div class="form_group">
                        <label>პროგრესი (%)</label>
                        <input type="number" placeholder="0-100" min="0" max="100" required>
                    </div>
                    <div class="form_group">
                        <label>ვადა</label>
                        <input type="date" required>
                    </div>
                </div>
            </form>
        `;
    }

    showProjectDetails(card) {
        const title = card.querySelector('.portfolio_title').textContent;
        const description = card.querySelector('.portfolio_description').textContent;
        
        this.showNotification(`პროექტი "${title}" - ${description}`, 'info');
    }

    showAchievementDetails(card) {
        const title = card.querySelector('.achievement_title').textContent;
        const description = card.querySelector('.achievement_description').textContent;
        
        this.showNotification(`ჯილდო "${title}" - ${description}`, 'info');
    }

    showGoalDetails(card) {
        const title = card.querySelector('.goal_title').textContent;
        const percentage = card.querySelector('.goal_percentage').textContent;
        
        this.showNotification(`მიზანი "${title}" - ${percentage} დასრულებული`, 'info');
    }

    shareProfile() {
        if (navigator.share) {
            navigator.share({
                title: 'გიორგი მაისურაძეს პროფილი',
                text: 'ნახეთ ჩემი მიღწევები და პორტფოლიო EduBridge-ზე!',
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            navigator.clipboard.writeText(window.location.href);
            this.showNotification('ბმული დაკოპირებულია!', 'success');
        }
    }

    saveProfileChanges() {
        // Simulate saving profile changes
        console.log('Profile changes saved');
    }

    addNewAchievement() {
        // Simulate adding new achievement
        console.log('New achievement added');
    }

    addNewProject() {
        // Simulate adding new project
        console.log('New project added');
    }

    addNewGoal() {
        // Simulate adding new goal
        console.log('New goal added');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
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
}

// Initialize profile when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.profile = new Profile();
});

// Add modal styles
const modalStyles = `
<style>
.profile_modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: none;
}

.profile_modal.active {
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

.profile_form,
.achievement_form,
.project_form,
.goal_form {
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
.form_group select,
.form_group textarea {
    padding: 12px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-family: var(--text-font);
    font-size: 14px;
    transition: all 0.3s ease;
}

.form_group input:focus,
.form_group select:focus,
.form_group textarea:focus {
    outline: none;
    border-color: #00E6FB;
    box-shadow: 0 0 0 3px rgba(0, 230, 251, 0.1);
}

.form_group textarea {
    resize: vertical;
    min-height: 80px;
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

.notification.error {
    border-left-color: #ef4444;
}

.notification i {
    color: #00E6FB;
    font-size: 18px;
}

.notification.success i {
    color: #10b981;
}

.notification.error i {
    color: #ef4444;
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