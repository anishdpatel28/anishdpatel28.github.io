export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  year: string;
  status: string;
  category: string;
  color: string;
  features: string[];
  challenges?: string[];
  learnings?: string[];
  images?: { src: string; alt: string; caption?: string }[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: "sentiment-analysis",
    title: "Sentiment Analysis for Portfolio Optimization",
    shortDescription: "Integrating financial news sentiment analysis with reinforcement learning to optimize stock portfolio allocation, capturing market psychology beyond traditional quantitative methods.",
    fullDescription: "This project integrates market sentiment analysis into trading systems to capture the psychological aspects of market behavior that traditional methods like moving averages and mean-variance optimization cannot capture. The system utilizes financial news data from the Massive Stock News Analysis DB (approximately 4 million articles for 6000 stocks from 2009-2020) to derive sentiment scores that provide additional input to a reinforcement learning agent for portfolio optimization. The project addresses the limitation of standard methods that only look at past behavior and cannot adapt to future events like sudden market crashes or real-world events. The implementation uses FinBERT, a transformer model based on BERT and fine-tuned specifically for financial sentiment classification. The pipeline filters data for the busiest months (May 2019 to March 2020), applies FinBERT in batches to classify entries as negative, neutral, or positive (encoded as -1, 0, 1), combines scores by date to calculate average daily sentiment scores, forward fills missing dates, and outputs processed sentiment time series data. The resulting sentiment scores are integrated as features into a Proximal Policy Optimization (PPO) reinforcement learning model within a custom OpenAI Gymnasium environment, providing the agent with both quantitative price data and qualitative sentiment information. The agent is trained to maximize log returns across a portfolio of stocks sampled from NASDAQ. Experimental results show a 2% gain in returns when using sentiment data, with sentiment-enhanced portfolios achieving up to 3.02% returns compared to the NASDAQ's 2.11% return from May 2019 to December 2019. The system demonstrates improved Sharpe ratios and reduced volatility when sentiment features are included, though performance degrades during extreme market conditions like the COVID-19 pandemic period.",
    technologies: ["Python", "FinBERT", "BERT", "Transformer Models", "PPO", "Reinforcement Learning", "Kaggle API", "yfinance API", "NLP", "Sentiment Analysis", "Portfolio Optimization"],
    year: "2025",
    status: "Completed",
    category: "AI/ML",
    color: "#4A90E2",
    features: [
      "FinBERT-based sentiment analysis pipeline for financial news",
      "Processing of 4 million articles across 6000 stocks (2009-2020)",
      "Automated dataset download and extraction via Kaggle API",
      "Data filtering for busiest months or specified date ranges",
      "Batch processing of sentiment classification (negative, neutral, positive)",
      "Daily sentiment score aggregation and time series generation",
      "Forward filling for missing sentiment data",
      "Integration of sentiment scores as features in PPO RL agent",
      "Proximal Policy Optimization for continuous action space portfolio allocation",
      "Combined quantitative (price data) and qualitative (sentiment) state representation",
      "Reusable, documented pipeline scripts (get_data.py, filter_data.py, get_sentiments.py)",
      "Makefile for easy reproduction of results",
      "Evaluation of multiple datasets (SEC filings, FNSPID, StockNews, Massive Stock News Analysis DB)"
    ],
    challenges: [
      "Evaluating and selecting appropriate datasets from multiple options (SEC filings had date inconsistencies, FNSPID required full download before filtering, StockNews limited to 2008 crisis era)",
      "Processing and filtering massive datasets (4 million articles) efficiently",
      "Implementing batch processing for FinBERT sentiment classification at scale",
      "Integrating sentiment time series as dynamic features into RL state space",
      "Balancing quantitative price data with qualitative sentiment information in agent decisions",
      "Creating reusable, documented pipeline scripts for reproducibility",
      "Handling missing sentiment data through forward filling strategies",
      "Fine-tuning transformer models for financial domain-specific sentiment classification"
    ],
    learnings: [
      "How sentiment analysis can capture market psychology beyond traditional quantitative indicators",
      "The importance of dataset evaluation and selection in large-scale NLP projects",
      "Implementing efficient batch processing pipelines for transformer models",
      "Integrating multiple data sources (price data and sentiment) into reinforcement learning frameworks",
      "Using PPO for continuous action spaces in portfolio optimization problems",
      "The value of domain-specific models like FinBERT for financial sentiment classification",
      "Creating reproducible research pipelines with Makefiles and well-documented scripts",
      "How sentiment analysis can help RL agents adapt to volatile market conditions and real-world events",
      "The limitations of traditional methods (moving averages, mean-variance optimization) that only look at past behavior",
      "Building systems that combine quantitative and qualitative analysis for more comprehensive market understanding"
    ],
    images: [
      { src: "/projects/sentiment/dataset-overview.png", alt: "Dataset overview", caption: "Daily financial news used for 6k+ stocks, ~4m articles from 2009-2020" },
      { src: "/projects/sentiment/ppo-hyperparameters.png", alt: "PPO hyperparameters", caption: "PPO agent hyperparameters used for portfolio optimization" },
      { src: "/projects/sentiment/portfolio-returns.png", alt: "Portfolio returns comparison", caption: "Figure 1: Portfolio returns across sentiment settings and time periods" }
    ]
  },
  {
    id: "pacman-ai",
    title: "Pacman AI Projects",
    shortDescription: "Comprehensive AI implementation series covering search algorithms, adversarial search, reinforcement learning, and probabilistic inference in the Berkeley Pacman framework.",
    fullDescription: "A complete series of AI projects implementing fundamental artificial intelligence algorithms within the Berkeley AI Pacman framework. This comprehensive project encompasses four major components: (1) Search Algorithms - implementing DFS, BFS, UCS, and A* with custom heuristics for pathfinding and maze navigation, including complex problems like the corners problem and food search; (2) Multi-Agent Adversarial Search - developing intelligent game-playing agents using Minimax, Alpha-Beta Pruning, and Expectimax algorithms to compete against ghost adversaries with sophisticated evaluation functions; (3) Reinforcement Learning - implementing both model-based (Value Iteration) and model-free (Q-Learning) approaches, including approximate Q-learning with feature extractors for handling large state spaces; (4) Probabilistic Inference - building exact and approximate inference systems using Hidden Markov Models, particle filtering, and Bayesian inference to track invisible ghosts with noisy sensors. Each component demonstrates different aspects of AI problem-solving, from deterministic search to probabilistic reasoning, showcasing the breadth of techniques needed for intelligent agent design.",
    technologies: ["Python", "Graph Algorithms", "Game Theory", "MDPs", "Q-Learning", "Bayesian Inference", "Particle Filtering", "HMMs", "Heuristic Design", "Adversarial Search"],
    year: "2025",
    status: "Completed",
    category: "AI/ML",
    color: "#FFD700",
    features: [
      "Search Algorithms: DFS, BFS, UCS, A* with Manhattan/Euclidean heuristics",
      "Corners Problem: Custom state space representation with admissible heuristics",
      "Food Search: Efficient pathfinding to collect all food dots optimally",
      "Minimax Agent: Optimal decision-making in two-player zero-sum games",
      "Alpha-Beta Pruning: Optimized search tree exploration reducing computation",
      "Expectimax Agent: Handling stochastic opponents with probabilistic models",
      "Value Iteration: Model-based RL computing optimal policies for MDPs",
      "Q-Learning: Model-free RL with epsilon-greedy exploration strategies",
      "Approximate Q-Learning: Feature-based function approximation for large state spaces",
      "Exact Inference: Forward algorithm for maintaining belief distributions",
      "Particle Filtering: Sequential Monte Carlo methods for approximate inference",
      "Joint Particle Filter: Tracking multiple ghosts simultaneously",
      "Custom Evaluation Functions: Strategic game state assessment",
      "Gridworld Environment: Testing RL algorithms in controlled settings"
    ],
    challenges: [
      "Designing admissible and consistent heuristics that maintain optimality guarantees while improving search efficiency",
      "Managing exponential state space growth in complex search problems like the corners and food search",
      "Balancing search depth with computation time in adversarial scenarios with multiple agents",
      "Tuning hyperparameters (learning rate, discount factor, exploration rate) for optimal RL performance",
      "Handling particle degeneracy in low-probability scenarios requiring intelligent resampling",
      "Efficiently tracking multiple ghosts with correlated movements using joint particle filters",
      "Designing effective evaluation functions that capture game state nuances without overfitting"
    ],
    learnings: [
      "Deep understanding of trade-offs between completeness, optimality, time complexity, and space complexity in search algorithms",
      "Importance of problem formulation and state space representation in making AI problems tractable",
      "How heuristic quality dramatically affects search performance - a good heuristic can reduce search space by orders of magnitude",
      "Game theory fundamentals including zero-sum games, minimax theorem, and optimal strategies",
      "Critical role of pruning techniques (alpha-beta) in making adversarial search computationally feasible",
      "Fundamental differences between model-based (planning) and model-free (learning) reinforcement learning approaches",
      "How feature-based representations enable generalization and handle large/continuous state spaces",
      "Trade-offs between exact inference (computationally expensive but optimal) and approximate inference (scalable but approximate)",
      "Real-world applications of Hidden Markov Models and Bayesian inference in tracking and localization problems",
      "Exploration-exploitation dilemma in reinforcement learning and strategies to balance them effectively"
    ],
    images: [
      { src: "/projects/pacman-ai/search-algorithms.png", alt: "A* search algorithm", caption: "A* search finding optimal path through maze using Manhattan heuristic" },
      { src: "/projects/pacman-ai/minimax-gameplay.png", alt: "Minimax agent gameplay", caption: "Minimax agent making strategic decisions against multiple ghost adversaries" },
      { src: "/projects/pacman-ai/value-iteration.png", alt: "Value iteration visualization", caption: "Value iteration computing Q-values and optimal value function in Gridworld after 100 iterations" },
      { src: "/projects/pacman-ai/exact-inference.png", alt: "Exact inference beliefs", caption: "Exact inference maintaining belief distributions over ghost locations with noisy distance sensors" }
    ]
  },
  {
    id: "college-marketplace",
    title: "College Marketplace",
    shortDescription: "A personal item exchange platform tailored to college students, enabling peer-to-peer transactions and eliminating shipping fees through in-person exchanges.",
    fullDescription: "College Marketplace is a web-based marketplace platform designed specifically for college students to buy and sell items directly from their peers. The platform eliminates the need to wait for shipping or pay exchange fees by facilitating in-person transactions at convenient campus locations like the student union. The system features user accounts with personal and contact information, dynamic item listings with detailed information pulled from the database, and a comprehensive marketplace page with search functionality by name and category. The platform is built on a robust database architecture with two primary tables (Users and Listings) related by RCSID, ensuring efficient data organization and retrieval. Security is a top priority, with SSL/TLS encryption, input validation and sanitization, session management, isolated environments, and comprehensive error handling. The platform encourages personal contact between buyers and sellers while maintaining security and user privacy.",
    technologies: ["Web Development", "Database Design", "SSL/TLS", "Session Management", "Input Validation", "SQL"],
    year: "2023",
    status: "Completed",
    category: "Web Development",
    color: "#50C878",
    features: [
      "User account system with personal and contact information",
      "Dynamic item listings with database-driven content",
      "Marketplace page with comprehensive listing display",
      "Search functionality by item name",
      "Search functionality by category",
      "Listing creation via form interface",
      "Removable listings for sellers",
      "Database architecture with Users and Listings tables",
      "RCSID-based table relationships",
      "SSL/TLS encryption for secure connections",
      "Input validation and sanitization",
      "Session management system",
      "Isolated environments for security",
      "Comprehensive error handling"
    ],
    challenges: [
      "Designing database schema to efficiently relate users and listings",
      "Implementing secure session management to protect user data",
      "Creating dynamic listing displays that pull information from the database",
      "Building search functionality that works across multiple criteria (name and category)",
      "Ensuring input validation and sanitization to prevent security vulnerabilities",
      "Balancing personal contact between users with security and privacy requirements"
    ],
    learnings: [
      "Database design principles for marketplace applications",
      "Security best practices including SSL/TLS encryption and input validation",
      "Session management techniques for web applications",
      "Building user-friendly search interfaces with multiple filtering options",
      "Creating dynamic content displays that efficiently query and present database information",
      "The importance of isolated environments and error handling in production applications",
      "Designing platforms that encourage community interaction while maintaining security"
    ],
    images: [
      { src: "/projects/college-marketplace/architecture-diagrams.png", alt: "Information and database architecture", caption: "Information architecture and database architecture diagrams showing Users and Listings table relationships" },
      { src: "/projects/college-marketplace/homepage.png", alt: "College Marketplace homepage", caption: "Homepage featuring animated background, login button, and platform logo" },
      { src: "/projects/college-marketplace/marketplace-ui.png", alt: "Marketplace UI design", caption: "Marketplace UI design in Figma showing dynamic listing display and search functionality" },
      { src: "/projects/college-marketplace/post-listing-ui.png", alt: "Post listing UI design", caption: "Post a listing UI design in Figma for creating new item listings" }
    ]
  },
  {
    id: "scary-racing-game",
    title: "Scary Racing Game",
    shortDescription: "A Need for Speed inspired racing game with horror elements, featuring ghostly enemies that dynamically chase the player through fast-paced gameplay.",
    fullDescription: "Scary Racing Game is a unique fusion of racing and horror genres, developed in Unreal Engine. The game combines the fast-paced excitement of racing games with the tension and unpredictability of horror games. Players compete to navigate a map while being chased by aggressive ghost vehicles that spawn dynamically and pursue the player with momentum-based movement. The project evolved from an initial bumper car concept inspired by Five Nights at Freddy's to a high-speed racing experience inspired by the Need for Speed series, with regular police vehicles replaced by ghost vehicles. The game features sophisticated enemy AI that uses distance-based speed scaling, dynamic spawning systems with probability-based checks, and jumpscare mechanics. The implementation includes Racer Blueprints for player and AI-controlled racing cars, Enemy Blueprints for ghostly pursuers using Floating Pawn Movement, and an Enemy Spawner Blueprint that uses timed checks instead of tick functions for optimal performance. The enemy AI behaves similarly to boids, with realistic acceleration and braking behaviors that required careful tuning to balance difficulty and gameplay feel.",
    technologies: ["Unreal Engine", "Blueprints", "C++", "Game AI", "Spline Pathfinding", "Floating Pawn Movement"],
    year: "2025",
    status: "Completed",
    category: "Game Development",
    color: "#8B0000",
    features: [
      "Need for Speed inspired high-speed racing mechanics",
      "Dynamic enemy spawning system with probability-based checks",
      "Ghost vehicle AI with momentum-based movement and distance-based speed scaling",
      "Racer Blueprint system for player and AI-controlled racing cars",
      "Enemy Spawner with timed check system for optimal performance",
      "Jumpscare animations with sound and UI components",
      "Spline-based pathfinding for enemy navigation",
      "Realistic acceleration and braking behaviors",
      "Enemy cap system to prevent overwhelming the player",
      "Distance-based spawn point selection for strategic enemy placement"
    ],
    challenges: [
      "Implementing realistic acceleration and braking behaviors where slight changes made significant differences in game difficulty",
      "Balancing enemy speed scaling to create tension without making the game unfair or unplayable",
      "Optimizing performance by replacing tick functions with timed check systems",
      "Creating engaging gameplay feel after pivoting from the original bumper car concept",
      "Designing enemy AI that creates constant fear factor without overwhelming pressure",
      "Tuning probability-based spawning to maintain unpredictability while ensuring fair gameplay"
    ],
    learnings: [
      "Importance of playtesting and being willing to pivot entire game concepts when core mechanics aren't fun",
      "How to implement boids-like AI behavior in a racing game context",
      "Performance optimization techniques in Unreal Engine, particularly avoiding tick functions",
      "Game design iteration: transitioning from slow-paced bumper cars to fast-paced racing significantly improved player engagement",
      "Balancing horror elements (tension, unpredictability) with racing mechanics (speed, control)",
      "Implementing dynamic spawning systems that maintain unpredictability while preventing player overwhelm",
      "Creating momentum-based movement systems using Unreal Engine's Floating Pawn Movement component",
      "The critical role of gameplay feel and pacing in creating engaging horror-racing hybrid experiences"
    ],
    images: [
      { src: "/projects/scary-racing-game/gameplay-rendered.png", alt: "Rendered gameplay", caption: "In-game view showing high-speed racing with ghost enemies in pursuit" },
      { src: "/projects/scary-racing-game/scene-view.png", alt: "Scene view with entities", caption: "Unreal Engine scene view displaying all entities, spawners, and level layout" },
      { src: "/projects/scary-racing-game/racer-blueprint.png", alt: "Racer Blueprint", caption: "Racer Blueprint implementation for player and AI-controlled racing cars" },
      { src: "/projects/scary-racing-game/enemy-blueprint.png", alt: "Enemy Blueprint", caption: "Enemy Blueprint with momentum-based AI, distance-based speed scaling, and jumpscare mechanics" },
      { src: "/projects/scary-racing-game/enemy-spawner-blueprint.png", alt: "Enemy Spawner Blueprint", caption: "Enemy Spawner Blueprint using timed checks and probability-based spawning system" }
    ]
  }
];

