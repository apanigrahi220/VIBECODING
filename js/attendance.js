
document.addEventListener('DOMContentLoaded', () => {
    renderAttendance();
});

function renderAttendance() {
    const data = window.StudentData.attendance;
    const tbody = document.getElementById('attendance-body');

    data.forEach(sub => {
        const percent = Logic.calculatePercentage(sub.attended, sub.total);
        const status = Logic.getAttendanceStatus(percent);
        let prediction = "";

        // Algorithm: Prediction Logic
        if (percent < 75) {
            // How many to recover?
            // Formula: x >= 3T - 4A
            const needed = Math.ceil(3 * sub.total - 4 * sub.attended);
            if (needed > 0) {
                prediction = `<span style="color:var(--color-accent-red)">Need <strong>${needed}</strong> more classes</span>`;
            } else {
                prediction = `<span>Just on edge</span>`;
            }
        } else {
            // How many can bunk?
            // Formula: x <= (4A - 3T) / 3
            const bunkable = Math.floor((4 * sub.attended - 3 * sub.total) / 3);
            if (bunkable > 0) {
                prediction = `<span style="color:var(--color-accent-green)">Can bunk <strong>${bunkable}</strong> classes</span>`;
            } else {
                prediction = `<span style="color:var(--text-muted)">Don't bunk yet</span>`;
            }
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="font-family: monospace; font-weight:600;">${sub.code}</td>
            <td>${sub.subject}</td>
            <td>${sub.attended} / ${sub.total}</td>
            <td style="font-weight:700;">${percent}%</td>
            <td><span class="badge ${status.class}">${status.status}</span></td>
            <td>${prediction}</td>
        `;
        tbody.appendChild(tr);
    });
}
