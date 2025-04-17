const projects = [
    {
        id: 1,
        title: "Dungeon RPG (Work in Progress)",
        media: [
            { type: "video", source: "assets/videos/DungeonTeaser.mp4", poster: "testVid.mp4" },
            { type: "video", source: "assets/videos/DungeonEditorTeaser.mp4" },
        ],
        description: "This is a single-player, turn-based tactical RPG inspired by Baldur’s Gate 3, focusing on strategic combat with simplified mechanics. Players control heroes in a party,"
        + "exploring different environments and battling against different types of enemies, using a combination of movement, attacks, and abilities to outmaneuver and defeat foes. <br><br> Key features"
        + " include a custom Utility/Behaviour Tree based AI, Inventory system, Turn based mechanics and a variety of actions, items, multiple interconnected systems and a Level Editor with" 
        + " integrated tile slicing and other tile editor features.",
        technologies: ["C++", "SFML"],
    },
    {
        id: 2,
        title: "Endless Zombie Shooter",
        media: [
            { type: "video", source: "assets/videos/Endless Shooter.mp4" },
        ],
        description: "Within a group with another student, designed an endless shooter style game which showcased enemies who can attack and shoot at the player using different weapons and firing behaviours, "
        + "using a pathfinding algorithm to locate the player and AI attacking + steering behaviours. <br><br>Implemented animations, particle effects and a graphical user interface, effects, heads up display,etc. "
        + "We used Software Engineering Agile methods like UML Diagrams, User Stories, CRC cards, etc to plan and design the game, as well as SOLID and Programming/Game Programming patterns to create a maintainable" 
        + " and working project to speed up addition of features.",
        technologies: ["C++", "SFML"],
    },
    {
        id: 3,
        title: "Spirit Bathouse",
        media: [
            { type: "video", source: "assets/videos/SpiritBathhouse.mp4" },
            { type: "image", source: "assets/photos/GGJ2025.jpg" },
            { type: "image", source: "assets/photos/GGJ_Award2.jpg" }
        ],
        description: "In the 2025 Global Game Jam, where we had less than 3 days to make a game, my team and I made Spirit Bathhouse. <br><br>Spirit Bathouse is a roguelite deck-building game inspired by Spirited Away, created during a game jam with fellow developers. Players must race against time to bathe spirits, keep them happy to earn tips,"
        + " and manage their exhaustion. By strategizing card combos, upgrading your deck, and meeting daily quotas, you ensure the bathhouse runs smoothly.<br><br> Unlike traditional deck-builders that focus on combat, Spirit Bathhouse "
        + "shifts the challenge to resource management, immersing players in the experience of running a magical bathhouse rather than battling enemies.",
        technologies: ["Godot", "GDScript"],
        liveLink: "https://reachu.itch.io/spirit-bath-house",
    },
    {
        id: 4,
        title: "Assembly Game",
        media: [
            { type: "video", source: "assets/videos/AssemblyGame.mp4" },
            { type: "image", source: "assets/photos/AssemblerRunTimeSample.PNG" },
            { type: "image", source: "assets/photos/AssemblerSampleCode.PNG" }
        ],
        description: "To deepen my understanding of computer architecture and low-level programming, I developed an endless runner game using Motorola 68000 Assembly within the EASY68k environment.<br><br>" + 
        " Writing a real-time application like a game without high-level abstractions presented unique challenges." +
        " I implemented all logic, including player input handling, obstacle spawning, projectile firing, collision, scoring, and display updates, using only Assembly instructions. <br><br>" +
        " This project was an exercise in problem-solving, careful resource management, debugging directly in Assembly, and appreciating the complexities handled by modern game engines and operating systems.",
        technologies: [],
        codeLink: "https://github.com/RichardButurla/Assembly-Game"
    },
    {
        id: 5,
        title: "PWA JavaScript Detective Game",
        media: [
            { type: "video", source: "assets/videos/DetectiveGame1.mp4" },
            { type: "video", source: "assets/videos/DetectiveGameMobile.mp4" }
        ],
        description: "This project is a browser-based detective game built entirely with vanilla JavaScript. <br>"+ 
                    "It leverages Progressive Web App features for installability and offline functionality via a service worker and manifest file.<br><br> " +
                    "Client-side persistence is handled using the Local Storage API, allowing players to retain their collected clues and game state across sessions. <br><br>" +
                    "A key focus was creating an adaptive user experience: the game detects the input method, " +
                    "providing standard keyboard controls on desktop and dynamically rendering an on-screen joystick and interaction buttons for touch devices.",
        technologies: [],
        codeLink: "https://github.com/RichardButurla/UI-Programming-Project"
    },
    {
        id: 6,
        title: "Black Jack Web Game",
        media: [
            { type: "video", source: "assets/videos/BlackJackWebGame.mp4" },
            { type: "image", source: "assets/photos/BlackJackSQL.PNG" },
            { type: "image", source: "assets/photos/BlackJackStats.PNG" }
        ],
        description: "Developed and deployed a dynamic web-based Blackjack game utilizing a full Python stack. <br>The backend is powered by Flask, handling game logic and database interactions," +
        " while Jinja2 manages server-side templating. <br><br>On the frontend, HTMX provides the interactive user experience by enabling partial page updates for actions like hitting or standing, " +
        "minimizing latency without requiring complex JavaScript frameworks.<br><br> Player game data and outcomes are persistently stored in a MariaDB database," +
        " allowing for subsequent statistical analysis and visualization of game trends. The application is hosted live on PythonAnywhere.",
        technologies: [],
        liveLink: "https://c00272345.pythonanywhere.com",
        codeLink: "https://github.com/RichardButurla/BlackJack-WebGame/tree/main/Final-Version"
    }
];

// Function to add a new project
function addProject(projectData) {
    // Generate a new ID based on the highest existing ID
    const newId = Math.max(...projects.map(p => p.id)) + 1;
    
    // Create the new project object
    const newProject = {
        id: newId,
        ...projectData
    };
    
    // Add to the projects array
    projects.push(newProject);
    
    // Clear the grid and repopulate it
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';
    populateProjects();
    
    // Add event listeners to the new elements
    addEventListeners();
}