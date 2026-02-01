
document.addEventListener('DOMContentLoaded', () => {
    renderResults();
});

function renderResults() {
    const data = window.StudentData.results;
    const container = document.getElementById('results-container');
    const sorted = Logic.sortResults(data); // Algorithm: sort most recent first

    sorted.forEach((sem, index) => {
        const isOpen = index === 0;

        const card = document.createElement('div');
        card.className = "card";
        card.style.padding = "0";
        card.style.overflow = "hidden";

        // Header
        card.innerHTML = `
            <div class="result-header" style="padding: var(--space-md); cursor: pointer; display: flex; justify-content: space-between; align-items: center; background: ${isOpen ? 'var(--bg-body)' : 'white'};">
                <div>
                     <h3 style="margin:0;">Semester ${sem.semester}</h3>
                     <span class="badge badge-green" style="margin-top: 5px; font-size: 0.9rem;">SGPA: ${sem.sgpa}</span>
                </div>
                <div style="transform: ${isOpen ? 'rotate(180deg)' : 'rotate(0)'}; transition: transform 0.3s;">
                    ▼
                </div>
            </div>
            <div class="result-body" style="display: ${isOpen ? 'block' : 'none'}; padding: 0 var(--space-md) var(--space-md) var(--space-md);">
                 <div style="margin-top: 1rem; border-top: 1px solid #eee; padding-top: 1rem;">
                     <table style="width:100%;">
                        <thead>
                            <tr style="background: transparent;">
                                <th style="padding-left:0;">Subject</th>
                                <th>Marks</th>
                                <th style="text-align: right;">Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${sem.subjects.map(sub => `
                                <tr>
                                    <td style="padding-left:0;">${sub.name}</td>
                                    <td>${sub.marks}</td>
                                    <td style="text-align: right; font-weight:700;">${sub.grade}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                     </table>
                     <div style="margin-top: 1.5rem; text-align: right;">
                        <button style="
                            background: var(--color-primary); 
                            color: white; 
                            border: none; 
                            padding: 10px 20px; 
                            border-radius: 8px; 
                            cursor: pointer; 
                            font-weight: 600; 
                            transition: var(--transition-fast);"
                            onmouseover="this.style.transform='scale(1.05)'"
                            onmouseout="this.style.transform='scale(1)'"
                            onclick="alert('Marksheet PDF downloading... (Simulated)')"
                        >Download Marksheet ↓</button>
                     </div>
                 </div>
            </div>
        `;

        // Simple Accordion toggler
        const header = card.querySelector('.result-header');
        const body = card.querySelector('.result-body');
        const arrow = header.querySelector('div:last-child');

        header.addEventListener('click', () => {
            const isHidden = body.style.display === 'none';
            body.style.display = isHidden ? 'block' : 'none';
            arrow.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0)';
            header.style.background = isHidden ? 'var(--bg-body)' : 'white';
        });

        container.appendChild(card);
    });
}
