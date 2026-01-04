// Documentation Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize documentation page components
    initBookFiltering();
    initResourceTabs();
    initBookModals();
    initDownloadAll();
    initLoadMoreBooks();
    
    // Initialize theme toggle and mobile menu from main script
    // These functions are already called in script.js
    
    console.log('Documentation page initialized successfully');
});

// Book Filtering Functionality
function initBookFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const bookCards = document.querySelectorAll('.book-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Filter books
            bookCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Resource Tabs Functionality
function initResourceTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabPane = document.getElementById(tabId);
            if (tabPane) {
                tabPane.classList.add('active');
            }
        });
    });
}

// Book Modals Functionality
function initBookModals() {
    const bookCards = document.querySelectorAll('.book-card');
    const bookModal = document.getElementById('bookModal');
    const modalClose = bookModal.querySelector('.modal-close');
    const modalBookCover = document.getElementById('modalBookCover');
    const modalBookTitle = document.getElementById('modalBookTitle');
    const modalBookAuthor = document.getElementById('modalBookAuthor');
    const modalBookMeta = document.getElementById('modalBookMeta');
    const modalBookDesc = document.getElementById('modalBookDesc');
    const readOnlineBtn = document.getElementById('readOnlineBtn');
    const downloadBookBtn = document.getElementById('downloadBookBtn');
    
    // Sample book data (in a real application, this would come from a database)
    const bookData = {
        'book1': {
            title: 'Battery Management Systems for Electric Vehicles',
            author: 'Dr. John Warner',
            cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            edition: '2022 Edition',
            pages: '480 Pages',
            category: 'Battery',
            description: 'Comprehensive guide to BMS design, implementation, and optimization for EV applications. This book covers all aspects of battery management including state of charge estimation, cell balancing, thermal management, and safety systems. Essential reading for engineers working on electric vehicle battery systems.',
            readOnlineLink: '#',
            downloadLink: '#'
        },
        'book2': {
            title: 'Electric Motor Drives: Modeling, Analysis, and Control',
            author: 'R. Krishnan',
            cover: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            edition: '2019 Edition',
            pages: '620 Pages',
            category: 'Motor',
            description: 'In-depth analysis of electric motor drives, control techniques, and performance optimization. This textbook provides comprehensive coverage of AC and DC motor drives, power electronic converters, and advanced control strategies for electric vehicle applications.',
            readOnlineLink: '#',
            downloadLink: '#'
        },
        // Add more book data as needed
    };
    
    // Add click event to book cards
    bookCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking on buttons inside the card
            if (e.target.closest('.btn')) return;
            
            // Get book data (in a real app, you'd fetch this from a database)
            const bookId = 'book' + (index + 1);
            const book = bookData[bookId] || {
                title: this.querySelector('h3').textContent,
                author: this.querySelector('.book-author span').textContent,
                cover: this.querySelector('.book-cover img').src,
                edition: this.querySelector('.book-meta span:nth-child(1)').textContent,
                pages: this.querySelector('.book-meta span:nth-child(2)').textContent,
                category: this.querySelector('.book-badge').textContent,
                description: this.querySelector('.book-desc').textContent,
                readOnlineLink: '#',
                downloadLink: '#'
            };
            
            // Populate modal with book data
            modalBookCover.src = book.cover;
            modalBookCover.alt = book.title;
            modalBookTitle.textContent = book.title;
            modalBookAuthor.innerHTML = `<i class="fas fa-user-edit"></i> ${book.author}`;
            modalBookMeta.innerHTML = `
                <span><i class="fas fa-calendar"></i> ${book.edition}</span>
                <span><i class="fas fa-file"></i> ${book.pages}</span>
                <span><i class="fas fa-tag"></i> ${book.category}</span>
            `;
            modalBookDesc.textContent = book.description;
            
            // Update button links
            readOnlineBtn.onclick = () => window.open(book.readOnlineLink, '_blank');
            downloadBookBtn.onclick = () => window.open(book.downloadLink, '_blank');
            
            // Show modal
            openModal(bookModal);
        });
    });
    
    // Close modal functionality
    modalClose.addEventListener('click', () => closeModal(bookModal));
    bookModal.addEventListener('click', (e) => {
        if (e.target === bookModal) closeModal(bookModal);
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && bookModal.classList.contains('active')) {
            closeModal(bookModal);
        }
    });
    
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Download All Resources Functionality
function initDownloadAll() {
    const downloadAllBtn = document.getElementById('downloadAllBtn');
    
    if (downloadAllBtn) {
        downloadAllBtn.addEventListener('click', function() {
            // Create a zip file download simulation
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Download...';
            this.disabled = true;
            
            setTimeout(() => {
                // Simulate download completion
                this.innerHTML = '<i class="fas fa-check"></i> Download Complete!';
                this.style.background = 'var(--accent-color)';
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    this.innerHTML = 'Download All Resources';
                    this.disabled = false;
                    this.style.background = '';
                }, 2000);
                
                // In a real application, this would trigger an actual file download
                // For now, we'll show an alert
                alert('Download functionality would be implemented here. In a production environment, this would generate and download a ZIP file containing all resources.');
            }, 1500);
        });
    }
}

// Load More Books Functionality
function initLoadMoreBooks() {
    const loadMoreBtn = document.getElementById('loadMoreBooks');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more books
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            setTimeout(() => {
                // In a real application, this would fetch more books from a server
                // For now, we'll just show a message
                this.innerHTML = 'No More Books Available';
                this.disabled = true;
                this.style.opacity = '0.7';
                
                // Show a toast notification
                showToast('All books have been loaded');
            }, 1000);
        });
    }
}

// Toast Notification Function
function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
    `;
    
    // Style the toast
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.background = 'var(--surface-color)';
    toast.style.color = 'var(--text-primary)';
    toast.style.padding = '1rem 1.5rem';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = 'var(--shadow-lg)';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '0.75rem';
    toast.style.zIndex = '10000';
    toast.style.borderLeft = '4px solid var(--primary-color)';
    toast.style.transition = 'all 0.3s ease';
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
    
    // Add to document
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Add CSS for toast notifications
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    .toast-notification {
        animation: toastSlideUp 0.3s ease;
    }
    
    @keyframes toastSlideUp {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(toastStyle);
