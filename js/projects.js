const projects = [
    {
        id: 1,
        title: "Dungeon RPG (Work in Progress)",
        media: [
            { type: "video", source: "DungeonTeaser.mp4", poster: "testVid.mp4" },
            { type: "video", source: "DungeonEditorTeaser.mp4" },
        ],
        description: "This is a single-player, turn-based tactical RPG inspired by Baldur’s Gate 3, focusing on strategic combat with simplified mechanics. Players control heroes in a party,"
        + "exploring different environments and battling against different types of enemies, using a combination of movement, attacks, and abilities to outmaneuver and defeat foes. Key features"
        + " include a custom Utility/Behaviour Tree based AI, Inventory system, Turn based mechanics and a variety of actions, items, multiple interconnected systems and a Level Editor with" 
        + " integrated tile slicing and other tile editor features.",
        technologies: ["C++", "SFML"],
        liveLink: "#",
        codeLink: "#"
    },
    {
        id: 2,
        title: "Endless Zombie Shooter",
        media: [
            { type: "video", source: "Endless Shooter.mp4" },
        ],
        description: "Within a group with another student, designed an endless shooter style game which showcased enemies who can attack and shoot at the player using different weapons and firing behaviours, "
        + "using a pathfinding algorithm to locate the player and AI attacking + steering behaviours. Implemented animations, particle effects and a graphical user interface, effects, heads up display,etc. "
        + "We used Software Engineering Agile methods like UML Diagrams, User Stories, CRC cards, etc to plan and design the game, as well as SOLID and Programming/Game Programming patterns to create a maintainable" 
        + " and working project to speed up addition of features.",
        technologies: ["C++", "SFML"],
        liveLink: "#",
        codeLink: "#"
    },
    {
        id: 3,
        title: "Spirit Bathouse",
        media: [
            { type: "video", source: "SpiritBathhouse.mp4" },
            { type: "image", source: "GGJ2025.jpg" },
            { type: "image", source: "GGJ_Award2.jpg" }
        ],
        description: "In the 2025 Global Game Jam, where we had less than 3 days to make a game, my team and I made Spirit Bathhouse. Spirit Bathouse is a roguelite deck-building game inspired by Spirited Away, created during a game jam with fellow developers. Players must race against time to bathe spirits, keep them happy to earn tips,"
        + " and manage their exhaustion. By strategizing card combos, upgrading your deck, and meeting daily quotas, you ensure the bathhouse runs smoothly. Unlike traditional deck-builders that focus on combat, Spirit Bathhouse "
        + "shifts the challenge to resource management, immersing players in the experience of running a magical bathhouse rather than battling enemies.",
        technologies: ["Godot", "GDScript"],
        liveLink: "https://reachu.itch.io/spirit-bath-house",
        codeLink: "#"
    },
    {
        id: 4,
        title: "Assembly Game",
        media: [
            { type: "video", source: "AssemblyGame.mp4" },
            { type: "image", source: "AssemblerRunTimeSample.PNG" },
            { type: "image", source: "AssemblerSampleCode.PNG" }
        ],
        description: "",
        technologies: [],
        liveLink: "#",
        codeLink: "#"
    },
    {
        id: 5,
        title: "PWA JavaScript Detective Game",
        media: [
            { type: "video", source: "DetectiveGame1.mp4" },
            { type: "video", source: "DetectiveGameMobile.mp4" }
        ],
        description: "",
        technologies: [],
        liveLink: "#",
        codeLink: "#"
    },
    {
        id: 6,
        title: "Black Jack Web Game",
        media: [
            { type: "image", source: "/api/placeholder/600/400" },
            { type: "video", source: "/api/placeholder/600/400", poster: "/api/placeholder/600/400" },
            { type: "image", source: "/api/placeholder/600/400" }
        ],
        description: "",
        technologies: [],
        liveLink: "#",
        codeLink: "#"
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