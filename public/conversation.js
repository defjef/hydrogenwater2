// Store conversation messages
let conversationMessages = [];

// Function to display error messages
function showError(message) {
    const errorBox = document.getElementById('error-box');
    const errorMessage = document.getElementById('error-message');
    
    errorMessage.textContent = message;
    errorBox.classList.add('show');
    
    console.error('Error:', message);
}

// Function to clear error messages
function clearError() {
    const errorBox = document.getElementById('error-box');
    errorBox.classList.remove('show');
}

// Function to display webhook data
function displayWebhookData(data) {
    console.log('Displaying webhook data:', data);
    const conversationContent = document.querySelector('.conversation-content');
    const messageElement = document.createElement('div');
    messageElement.className = 'message webhook-data';
    messageElement.innerHTML = `
        <div class="message-header">
            <span class="message-sender">Webhook Data</span>
            <span class="message-time">${new Date().toLocaleTimeString()}</span>
        </div>
        <div class="message-content">
            <pre>${JSON.stringify(data, null, 2)}</pre>
        </div>
    `;
    conversationContent.appendChild(messageElement);
    conversationContent.scrollTop = conversationContent.scrollHeight;
}

// Function to download the current page
function downloadCurrentPage() {
    try {
        const doc = new jsPDF();
        
        // Add title
        doc.setFontSize(16);
        doc.text('Hydrogen Water Page', 20, 20);
        
        // Add version
        doc.setFontSize(12);
        doc.text('Version: 1.0.1', 20, 30);
        
        // Add timestamp
        doc.text(`Downloaded: ${new Date().toLocaleString()}`, 20, 40);
        
        // Save the PDF
        doc.save('hydrogen-water-page.pdf');
        
        showError('Page downloaded successfully!');
    } catch (error) {
        showError(`Error downloading page: ${error.message}`);
    }
}

// Test function to display sample webhook data
function testWebhookDisplay() {
    const testData = {
        test: true,
        timestamp: new Date().toISOString(),
        message: 'This is a test webhook message'
    };
    displayWebhookData(testData);
    showError('Test webhook data displayed');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.querySelector('.download-btn');
    const downloadOptions = document.querySelector('.download-options');
    const downloadPdf = document.querySelector('.download-pdf');
    const downloadTxt = document.querySelector('.download-txt');
    const clearErrorBtn = document.getElementById('clear-error');
    const downloadVersionBtn = document.getElementById('download-version');
    
    // Clear error button
    clearErrorBtn.addEventListener('click', clearError);
    
    // Download version button
    downloadVersionBtn.addEventListener('click', downloadCurrentPage);
    
    // Toggle download options
    downloadBtn.addEventListener('click', () => {
        downloadOptions.classList.toggle('show');
    });
    
    // Close download options when clicking outside
    document.addEventListener('click', (e) => {
        if (!downloadBtn.contains(e.target) && !downloadOptions.contains(e.target)) {
            downloadOptions.classList.remove('show');
        }
    });
    
    // Download handlers
    downloadPdf.addEventListener('click', () => {
        try {
            const conversation = document.querySelector('.conversation-content');
            const doc = new jsPDF();
            
            // Add title
            doc.setFontSize(16);
            doc.text('Hydrogen Water Chat Conversation', 20, 20);
            
            // Add content
            doc.setFontSize(12);
            const text = conversation.innerText;
            const splitText = doc.splitTextToSize(text, 170);
            doc.text(splitText, 20, 30);
            
            // Save the PDF
            doc.save('hydrogen-water-chat.pdf');
            downloadOptions.classList.remove('show');
            
            showError('Conversation downloaded as PDF');
        } catch (error) {
            showError(`Error generating PDF: ${error.message}`);
        }
    });

    // Download as TXT
    downloadTxt.addEventListener('click', () => {
        try {
            const conversation = document.querySelector('.conversation-content');
            const text = conversation.innerText;
            const blob = new Blob([text], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'hydrogen-water-chat.txt';
            a.click();
            window.URL.revokeObjectURL(url);
            downloadOptions.classList.remove('show');
            
            showError('Conversation downloaded as TXT');
        } catch (error) {
            showError(`Error generating TXT: ${error.message}`);
        }
    });
    
    // Initialize conversation container
    const conversationContent = document.querySelector('.conversation-content');
    conversationContent.innerHTML = '<div class="conversation-start">Webhook data will appear here when received</div>';
    
    // Add test button
    const testButton = document.createElement('button');
    testButton.textContent = 'Test Webhook Display';
    testButton.style.marginTop = '10px';
    testButton.addEventListener('click', testWebhookDisplay);
    conversationContent.appendChild(testButton);
    
    // Show initial message
    showError('Page loaded successfully. Version 1.0.1');
}); 