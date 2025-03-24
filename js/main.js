
// Function to populate the projects grid
function populateProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    projects.forEach(project => {
        // Create project window element
        const projectElement = document.createElement('div');
        projectElement.className = 'project-window';
        projectElement.dataset.id = project.id;
        
        // Create media container for slides
        const mediaContainer = document.createElement('div');
        mediaContainer.className = 'project-media';
        
        // Add slide elements for each media item
        project.media.forEach((mediaItem, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = `project-slide ${index === 0 ? 'active' : ''}`;
            slideElement.dataset.index = index;
            
            if (mediaItem.type === 'image') {
                const img = document.createElement('img');
                img.src = mediaItem.source;
                img.alt = project.title;
                img.className = 'project-image';
                slideElement.appendChild(img);
            } else if (mediaItem.type === 'video') {
                const video = document.createElement('video');
                video.src = mediaItem.source;
                video.poster = mediaItem.poster;
                video.className = 'project-video';
                video.muted = true;
                video.loop = true;
                projectElement.addEventListener('mouseenter', () => video.play());
                projectElement.addEventListener('mouseleave', () => video.pause());
                slideElement.appendChild(video);
            }
            
            mediaContainer.appendChild(slideElement);
        });
        
        // Add navigation arrows if there's more than one media item
        if (project.media.length > 1) {
            // Previous arrow
            const prevArrow = document.createElement('div');
            prevArrow.className = 'slide-arrow prev';
            prevArrow.innerHTML = '&#10094;';
            prevArrow.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent opening modal when clicking arrow
                navigateSlide(this.parentElement, -1);
            });
            
            // Next arrow
            const nextArrow = document.createElement('div');
            nextArrow.className = 'slide-arrow next';
            nextArrow.innerHTML = '&#10095;';
            nextArrow.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent opening modal when clicking arrow
                navigateSlide(this.parentElement, 1);
            });
            
            mediaContainer.appendChild(prevArrow);
            mediaContainer.appendChild(nextArrow);
        }
        
        // Add title element
        const titleElement = document.createElement('div');
        titleElement.className = 'project-title';
        titleElement.textContent = project.title;
        
        projectElement.appendChild(mediaContainer);
        projectElement.appendChild(titleElement);
        
        projectsGrid.appendChild(projectElement);
    });
}

// Function to navigate slides
function navigateSlide(container, direction) {
    const slides = container.querySelectorAll('.project-slide');
    let currentIndex;
    
    // Find the currently active slide
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    let newIndex = currentIndex + direction;
    
    // Handle wrap-around
    if (newIndex < 0) {
        newIndex = slides.length - 1;
    } else if (newIndex >= slides.length) {
        newIndex = 0;
    }
    
    // Update active slide
    slides.forEach(slide => slide.classList.remove('active'));
    slides[newIndex].classList.add('active');
}

// Function to open modal with project details
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    // Find the project by ID
    const project = projects.find(p => p.id === parseInt(projectId));
    
    if (project) {
        modalTitle.textContent = project.title;
        
        let modalContent = `
            <div class="modal-media-container">
        `;
        
        // Add slide elements for each media item
        project.media.forEach((mediaItem, index) => {
            modalContent += `
                <div class="modal-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
            `;
            
            if (mediaItem.type === 'image') {
                modalContent += `
                    <img src="${mediaItem.source}" alt="${project.title}" class="modal-image">
                `;
            } else if (mediaItem.type === 'video') {
                modalContent += `
                    <video src="${mediaItem.source}" poster="${mediaItem.poster}" class="modal-video" controls></video>
                `;
            }
            
            modalContent += `</div>`;
        });
        
        // Add navigation arrows if there's more than one media item
        if (project.media.length > 1) {
            modalContent += `
                <div class="modal-arrow prev" onclick="navigateModalSlide(-1)">&#10094;</div>
                <div class="modal-arrow next" onclick="navigateModalSlide(1)">&#10095;</div>
                <div class="slide-indicators">
            `;
            
            // Add slide indicators
            for (let i = 0; i < project.media.length; i++) {
                modalContent += `
                    <div class="slide-indicator ${i === 0 ? 'active' : ''}" data-index="${i}" onclick="goToModalSlide(${i})"></div>
                `;
            }
            
            modalContent += `</div>`;
        }
        
        modalContent += `
            </div>
            <div class="project-description">
                ${project.description}
            </div>
            <div class="project-details">
                ${project.technologies.map(tech => `<span class="detail-item">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.liveLink}" target="_blank">View Project</a>
                <a href="${project.codeLink}" target="_blank">View Code</a>
            </div>
        `;
        
        modalBody.innerHTML = modalContent;
        modal.classList.add('open');
        
        const activeVideoSlide = modalBody.querySelector('.modal-slide.active video');
        if (activeVideoSlide) {
            activeVideoSlide.play();
        }
        
        // Disable scrolling on body when modal is open
        document.body.style.overflow = 'hidden';
    }
}

// Function to navigate modal slides
function navigateModalSlide(direction) {
    const modalBody = document.getElementById('modalBody');
    const slides = modalBody.querySelectorAll('.modal-slide');
    const indicators = modalBody.querySelectorAll('.slide-indicator');
    let currentIndex;
    
    // Find the currently active slide
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            currentIndex = index;
            
            const video = slide.querySelector('video');
            if (video) {
                video.pause();
            }
        }
    });
    
    let newIndex = currentIndex + direction;
    
    // Handle wrap-around
    if (newIndex < 0) {
        newIndex = slides.length - 1;
    } else if (newIndex >= slides.length) {
        newIndex = 0;
    }
    
    // Update active slide
    slides.forEach(slide => slide.classList.remove('active'));
    slides[newIndex].classList.add('active');
    
    // Update active indicator
    indicators.forEach(indicator => indicator.classList.remove('active'));
    indicators[newIndex].classList.add('active');
    
    const newActiveSlide = slides[newIndex];
    const video = newActiveSlide.querySelector('video');
    if (video) {
        video.play();
    }
}

// Function to go to a specific modal slide
function goToModalSlide(index) {
    const modalBody = document.getElementById('modalBody');
    const slides = modalBody.querySelectorAll('.modal-slide');
    const indicators = modalBody.querySelectorAll('.slide-indicator');
    
    // Pause any playing videos
    slides.forEach(slide => {
        if (slide.classList.contains('active')) {
            const video = slide.querySelector('video');
            if (video) {
                video.pause();
            }
        }
    });
    
    // Update active slide
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    
    // Update active indicator
    indicators.forEach(indicator => indicator.classList.remove('active'));
    indicators[index].classList.add('active');
    
    const newActiveSlide = slides[index];
    const video = newActiveSlide.querySelector('video');
    if (video) {
        video.play();
    }
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('projectModal');
    
    // Pause any playing videos
    const activeVideo = modal.querySelector('.modal-slide.active video');
    if (activeVideo) {
        activeVideo.pause();
    }
    
    modal.classList.remove('open');
    
    // Re-enable scrolling on body
    document.body.style.overflow = '';
}

// Add event listeners to project windows and modal close button
function addEventListeners() {
    document.querySelectorAll('.project-window').forEach(project => {
        project.addEventListener('click', function() {
            openProjectModal(this.dataset.id);
        });
    });
    
    document.getElementById('closeModal').addEventListener('click', closeModal);
    
    // Close modal when clicking outside the modal content
    document.getElementById('projectModal').addEventListener('click', function(event) {
        if (event.target === this) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && document.getElementById('projectModal').classList.contains('open')) {
            closeModal();
        }
    });
}

window.navigateModalSlide = navigateModalSlide;
window.goToModalSlide = goToModalSlide;
window.addProject = addProject;

document.addEventListener('DOMContentLoaded', function() {
    populateProjects();
    addEventListeners();
});