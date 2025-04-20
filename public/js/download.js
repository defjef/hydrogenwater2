// Initialize jsPDF
window.jsPDF = window.jspdf.jsPDF;

// Function to get conversation content
function getConversationContent() {
    const messages = document.querySelectorAll('.message');
    let content = '';
    
    messages.forEach(message => {
        const role = message.classList.contains('user-message') ? 'User' : 'Assistant';
        const text = message.querySelector('.message-content').textContent;
        content += `${role}: ${text}\n\n`;
    });
    
    return content;
}

// Function to download as PDF
function downloadAsPDF() {
    const content = getConversationContent();
    const doc = new jsPDF();
    
    // Split content into lines that fit the page width
    const lines = doc.splitTextToSize(content, 180);
    
    // Add content to PDF
    doc.text(lines, 15, 15);
    
    // Save the PDF
    doc.save('conversation.pdf');
}

// Function to download as Text
function downloadAsText() {
    const content = getConversationContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'conversation.txt';
    a.click();
    window.URL.revokeObjectURL(url);
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

    // Download as PDF
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
}); 