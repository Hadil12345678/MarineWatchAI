// Store submissions in memory
let submissions = [];

// Open submission modal
function openSubmission() {
    document.getElementById('submission-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close submission modal
function closeSubmission() {
    document.getElementById('submission-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Handle form submission
function handleSubmission(event) {
    event.preventDefault();

    const submission = {
        id: Date.now(),
        teamName: document.getElementById('team-name').value,
        projectName: document.getElementById('project-name').value,
        theme: document.getElementById('theme').value,
        description: document.getElementById('description').value,
        aiComponent: document.getElementById('ai-component').value,
        timestamp: new Date().toISOString()
    };

    submissions.push(submission);
    updateSubmissionsDisplay();
    closeSubmission();
    event.target.reset();

    // Show success message
    showNotification('Project submitted successfully!');
}

// Update submissions display
function updateSubmissionsDisplay() {
    const submissionsGrid = document.getElementById('submissions-grid');
    submissionsGrid.innerHTML = '';

    const sortedSubmissions = [...submissions].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
    );

    sortedSubmissions.forEach(submission => {
        const submissionCard = document.createElement('div');
        submissionCard.className = 'theme-card';
        submissionCard.innerHTML = `
            <h3>${submission.projectName}</h3>
            <p><strong>Team:</strong> ${submission.teamName}</p>
            <p><strong>Theme:</strong> ${capitalizeFirstLetter(submission.theme)}</p>
            <p>${truncateText(submission.description, 150)}</p>
            <p><strong>AI Component:</strong></p>
            <p>${truncateText(submission.aiComponent, 100)}</p>
        `;
        submissionsGrid.appendChild(submissionCard);
    });
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Helper function to truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #10B981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        z-index: 1002;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('submission-modal');
    if (event.target === modal) {
        closeSubmission();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    updateSubmissionsDisplay();
});
