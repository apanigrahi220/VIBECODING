/* Dashboard Logic */

document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();
});

function loadDashboard() {
    const data = window.StudentData;

    // 1. Attendance Logic
    let totalAttended = 0;
    let totalClasses = 0;
    data.attendance.forEach(sub => {
        totalAttended += sub.attended;
        totalClasses += sub.total;
    });

    const avgPercent = Logic.calculatePercentage(totalAttended, totalClasses);
    const attStatus = Logic.getAttendanceStatus(avgPercent);

    const avgDisplay = document.getElementById('avg-attendance');
    const avgBar = document.getElementById('avg-attendance-bar');
    const attMsg = document.getElementById('attendance-msg');

    if (avgDisplay && avgBar) {
        // Count animation
        let current = 0;
        const interval = setInterval(() => {
            if (current >= avgPercent) {
                current = avgPercent;
                clearInterval(interval);
            } else {
                current += 1;
            }
            avgDisplay.textContent = Math.floor(current) + '%';
        }, 20);

        avgBar.style.width = avgPercent + '%';
        avgBar.className = `progress-bar status-${attStatus.color}`; // e.g. status-success

        // Custom message based on Anti-Gravity "Safe/Critical" logic
        if (avgPercent < 75) {
            attMsg.innerHTML = `<span style="color: var(--color-accent-red)">⚠ Action Needed:</span> You are below 75%.`;
        } else {
            attMsg.innerHTML = `<span style="color: var(--color-accent-green)">✔ Good Job:</span> Keep it up!`;
        }
    }

    // 2. Results Logic
    const sortedResults = Logic.sortResults(data.results);
    const latest = sortedResults[0];
    const previous = sortedResults[1];

    document.getElementById('latest-sgpa').textContent = latest.sgpa;
    const trendEl = document.getElementById('sgpa-trend');

    if (previous) {
        if (latest.sgpa > previous.sgpa) {
            trendEl.textContent = "↗ Improved";
            trendEl.className = "badge badge-green";
        } else if (latest.sgpa < previous.sgpa) {
            trendEl.textContent = "↘ Dropped";
            trendEl.className = "badge badge-red";
        } else {
            trendEl.textContent = "➡ Steady";
            trendEl.className = "badge badge-yellow";
        }
    }

    // 3. Announcements
    const annList = document.getElementById('announcement-list');
    data.announcements.forEach(ann => {
        const item = document.createElement('div');
        item.style.borderLeft = `3px solid var(--color-accent-gold)`;
        item.style.paddingLeft = '10px';
        item.innerHTML = `
            <div style="font-weight: 600; font-size: 0.95rem;">${ann.title}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top:2px;">
                ${ann.type} • ${ann.date}
            </div>
        `;
        annList.appendChild(item);
    });

    // 4. Chart (Updated with Gradients)
    // 4. Academic Journey Chart (Main Line Chart)
    const ctx = document.getElementById('performanceChart').getContext('2d');

    // Rich Gradient for Line
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(30, 64, 175, 0.4)');
    gradient.addColorStop(1, 'rgba(30, 64, 175, 0.05)');

    // Logic: Sort Results by Semester Ascending for Timeline
    const journeyData = data.results.sort((a, b) => a.semester - b.semester);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: journeyData.map(r => `Sem ${r.semester}`),
            datasets: [{
                label: 'Academic Growth',
                data: journeyData.map(r => r.sgpa),
                borderColor: '#1e40af',
                backgroundColor: gradient,
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#1e40af',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#1e3a8a',
                    bodyColor: '#1e3a8a',
                    borderColor: 'rgba(30, 64, 175, 0.2)',
                    borderWidth: 1,
                    displayColors: false,
                    padding: 12,
                    callbacks: {
                        label: function (context) {
                            return 'SGPA: ' + context.parsed.y;
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 5,
                    max: 10,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        borderDash: [5, 5]
                    },
                    ticks: { font: { family: 'Inter' } }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { family: 'Inter' } }
                }
            }
        }
    });

    // 5. Attendance Distribution (Pie Chart) -- NEW
    const pieCtx = document.getElementById('attendancePieChart');
    if (pieCtx) {
        // Logic: Categorize subjects
        let safe = 0, warning = 0, critical = 0;
        data.attendance.forEach(sub => {
            const p = Logic.calculatePercentage(sub.attended, sub.total);
            if (p >= 75) safe++;
            else if (p >= 60) warning++;
            else critical++;
        });

        new Chart(pieCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Safe', 'Warning', 'Critical'],
                datasets: [{
                    data: [safe, warning, critical],
                    backgroundColor: [
                        '#10b981', // Green
                        '#f59e0b', // Yellow
                        '#ef4444'  // Red
                    ],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: { position: 'bottom', labels: { usePointStyle: true, font: { size: 11 } } }
                }
            }
        });
    }

    // 6. Goal Tracking (Render Widget) -- NEW
    const goalList = document.getElementById('goal-list');
    if (goalList && data.goals) {
        goalList.innerHTML = ''; // Clear loading
        data.goals.forEach(goal => {
            const percent = (goal.current / goal.target) * 100;
            const item = document.createElement('div');
            item.className = 'goal-item';
            item.innerHTML = `
                <div style="display:flex; justify-content:space-between; margin-bottom:5px; font-size:0.85rem;">
                    <span style="font-weight:600;">${goal.title}</span>
                    <span style="color:var(--text-muted);">${Math.round(percent)}%</span>
                </div>
                <div class="progress-container" style="height:6px; margin-top:0;">
                    <div class="progress-bar" style="width:${percent}%; background: var(--grad-gold);"></div>
                </div>
            `;
            goalList.appendChild(item);
        });
    }
}
