/**
 * DATA STRUCTURE EXPLANATION
 * --------------------------
 * 1. Course: The top-level container.
 * 2. Module: A thematic section (was 'Unit').
 * 3. Lesson: A specific topic (was 'Chapter').
 * 4. ContentBlock: Building blocks.
 * 5. Question: Supports MC, Fill-blank, Writing, Multimedia, Matching.
 */

export type ContentType = 'text' | 'video' | 'youtube' | 'image' | 'quiz';

export type QuestionType = 'multiple-choice' | 'fill-blank' | 'writing' | 'audio' | 'video' | 'matching';

export interface Question {
    id: string;
    type: QuestionType; // NEW: Discriminator for rendering
    text: string;
    options?: string[]; // Only for multiple-choice
    correctAnswer?: number | string; // Number for MC, String for fill-blank
    explanation?: string;
    placeholder?: string; // For Input/Textarea
    matchingPairs?: { left: string; right: string }[]; // For Matching type
}

export interface ContentBlock {
    id: string;
    type: ContentType;
    content: any; // Markdown text, URL, or Question[]
    title?: string;
}

export interface Lesson {
    id: string;
    title: string;
    completed: boolean;
    duration: string; // NEW: Estimated time (e.g. "15 min")
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced'; // NEW: Difficulty level
    description?: string; // NEW: Brief summary of the lesson
    blocks: ContentBlock[];
    resources?: { title: string; description?: string; url: string; type: 'web' | 'video' }[];
}

export interface Module {
    id: string;
    title: string;
    description?: string; // NEW: Module introduction/context
    duration?: string; // NEW: Total module time
    outcomes?: string[]; // NEW: Learning outcomes for this specific module
    lessons: Lesson[];
    quiz?: {
        id: string;
        title: string;
        questions: Question[];
    }
}

export interface CourseData {
    id?: string; // NEW: Course ID
    title: string;
    description: string;
    type: 'tech' | 'language';
    progress: number;
    objectives: string[];
    syllabusOverview: { title: string; description: string; duration: string }[];
    modules: Module[];
    finalExam: {
        questions: Question[];
    }
}

// ------------------------------------------------------------------
// MOCK DATA: English for Business Communication
// ------------------------------------------------------------------

export const ENGLISH_COURSE: CourseData = {
    id: "english-101",
    title: "English for Business: The Professional Edge",
    description: "A comprehensive masterclass designed to elevate your professional presence. From the psychology of negotiation to the nuances of cross-cultural communication, this course moves beyond grammar to the strategy of business English.",
    type: 'language',
    progress: 10,
    objectives: [
        "Articulate your professional value using the 4 Ps framework (Problem, Promise, Proof, Push)",
        "Construct persuasive emails that drive action using the 'Inbox Zero' methodology",
        "Master negotiation psychology including BATNA and Anchoring",
        "Deliver culturally intelligent presentations tailored to High and Low context audiences"
    ],
    syllabusOverview: [
        { title: "Module 1: Professional Identity", description: "Crafting your narrative: The Elevator Pitch and the 4Ps.", duration: "1 Week" },
        { title: "Module 2: Advanced Business Writing", description: "Tone, Clarity, and the psychology of email.", duration: "1.5 Weeks" },
        { title: "Module 3: Negotiation Dynamics", description: "Hard and soft negotiation strategies.", duration: "2 Weeks" },
        { title: "Module 4: Global Presentation Skills", description: "Public speaking in a multicultural boardroom.", duration: "1.5 Weeks" },
        { title: "Capstone Assessment", description: "Comprehensive scenario-based final exam.", duration: "2 Hours" }
    ],
    modules: [
        // ===================================
        // MODULE 1: Professional Identity
        // ===================================
        {
            id: "m1",
            title: "Module 1: Professional Identity",
            description: "Your professional identity is the single most important asset you own. In this module, we move beyond the résumé to craft a compelling narrative that answers the question 'Who are you?' with impact and relevance. We will cover the psychology of first impressions and the 4Ps framework for persuasive introductions.",
            duration: "2 Hours",
            outcomes: [
                "Understand the 'Halo Effect' and its role in networking",
                "Craft a 30-second elevator pitch using the Problem/Solution model",
                "Differentiate between 'Features' (what you do) and 'Benefits' (what you solve)"
            ],
            lessons: [
                {
                    id: "u1c1", title: "The Psychology of Introductions", completed: true,
                    duration: "15 min",
                    difficulty: "Beginner",
                    description: "Learn why first impressions stick and how to hack the 'Halo Effect' to your advantage.",
                    blocks: [
                        { id: "event1", type: "text", title: "1. The First Impression", content: "### The 7-Second Rule and The Halo Effect\n\nResearch from Princeton psychologists suggests you have a tenth of a second to form an impression of a stranger from their face, and longer interactions don't significantly alter those impressions. In business, we often say you have just **seven seconds** to establish credibility.\n\nThis phenomenon is known as the **Halo Effect**. If your first interaction (your outfit, your handshake, or your opening line) is positive, people will subconsciously assume your other traits (intelligence, competence, leadership) are also positive. Conversely, a weak introduction creates a 'Horns Effect', where you must fight an uphill battle to prove your worth.\n\nMost people answer \"What do you do?\" with a boring, functional title:\n*   *\"I'm an accountant.\"*\n*   *\"I work in sales.\"*\n\nThis fails the Halo Effect test because it is forgettable. **Top performers answer with impact, focusing on the value they generate:**\n*   *\"I help Fortune 500 companies save millions in tax liability.\"*\n*   *\"I help companies scale their revenue through strategic partnerships.\"*\n\nBy focusing on the *outcome* rather than the *task*, you immediately position yourself as a person of value." },
                        { id: "event1_vid", type: "youtube", title: "Analysis: A Perfect Pitch", content: "https://www.youtube.com/embed/Lb0WZyeZz4U" },
                        {
                            id: "event3", type: "quiz", title: "Context Check",
                            content: [
                                {
                                    id: "recall1", type: "matching",
                                    text: "Match the Introduction Style to the Context:",
                                    matchingPairs: [
                                        { left: "Formal Boardroom", right: "Good morning, Ms. Chen. It is a pleasure." },
                                        { left: "Tech Startup Mixer", right: "Hey, I'm Alex. I build shipping logic." },
                                        { left: "Job Interview", right: "Thank you for the opportunity to meet today." }
                                    ],
                                    explanation: "Matching your register (formality level) to the environment is the first step of communication."
                                }
                            ]
                        }
                    ],
                    resources: [
                        { title: "TED: The Science of First Impressions", description: "Explore the psychology behind how we form instant judgments about others.", url: "https://www.ted.com/talks/alexander_todorov_the_science_of_first_impressions", type: "video" },
                        { title: "Psychology Today: The Halo Effect", description: "Learn how one positive trait can influence our overall perception of a person.", url: "https://www.psychologytoday.com/us/basics/halo-effect", type: "web" }
                    ]
                },
                {
                    id: "u1c2", title: "The 4Ps Framework", completed: false,
                    duration: "30 min",
                    difficulty: "Intermediate",
                    description: "A step-by-step masterclass on structuring your value proposition using the 4Ps model.",
                    blocks: [
                        { id: "event4", type: "text", title: "Structuring Value", content: "### The 4Ps of Persuasion: A Deep Dive\n\nTo sell yourself or your ideas effectively, you need a structure that guides the listener from their current state of pain to a future state of relief. We use the **4Ps Framework**:\n\n#### 1. Problem (The 'Why')\nStart with the client's pain. Do not start with yourself. If you are a web designer, don't say \"I design websites.\" Say: *\"Many small businesses lose 50% of their customers because their mobile site loads too slowly.\"* This immediately validates the client's struggle and hooks their attention.\n\n#### 2. Promise (The 'What')\nOnce the problem is established, offer the solution. This is where you introduce yourself or your product. *\"I build 'mobile-first' websites that are guaranteed to load in under 2 seconds.\"* Your promise must directly address the problem you just raised.\n\n#### 3. Proof (The 'How')\nIn a cynical world, promises are cheap. You need evidence. This can be social proof (logos of big clients), data (case studies), or demonstrations. *\"I recently helped Client X increase their mobile conversion rate by 200% in just three months.\"* Specific numbers are always more persuasive than adjectives.\n\n#### 4. Push (The 'Next Step')\nFinally, guide the interaction. Weak communicators trail off with \"So, yeah...\" Strong communicators suggest a specific, low-friction next step. *\"I'd love to look at your current site and see if we can find similar speed wins. Would you be open to a 10-minute audit next Tuesday?\"*\n\n**Summary:**\n1.  **Problem**: Hook them with pain.\n2.  **Promise**: Offer the cure.\n3.  **Proof**: Show the evidence.\n4.  **Push**: Guide the action." },
                        { id: "event5_img", type: "image", title: "Visual Guide: The 4Ps", content: "https://images.unsplash.com/photo-1552664730-d307ca884978" }
                    ],
                    resources: [
                        { title: "HBR: How to Pitch a Brilliant Idea", description: "A comprehensive guide on structuring and delivering persuasive presentations.", url: "https://hbr.org/2003/09/how-to-pitch-a-brilliant-idea", type: "web" }
                    ]
                },
                {
                    id: "u1c3", title: "Application Workshop", completed: false,
                    duration: "20 min",
                    difficulty: "Advanced",
                    description: "Put theory into practice by analyzing case studies and drafting your own pitch.",
                    blocks: [
                        {
                            id: "event6", type: "quiz", title: "Knowledge Check",
                            content: [
                                {
                                    id: "prac1", type: "multiple-choice", text: "Which component of the 4Ps connects emotionally with the client's pain?", options: ["Promise", "Proof", "Problem", "Push"], correctAnswer: 2, explanation: "The Problem validates their struggle, building trust."
                                },
                                {
                                    id: "prac2", type: "fill-blank", text: "The 'Proof' must always be ______ and specific.", correctAnswer: "measurable", placeholder: "m__________", explanation: "Vague proof is opinion. Specific numbers are facts."
                                }
                            ]
                        },
                        { id: "event9", type: "text", title: "Assignment", content: "### Your Mission: Draft Your 4Ps\n\nNow it is your turn. Draft your own 4Ps introduction for your current role or business.\n\n*   **Constraint 1**: The 'Problem' must be something your customer loses money or sleep over.\n*   **Constraint 2**: The 'Proof' must contain at least one number (%, $, or time).\n*   **Constraint 3**: The 'Push' must be a question, not a statement.\n\n*Example:* \"Most logistics companies bleed money on empty return trucks (Problem). We built a shared-fleet algorithm that fills those empty legs (Promise). Last year we saved our partners $40M in fuel costs (Proof). Are you open to seeing how much we could save on your NY-LA route? (Push)\"" }
                    ]
                }
            ],
            quiz: {
                id: "mq1",
                title: "Module 1 Review: Elevator Pitch",
                questions: [
                    { id: "mq1_1", type: "multiple-choice", text: "What is the primary goal of the 'Push' step?", options: ["To force a sale", "To clarify the next specific action", "To brag about achievements"], correctAnswer: 1 },
                    { id: "mq1_2", type: "writing", text: "Rewrite this weak opening: 'I am a web designer.' use the Problem/Promise framework.", placeholder: "Start with the problem businesses face..." }
                ]
            }
        },

        // ===================================
        // MODULE 2: Advanced Business Writing
        // ===================================
        {
            id: "m2",
            title: "Module 2: Advanced Business Writing",
            description: "In the digital age, you are what you write. This module focuses on the nuances of email communication, ensuring clarity, appropriate tone, and productivity through the 'Inbox Zero' methodology.",
            duration: "2.5 Hours",
            outcomes: [
                "Calibrate email tone from 'Cold' to 'Warm' depending on the relationship",
                "Apply the 'BLUF' (Bottom Line Up Front) method for clarity",
                " Master the 4Ds of email triage to reach Inbox Zero"
            ],
            lessons: [
                {
                    id: "u2c1", title: "Tone & Clarity", completed: false,
                    duration: "45 min",
                    difficulty: "Intermediate",
                    description: "How to interpret and control the 'emotional temperature' of your writing.",
                    blocks: [
                        { id: "u2b1", type: "text", content: "### The Spectrum of Tone\n\nBusiness writing isn't just about grammar; it's about **relationship management**. The tone of your email dictates how the recipient 'hears' your voice in their head. We can measure tone on a spectrum from Cold (Formal) to Warm (Casual).\n\n#### The Formal Tone (Cold)\nUsed for contracts, bad news, first-time introductions to superiors, or when legal precision is required. It uses passive voice, full sentences, and honorifics.\n*   *\"We regret to inform you that your application has been declined. Please refer to the attached document for details.\"*\n\n#### The Casual Tone (Warm)\nUsed for internal team chats, long-term peers, and building rapport. It uses active voice, contractions, emojis (sparingly), and softer language.\n*   *\"So sorry about the mix-up! I've attached the details below—let me know if that helps.\"*\n\n#### The Danger Zone: Passive Aggressive\nThis happens when you try to wrap a cold message in warm language, or vice versa. Phrases like *\"As per my last email...\"* or *\"Not sure if you saw update...\"* are often read as hostile. \n\n**The Golden Rule:** Mirror your recipient's level of formality, but always stay one step more polite than the situation demands. If they sign off with \"Best,\", you sign off with \"Best,\". If they use \"Sincerely,\", you match it." },
                        {
                            id: "u2q1", type: "quiz", title: "Tone Analysis",
                            content: [
                                {
                                    id: "q_u2_1", type: "matching",
                                    text: "Match the phrase to the appropriate Tone:",
                                    matchingPairs: [
                                        { left: "Use of Passive Voice ('Mistakes were made')", right: "Defensive / Evasive" },
                                        { left: "Active Voice ('I made a mistake')", right: "Accountable / Strong" },
                                        { left: "Exclamation points!!!", right: "High Energy / Casual" }
                                    ],
                                    explanation: "Passive voice often signals a lack of ownership, while active voice signals leadership."
                                }
                            ]
                        }
                    ],
                    resources: [
                        { title: "Grammarly: Tone in Business Writing", url: "https://www.grammarly.com/blog/tone-business-writing/", type: "web" }
                    ]
                },
                {
                    id: "u2c2", title: "Email Triage: The 4Ds", completed: false,
                    duration: "30 min",
                    difficulty: "Beginner",
                    description: "A productivity system to keep your inbox empty and your mind clear.",
                    blocks: [
                        { id: "u2b2_vid", type: "youtube", content: "https://www.youtube.com/embed/z95J55p0bc0", title: "Mastering Inbox Zero" },
                        { id: "u2b3", type: "text", content: "### The 4Ds of Productivity\n\nEmail is a great servant but a terrible master. If you leave emails in your inbox to \"think about later,\" you are using your inbox as a to-do list, which it was never designed to be. This causes cognitive load and stress.\n\n**The Solution: The 4Ds.** Touch every email only once, and immediately apply one of these four actions:\n\n1.  **Do**: If the task takes less than 2 minutes (e.g., confirming a meeting time, sending a file), do it right now. Archiving it takes almost as much time as doing it.\n2.  **Delegate**: Are you the best person to answer this? If not, forward it immediately to the right person. Do not become a bottleneck.\n3.  **Defer**: If the task takes longer than 2 minutes (e.g., drafting a proposal), do NOT leave it in the inbox. Move it to your 'To-Do' list or Calendar for a specific time block, then archive the email.\n4.  **Delete**: If it requires no action and has no reference value, delete it. Be ruthless. If it has reference value, archive it to a folder, but get it out of the inbox.\n\n**Result**: Your inbox stays at zero. You never miss a task. You control your time." }
                    ],
                    resources: [
                        { title: "Inbox Zero Original Concept", url: "https://www.43folders.com/izero", type: "web" }
                    ]
                }
            ],
            quiz: {
                id: "mq2",
                title: "Module 2 Review: Writing",
                questions: [
                    { id: "mq2_1", type: "audio", text: "Read the following apology email aloud. Ensure you sound sincere, not robotic.", explanation: "Tone is conveyed through rhythm and word choice." },
                    { id: "mq2_2", type: "multiple-choice", text: "According to the 2-Minute Rule (DO), you should:", options: ["Put it on a to-do list", "Do it immediately", "Delegate it"], correctAnswer: 1 }
                ]
            }
        },

        // ===================================
        // MODULE 3: Negotiation Dynamics
        // ===================================
        {
            id: "m3",
            title: "Module 3: Negotiation Dynamics",
            description: "Negotiation is not about winning; it's about maximizing value. This module introduces game theory concepts like BATNA and Anchoring to give you the upper hand in high-stakes discussions.",
            duration: "3 Hours",
            outcomes: [
                "Calculate your BATNA (Best Alternative to a Negotiated Agreement)",
                "Identify and neutralize 'Anchoring' tactics",
                "Distinguish between 'Distributive' (Zero-sum) and 'Integrative' (Win-Win) negotiation"
            ],
            lessons: [
                {
                    id: "u3c1", title: "BATNA: Your Secret Weapon", completed: false,
                    duration: "60 min",
                    difficulty: "Advanced",
                    description: "Why the person who can walk away always has the most power.",
                    blocks: [
                        { id: "u3b1", type: "text", content: "### Best Alternative to a Negotiated Agreement (BATNA)\n\nThe most common mistake in negotiation is entering a room without knowing your **BATNA**.\n\nYour BATNA is the answer to the question: *\"What will I do if this negotiation fails?\"*\n\n#### The Power Dynamic\nPower in negotiation doesn't come from your title or your wealth. It comes from your alternatives. \n\n*   **Scenario A**: You are desperate to sell your car because you need cash for rent tomorrow. You have zero alternative offers. Your BATNA is \"Eviction.\" **Result**: You have no power. You will accept a lowball offer.\n*   **Scenario B**: You are selling a car, but you already have a written offer from a dealer for $10,000 in your pocket. Your BATNA is \"Selling to the dealer for $10k.\" **Result**: If a private buyer offers $9,500, you can easily say \"No.\" You have all the power.\n\n**Action Step**: Before any negotiation, improve your BATNA. Get another job offer. Get another quote. The stronger your BATNA, the more confidence you will project." }
                    ],
                    resources: [
                        { title: "Harvard PON: Getting to Yes", url: "https://www.pon.harvard.edu/daily/negotiation-skills-daily/batna/", type: "web" }
                    ]
                },
                {
                    id: "u3c2", title: "Anchoring & Framing", completed: false,
                    duration: "45 min",
                    difficulty: "Intermediate",
                    description: "The cognitive bias that determines the final price before the negotiation even begins.",
                    blocks: [
                        { id: "u3b2", type: "text", content: "### The Anchoring Effect\n\nHuman beings are terrible at estimating value in a vacuum. We rely on reference points. The first number put on the table creates a psychological \"Anchor.\" All subsequent negotiation revolves around that number, adjusting up or down from it.\n\n*   **Example**: A designer asks for $5,000 for a logo. You might negotiate them down to $4,000 and feel like you won. But if they had started at $2,000, you would have felt ripped off at $4,000.\n\n#### Expanding the Anchor\nWho should speak first? \n*   **Conventional Wisdom**: \"Never show your hand first.\"\n*   **Scientific Reality**: Research by Kahneman and Tversky suggests the person who drops the first honest anchor usually ends up with a final result closer to their number. By going first, you set the range of the debate. \n\n**Strategy**: If you know the market well, anchor first and anchor aggressively (but credibly). If you don't know the market value, let them speak first so you don't accidentally underbid yourself." },
                        {
                            id: "u3q1", type: "quiz", title: "Strategy Check",
                            content: [
                                {
                                    id: "q_u3_1", type: "fill-blank", text: "The first number mentioned in a negotiation is called the ______.", correctAnswer: "anchor", placeholder: "a_____", explanation: "It weighs down the discussion in its favor."
                                }
                            ]
                        }
                    ]
                }
            ],
            quiz: {
                id: "mq3",
                title: "Module 3 Review: Negotiation",
                questions: [
                    { id: "mq3_1", type: "video", text: "Upload a video practicing your 'Walk Away' line. Use a firm but polite tone.", explanation: "Silence is often your best tool after stating your bottom line." },
                    { id: "mq3_2", type: "multiple-choice", text: "When should you reveal your BATNA?", options: ["Immediately", "Only if beneficial/necessary", "Never"], correctAnswer: 1 }
                ]
            }
        },

        // ===================================
        // MODULE 4: Global Presentation Skills
        // ===================================
        {
            id: "m4",
            title: "Module 4: Global Presentation Skills",
            description: "Business is global. This module covers the essential skills for presenting across cultures, focusing on Hall's High/Low context theory and the art of data storytelling.",
            duration: "2 Hours",
            outcomes: [
                "Navigate cross-cultural communication gaps using Hall's Context Theory",
                "Present complex data as a compelling narrative",
                "Avoid common cultural faux-pas in international meetings"
            ],
            lessons: [
                {
                    id: "u4c1", title: "Storytelling with Data", completed: false,
                    duration: "40 min",
                    difficulty: "Intermediate",
                    description: "Turning spreadsheets into stories that drive decision making.",
                    blocks: [
                        { id: "u4b1", type: "image", content: "https://images.unsplash.com/photo-1551288049-bebda4e38f71", title: "Data Visualization" },
                        { id: "u4b2", type: "text", content: "### Don't Just Show the Chart\n\nData without a story is just noise. A common mistake in presentations is dumping a spreadsheet on a slide and hoping the audience sees the insight. They won't. They will just check their phones.\n\nUse **Freytag's Pyramid** (the structure of dramatic fiction) for data presentations:\n\n1.  **Exposition (The Status Quo)**: Show the baseline data. *\"For the last three years, revenue has been flat at $10M.\"*\n2.  **Inciting Incident (The Change)**: Introduce the variable. *\"However, Competitor X just entered the market with a lower price point.\"*\n3.  **Rising Action (The Struggle)**: Show the negative trend. *\"In Q4, we saw our first dip in renewal rates, down 15%.\"*\n4.  **Climax (The Insight)**: The 'Aha' moment. *\"The data shows this drop is entirely in the Gen Z demographic. They aren't leaving on price; they are leaving on UX.\"*\n5.  **Resolution (The Strategy)**: The proposal. *\"Therefore, we don't need to cut prices. We need to overhaul our mobile app.\"*\n\nBy wrapping the numbers in a narrative arc (Status Quo -> Conflict -> Resolution), you make the data memorable and actionable." }
                    ]
                },
                {
                    id: "u4c2", title: "High vs Low Context Cultures", completed: false,
                    duration: "50 min",
                    difficulty: "Advanced",
                    description: "Understanding the invisible rules of international communication.",
                    blocks: [
                        { id: "u4b4", type: "text", content: "### Hall's Cultural Context Theory\n\nEdward T. Hall categorized cultures into 'High Context' and 'Low Context'. Understanding where your audience falls on this spectrum is critical for international presentations.\n\n#### Low Context (USA, Germany, Scandinavia, Australia)\n*   **Communication**: Explicit, direct, and literal.\n*   **The Message**: Is entirely in the words asserted. Yes means Yes. No means No.\n*   **Presentation Style**: Be concise. Use bullet points. State the bottom line first. Direct disagreement is seen as honest and productive.\n\n#### High Context (Japan, China, Arab World, Latin America)\n*   **Communication**: Implicit, layered, and nuanced.\n*   **The Message**: Is in the context (who is speaking, the setting, the history). The words are less important. 'Yes' often means 'I hear you,' not 'I agree.'\n*   **Presentation Style**: Focus on relationship building first. Give extensive background/history before the main point. Avoid direct conflict or saying 'No' publicly, as it causes loss of face.\n\n**Key Takeaway**: If you present a 'Low Context' deck (rapid-fire bullet points, aggressive asks) to a 'High Context' audience (Japan), you will be seen as rude and unrefined. If you present a 'High Context' deck (long history, vague asks) to a 'Low Context' audience (New York), you will be seen as indecisive and wasting time." },
                        {
                            id: "u4q1", type: "quiz", title: "Cultural IQ",
                            content: [
                                {
                                    id: "q_u4_1", type: "matching",
                                    text: "Match the Country to the Communication Style:",
                                    matchingPairs: [
                                        { left: "Japan", right: "High Context (Read between lines)" },
                                        { left: "USA", right: "Low Context (Say what you mean)" },
                                        { left: "Germany", right: "Low Context (Direct/Literal)" }
                                    ],
                                    explanation: "Misreading context context is the #1 cause of international business failure."
                                }
                            ]
                        }
                    ],
                    resources: [
                        { title: "Erin Meyer: The Culture Map", url: "https://erinmeyer.com/books/the-culture-map/", type: "web" }
                    ]
                }
            ],
            quiz: {
                id: "mq4",
                title: "Module 4 Review: Presentations",
                questions: [
                    { id: "mq4_1", type: "writing", text: "Rewrite the statement 'Sales are down' as a story opening.", placeholder: "Start with the context..." },
                    { id: "mq4_2", type: "multiple-choice", text: "In High Context cultures, what is often MORE important than the contract?", options: ["The content", "The relationship", "The price"], correctAnswer: 1 }
                ]
            }
        }
    ],
    finalExam: {
        questions: [
            // 1. Multiple Choice
            { id: "fq1", type: "multiple-choice", text: "In the 4Ps framework, which element hooks the listener immediately?", options: ["Solution", "Problem", "Ask", "Promise"], correctAnswer: 1 },

            // 2. Fill-in-the-Blank
            { id: "fq2_fill", type: "fill-blank", text: "Your absolute bottom line in a negotiation is called your ______.", correctAnswer: "BATNA", placeholder: "Acronym...", explanation: "Best Alternative To a Negotiated Agreement" },

            // 3. Matching
            {
                id: "fq3_match", type: "matching",
                text: "Match the Term to its Definition.",
                matchingPairs: [
                    { left: "Anchor", right: "The first number put on the table" },
                    { left: "Low Context", right: "Explicit, direct communication" },
                    { left: "Inbox Zero", right: "Process of triaging email daily" }
                ]
            },

            // 4. Writing
            { id: "fq4_write", type: "writing", text: "Explain why 'Passive Voice' is often considered weak in business writing.", placeholder: "Passive voice avoids responsibility..." },

            // 5. Audio
            { id: "fq5_audio", type: "audio", text: "Record yourself giving a 30-second 'Bad News' update using a Formal Tone.", explanation: "Focus on clarity, lack of emotion, and next steps." },

            // 6. Video
            { id: "fq6_video", type: "video", text: "Upload a video response: Demonstrate the difference between 'Attentive' and 'Dismissive' body language.", explanation: "Eye contact and posture." },

            // Extra Mixed
            { id: "fq7", type: "multiple-choice", text: "The '2-Minute Rule' suggests you should immediately do a task if:", options: ["It takes < 2 mins", "It is urgent", "Your boss asks"], correctAnswer: 0 }
        ]
    }
};
