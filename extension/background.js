// pdfrang Chrome Extension - Background Service Worker

const pdfrang_URL = 'https://pdfrang.devtoolcafe.com/en';

// Create context menu when extension is installed
chrome.runtime.onInstalled.addListener(() => {
    // Create main context menu item
    chrome.contextMenus.create({
        id: 'pdfrang-open',
        title: 'Open with pdfrang',
        contexts: ['link', 'page']
    });

    // Create submenu for specific tools
    chrome.contextMenus.create({
        id: 'pdfrang-merge',
        parentId: 'pdfrang-open',
        title: 'Merge PDFs',
        contexts: ['link', 'page']
    });

    chrome.contextMenus.create({
        id: 'pdfrang-compress',
        parentId: 'pdfrang-open',
        title: 'Compress PDF',
        contexts: ['link', 'page']
    });

    chrome.contextMenus.create({
        id: 'pdfrang-convert',
        parentId: 'pdfrang-open',
        title: 'Convert to PDF',
        contexts: ['link', 'page']
    });

    chrome.contextMenus.create({
        id: 'pdfrang-all-tools',
        parentId: 'pdfrang-open',
        title: 'All Tools →',
        contexts: ['link', 'page']
    });

    console.log('pdfrang context menus created');
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    let url = pdfrang_URL;

    switch (info.menuItemId) {
        case 'pdfrang-merge':
            url = `${pdfrang_URL}/tools/merge-pdf`;
            break;
        case 'pdfrang-compress':
            url = `${pdfrang_URL}/tools/compress-pdf`;
            break;
        case 'pdfrang-convert':
            url = `${pdfrang_URL}/tools/jpg-to-pdf`;
            break;
        case 'pdfrang-all-tools':
        case 'pdfrang-open':
            url = pdfrang_URL;
            break;
        default:
            url = pdfrang_URL;
    }

    // Open pdfrang in a new tab
    chrome.tabs.create({ url: url });
});

// Log when service worker starts
console.log('pdfrang background service worker started');
