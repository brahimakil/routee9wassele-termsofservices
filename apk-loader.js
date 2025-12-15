// Fetch latest APK download URL from Netlify Function
async function updateDownloadButton() {
    try {
        const response = await fetch('/.netlify/functions/latest-apk');
        
        if (!response.ok) {
            console.error('Failed to fetch APK URL:', response.statusText);
            return;
        }

        const data = await response.json();
        const downloadBtn = document.getElementById('direct-download-btn');
        
        if (downloadBtn && data.url) {
            downloadBtn.href = data.url;
            console.log('APK download URL updated to:', data.url);
        } else {
            console.warn('Download button not found or no URL available');
        }
    } catch (error) {
        console.error('Error fetching APK URL:', error);
    }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateDownloadButton);
} else {
    updateDownloadButton();
}
