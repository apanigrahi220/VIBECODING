/* Core Logic & Navigation */

const Logic = {
    calculatePercentage: (attended, total) => {
        if (!total) return 0;
        return ((attended / total) * 100).toFixed(1);
    },

    getAttendanceStatus: (percent) => {
        percent = parseFloat(percent);
        if (percent >= 75) return { status: 'Safe', color: 'success', class: 'badge-green', colorHex: '#10b981' };
        if (percent >= 60) return { status: 'Warning', color: 'warning', class: 'badge-yellow', colorHex: '#f59e0b' };
        return { status: 'Critical', color: 'danger', class: 'badge-red', colorHex: '#ef4444' };
    },

    sortResults: (results) => {
        return results.sort((a, b) => b.semester - a.semester);
    }
};

const UI = {
    init: () => {
        UI.renderSidebar();
        UI.renderHeader();
        UI.animateEntry();
    },

    renderSidebar: () => {
        const path = window.location.pathname;
        const page = path.split("/").pop() || "index.html";

        const links = [
            { name: "Dashboard", href: "index.html", icon: "🏠" },
            { name: "Calendar", href: "schedule.html", icon: "📅" },
            { name: "Activities", href: "activities.html", icon: "🏸" },
            { name: "Progress", href: "progress.html", icon: "📈" },
            { name: "Attendance", href: "attendance.html", icon: "📝" },
            { name: "Results", href: "results.html", icon: "📊" },
            { name: "Timetable", href: "timetable.html", icon: "🕒" },
        ];

        const sidebarHTML = `
            <div class="brand">
                <span style="font-size: 2rem;">🎓</span>
                <span>Student<br>Portal</span>
            </div>
            <ul class="nav-links">
                ${links.map(link => `
                    <li class="nav-item">
                        <a href="${link.href}" class="${(page === link.href) ? 'active' : ''}">
                            <span>${link.icon}</span> ${link.name}
                        </a>
                    </li>
                `).join('')}
            </ul>
        `;

        const sidebar = document.createElement('nav');
        sidebar.className = "sidebar";
        sidebar.innerHTML = sidebarHTML;
        document.body.prepend(sidebar);

        // Sidebar content wrapper
        const main = document.querySelector('.main-content');
        if (!main) {
            // Create if missing (for safety)
            const m = document.createElement('main');
            m.className = "main-content";
            document.body.appendChild(m);
        }
    },

    renderHeader: () => {
        const user = window.StudentData.profile;
        const headerHTML = `
            <div class="header">
                <h2 id="page-title">Welcome back, ${user.name.split(" ")[0]}</h2>
                <div class="user-profile">
                    <div class="avatar">${user.avatar}</div>
                    <div>
                        <div style="font-weight:600; font-size: 0.9rem;">${user.id}</div> 
                        <div style="color:var(--text-muted); font-size: 0.8rem;">${user.course}</div>
                    </div>
                </div>
            </div>
        `;
        const main = document.querySelector('.main-content');
        main.insertAdjacentHTML('afterbegin', headerHTML);
    },

    animateEntry: () => {
        const elements = document.querySelectorAll('.card, .table-container');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            setTimeout(() => {
                el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Wait for data to be available if needed, but since it's sync script, it's fine.
    if (window.StudentData) {
        UI.init();
    }
});
