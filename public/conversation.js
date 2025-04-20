// Store conversation messages
let conversationMessages = [];

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

// Test function to display sample webhook data
function testWebhookDisplay() {
    const testData = {
        test: true,
        timestamp: new Date().toISOString(),
        message: 'This is a test webhook message'
    };
    displayWebhookData(testData);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.querySelector('.download-btn');
    const downloadOptions = document.querySelector('.download-options');
    const downloadPdf = document.querySelector('.download-pdf');
    const downloadTxt = document.querySelector('.download-txt');
    
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
    });

    // Download as TXT
    downloadTxt.addEventListener('click', () => {
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
}); 