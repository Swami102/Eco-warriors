js_code = ""
    // --- Centralized Data Structures (Enhanced) ---

    const userData = {
        name: "Aarav Sharma",
        points: 3450,
        level: 12,
        pointsToNextLevel: 4000,
        // NEW FEATURES ADDED
        total_impact_score: 8.5, // Scale of 1-10
        last_login_date: "Oct 3, 2025",
        daily_goals: ["Log 1Kg waste today", "Reduce screen time by 30 mins"],
    };

    const studentData = [
        // Added college_branch and missions_completed_count
        { name: "Riya Sharma", level: 15, points: 4850, college_branch: "CSE", missions_completed_count: 32, avatar_id: "riya" },
        { name: "Arjun Mehta", level: 14, points: 4620, college_branch: "ECE", missions_completed_count: 30, avatar_id: "arjun" },
        { name: "Sneha Gupta", level: 14, points: 4590, college_branch: "Mech", missions_completed_count: 28, avatar_id: "sneha" },
        { name: "Aarav Sharma", level: 12, points: 3450, college_branch: "CSE", missions_completed_count: 28, avatar_id: "aarav" },
        { name: "Vikram Singh", level: 13, points: 4210, college_branch: "Civil", missions_completed_count: 25, avatar_id: "vikram" },
        { name: "Priya Patel", level: 13, points: 4150, college_branch: "CSE", missions_completed_count: 24, avatar_id: "priya" },
        { name: "Rohan Kumar", level: 12, points: 3980, college_branch: "EEE", missions_completed_count: 22, avatar_id: "rohan" },
        { name: "Kavita Reddy", level: 12, points: 3820, college_branch: "ECE", missions_completed_count: 21, avatar_id: "kavita" },
        { name: "Ananya Desai", level: 11, points: 3310, college_branch: "Mech", missions_completed_count: 20, avatar_id: "ananya" },
        { name: "Aditya Verma", level: 11, points: 3250, college_branch: "CSE", missions_completed_count: 19, avatar_id: "aditya" },
        // Simple data for lower ranks
        { name: "Isha Malhotra", level: 10, points: 3100, college_branch: "IT", missions_completed_count: 18, avatar_id: "isha" },
        { name: "Harsh Joshi", level: 10, points: 3050, college_branch: "CSE", missions_completed_count: 17, avatar_id: "harsh" },
    ];

    // UPDATED DATA: Missions now include difficulty, proof requirements, and duration
    const missions = [
        { title: "Plastic-Free Jalandhar Drive", date: "Today, 2:30 PM", location: "Devi Talab Mandir Area", reward: "+200", type: 'cleanup', status: 'in_progress', difficulty: 'Medium', required_image_proof: true, estimated_duration: '3 Hours' },
        { title: "Snap & Segregate Challenge", date: "Ongoing", location: "Your Home/Campus", reward: "+10 / Snap", type: 'online', status: 'in_progress', difficulty: 'Easy', required_image_proof: true, estimated_duration: 'N/A' },
        { title: "Weekend Tree Plantation", date: "Oct 11, 2025", location: "CT Group Campus", reward: "+150", type: 'plantation', status: 'upcoming', difficulty: 'Medium', required_image_proof: true, estimated_duration: '4 Hours' },
        { title: "Waste Segregation Workshop", date: "Oct 20, 2025", location: "Seminar Hall", reward: "+100", type: 'online', status: 'upcoming', difficulty: 'Easy', required_image_proof: false, estimated_duration: '1 Hour' },
        { title: "Energy Audit Home Task", date: "Completed", location: "Your Home", reward: "+50", type: 'online', status: 'completed', difficulty: 'Easy', required_image_proof: true, estimated_duration: '30 Mins' },
        { title: "River Bank Clean Up", date: "Completed", location: "Sutlej River", reward: "+300", type: 'cleanup', status: 'completed', difficulty: 'Hard', required_image_proof: true, estimated_duration: '5 Hours' }
    ];

    // --- Core Application Functions ---
    let isAuthenticated = false; // Auth state flag

    function simulateLogin() {
        const username = document.getElementById('username').value.toLowerCase();
        const password = document.getElementById('password').value;
        const loginMessage = document.getElementById('login-message');

        // Simple check for demonstration
        if (username === 'aarav') {
            isAuthenticated = true;
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('app-container').style.display = 'flex';
            initializeApp();
        } else {
            loginMessage.innerHTML = '<span style="color: var(--security-danger);">Invalid credentials. Try username: aarav</span>';
            setTimeout(() => { loginMessage.innerHTML = "Use 'aarav' for the username to test the app."; }, 3000);
        }
    }

    // NEW FUNCTION: Handles simulated social login
    function simulateSocialLogin(provider) {
        const loginMessage = document.getElementById('login-message');

        // Simulate a successful login immediately for any social provider
        isAuthenticated = true;

        // Update message and trigger app start
        loginMessage.innerHTML = `<span style="color: var(--accent-secondary);">Logging in with ${provider}... Success!</span>`;

        setTimeout(() => {
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('app-container').style.display = 'flex';
            initializeApp();
        }, 800);
    }


    function showView(targetId) {
        // Toggle active class on sidebar links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${targetId}`) {
                link.classList.add('active');
            }
        });

        // Toggle section visibility
        document.querySelectorAll('main section').forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(targetId).style.display = 'block';
        window.scrollTo(0, 0); // Scroll to top of the main content
    }

    // --- Data Rendering Functions ---

    function renderDashboard() {
        const { name, points, level, pointsToNextLevel, total_impact_score, daily_goals } = userData;

        // Ensure the correct element ID for the welcome message
        const welcomeElement = document.querySelector('.dashboard-welcome h3');
        if (welcomeElement) {
            welcomeElement.textContent = `Welcome back, ${name.split(' ')[0]}!`;
        }

        document.getElementById('current-points').textContent = points.toLocaleString();
        document.getElementById('current-level').textContent = level;
        document.getElementById('next-level-points').textContent = pointsToNextLevel;
        document.getElementById('total-impact-score').textContent = `${total_impact_score.toFixed(1)}/10`;

        // Render Daily Goals
        const goalsList = document.getElementById('daily-goals-list');
        goalsList.innerHTML = '';
        daily_goals.forEach(goal => {
            const li = document.createElement('li');
            li.textContent = goal;
            goalsList.appendChild(li);
        });

        // Level Progress Bar Logic
        const progressPercentage = Math.min(100, (points / pointsToNextLevel) * 100);
        document.getElementById('level-progress-bar').style.width = `${progressPercentage}%`;
    }

    function renderProfile() {
        document.getElementById('profile-level').textContent = userData.level;
        document.getElementById('profile-points').textContent = `${userData.points.toLocaleString()} Eco-Points`;
        document.getElementById('last-login-date').textContent = userData.last_login_date;
    }

    function renderLeaderboard() {
        const leaderboardBody = document.getElementById('leaderboard-body');
        leaderboardBody.innerHTML = '';

        // Sort students by points descending
        const sortedStudents = [...studentData].sort((a, b) => b.points - a.points);

        sortedStudents.forEach((student, index) => {
            const rank = index + 1;
            const row = document.createElement('tr');
            if (student.name === userData.name) { row.classList.add('current-user'); }

            let rankClass = '';
            if (rank === 1) rankClass = 'rank-1';
            else if (rank === 2) rankClass = 'rank-2';
            else if (rank === 3) rankClass = 'rank-3';

            row.innerHTML = `
                <td class="rank ${rankClass}">${rank}</td>
                <td><div class="user-info"><img src="https://i.pravatar.cc/40?u=${student.avatar_id || student.name.replace(' ', '')}" alt="${student.name}"><span>${student.name}</span></div></td>
                <td>${student.college_branch}</td>
                <td>${student.missions_completed_count}</td>
                <td>${student.points.toLocaleString()}</td>
            `;
            leaderboardBody.appendChild(row);
        });
    }

    function renderMissions(filterType = 'all') {
        const missionsContainer = document.getElementById('missions-container');
        missionsContainer.innerHTML = '';

        const filteredMissions = missions.filter(mission => {
            if (filterType === 'all') return true;
            if (filterType === 'in_progress') return mission.status === 'in_progress';
            if (filterType === 'completed') return mission.status === 'completed';
            return mission.type === filterType;
        });

        if (filteredMissions.length === 0) {
             missionsContainer.innerHTML = '<div class="card" style="grid-column: 1 / -1; text-align: center;"><p class="text-secondary">No missions found for this filter.</p></div>';
             return;
        }

        filteredMissions.forEach((mission, index) => {
            const card = document.createElement('article');
            card.className = `card mission-card ${mission.status === 'completed' ? 'completed-card' : ''}`;
            card.style.setProperty('--card-index', index + 1); // For staggered animation
            card.setAttribute('data-type', mission.type); // Set data-type for specific mission card styling

            let statusText = mission.status.replace('_', ' ');
            let statusClass = mission.status;

            const proofIcon = mission.required_image_proof ? '<i class="fas fa-camera"></i> Photo Proof Req.' : '<i class="fas fa-check-circle"></i> Auto Verified';

            card.innerHTML = `
                <h3>${mission.title}</h3>
                <p style="color: var(--text-secondary);"><i class="fas fa-calendar-alt"></i> ${mission.date}</p>
                <p style="color: var(--text-secondary);"><i class="fas fa-map-marker-alt"></i> ${mission.location}</p>
                <div class="mission-details">
                    <span class="difficulty ${mission.difficulty}">${mission.difficulty}</span>
                    <span><i class="fas fa-clock"></i> ${mission.estimated_duration}</span>
                    <span style="color: var(--accent-primary);">${proofIcon}</span>
                </div>
                <span class="reward">${mission.reward} Eco-Points</span>
                <p class="status ${statusClass}">${statusText.charAt(0).toUpperCase() + statusText.slice(1)}</p>
            `;
            missionsContainer.appendChild(card);
        });
    }

    function filterMissions(filterType) {
        // Handle filter button active state
        document.querySelectorAll('#mission-filters .filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === filterType) {
                btn.classList.add('active');
            }
        });
        renderMissions(filterType);
    }

    // --- Chatbot Logic (Retained and slightly cleaned) ---

    function addMessage(sender, message) {
        const chatMessages = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = `message msg-${sender}`;
        messageElement.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(userInput) {
        const userText = userInput.toLowerCase();
        const userPoints = userData.points;
        const userRank = 4; // Updated rank based on sorted data

        if (userText.includes('hello') || userText.includes('hi')) {
            return "Hello there! How can I help you today? 🌿 Ask me about points, missions, or composting!";
        }
        if (userText.includes('my points') || userText.includes('kitne points')) {
            return `You currently have <strong>${userPoints.toLocaleString()} Eco-Points</strong>. Keep up the great work!`;
        }
        if (userText.includes('next mission') || userText.includes('upcoming event')) {
            return "Your next mission is the <strong>Plastic-Free Jalandhar Drive</strong> today at 2:30 PM. Check the Missions Hub!";
        }
        if (userText.includes('compost')) {
            return "Great! To compost, mix 'green' materials (scraps) with 'brown' materials (leaves). Keep it damp and turn it weekly for aeration.";
        }
        if (userText.includes('rewards') || userText.includes('redeem')) {
            return "You can redeem points for T-shirts, planting a tree, or discounts. Check the 'Redeem Rewards' section!";
        }
        if (userText.includes('my rank') || userText.includes('leaderboard')) {
            return `You are currently at <strong>Rank #${userRank}</strong> on the college leaderboard. You're doing great!`;
        }

        return "I'm sorry, I'm still learning. Try asking about 'points', 'missions', or 'compost'.";
    }

    function handleSendMessage() {
        const chatInput = document.getElementById('chat-input-text');
        const userInput = chatInput.value.trim();
        if (userInput === "") return;

        addMessage('user', userInput);
        chatInput.value = "";

        setTimeout(() => {
            const botResponse = getBotResponse(userInput);
            addMessage('bot', botResponse);
        }, 1000);
    }


    // --- Initialization and Event Listeners ---

    function initializeApp() {
        renderDashboard();
        renderProfile();
        renderLeaderboard();
        renderMissions('all'); // Initialize missions view
        showView('dashboard'); // Start on dashboard after login

        // Chatbot Event Listeners
        const sendButton = document.getElementById('send-chat-btn');
        const chatInputText = document.getElementById('chat-input-text');
        sendButton.addEventListener('click', handleSendMessage);
        chatInputText.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                handleSendMessage();
            }
        });
    }

    // Attach login function to the global scope
    window.simulateLogin = simulateLogin;
    window.simulateSocialLogin = simulateSocialLogin;
    window.showView = showView;
    window.filterMissions = filterMissions;

    // Initially hide app and show login screen
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('app-container').style.display = 'none';
        document.getElementById('login-screen').style.display = 'flex';
    });

print("script.js created successfully.")