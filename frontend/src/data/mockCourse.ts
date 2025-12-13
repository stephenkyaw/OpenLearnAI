export interface Question {
    id: string;
    text: string;
    type: 'multiple-choice' | 'fill-blank' | 'matching' | 'writing' | 'audio' | 'video';
    options?: string[];
    correctAnswer?: string | number;
    matchingPairs?: { left: string; right: string }[];
    explanation?: string;
    placeholder?: string;
}

export interface Quiz {
    title: string;
    questions: Question[];
}

export interface Block {
    id: string;
    type: 'text' | 'image' | 'video' | 'quiz' | 'youtube';
    title?: string;
    content: any;
}

export interface Lesson {
    id: string;
    title: string;
    duration: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    completed: boolean;
    description?: string;
    blocks: Block[];
    resources?: { title: string; url: string; description: string }[];
}

export interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
    quiz?: Quiz;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    progress: number;
    objectives: string[];
    syllabusOverview: string[];
    modules: Module[];
    finalExam?: {
        questions: Question[];
    };
}

// VIDEO IDS (Guaranteed to work)
// 1. L9AWrJnhsRI - Present Simple
// 2. AEBRIBtq7q0 - Continuous
// 3. 0Wrv_ZviMEc - Past Simple
// 4. M4b22jUqG5A - Past Continuous
// 5. nkO9g0qS2CA - Passive

export const MOCK_COURSE: Course = {
    id: 'english-101',
    title: 'English Grammar in Use: Complete Mastery',
    description: 'The ultimate guide to mastering English grammar. 5 comprehensive modules based on the standard reference and practice curriculum.',
    progress: 2,
    objectives: [
        'Master all major Tenses (Present, Past, Future, Perfect)',
        'Understand complex Modal Verbs usage',
        'Gain proficiency in Passive Voice structure',
        'Correctly use Reported Speech and Conditionals'
    ],
    syllabusOverview: [
        'Module 1: Present & Past Tenses',
        'Module 2: Present Perfect & Past',
        'Module 3: Future Tenses',
        'Module 4: Modals & Auxiliaries',
        'Module 5: Passive Voice & Reported Speech'
    ],
    modules: [
        // ==================================================================================
        // MODULE 1: Present & Past Tenses
        // ==================================================================================
        {
            id: 'mod-1',
            title: 'Module 1: Present & Past Tenses',
            lessons: [
                {
                    id: 'l-1-1', title: 'Present Continuous (I am doing)', duration: '15 min', difficulty: 'Beginner', completed: true,
                    description: 'Use the Present Continuous for actions happening at the time of speaking.',
                    blocks: [
                        { id: 'b1', type: 'image', title: 'Context: Driving Now', content: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b2', type: 'text', content: '# Unit 1: Present Continuous\n\n**Study this example situation:**\nSarah is in her car. She is on her way to work. She is driving to work.\n\nThis means: she is driving **now**, at the time of speaking. The action is not finished.\n\n**Form:**\n*   I **am** (not) driving\n*   He/She/It **is** (not) working\n*   We/You/They **are** (not) eating' },
                        { id: 'b3', type: 'youtube', title: 'Video Explanation', content: 'https://www.youtube.com/embed/AEBRIBtq7q0' },
                        {
                            id: 'q1', type: 'quiz', title: 'Quick Check: Present Continuous', content: [
                                { id: 'l1q1', type: 'fill-blank', text: 'Please be quiet. I ____ (work).', correctAnswer: 'am working', explanation: 'Happening now.' },
                                { id: 'l1q2', type: 'multiple-choice', text: 'Where is Tom? He ____ a shower.', options: ['has', 'is having', 'have'], correctAnswer: 1, explanation: 'Action in progress.' },
                                { id: 'l1q3', type: 'multiple-choice', text: 'Look! It ____.', options: ['rains', 'is raining', 'rain'], correctAnswer: 1, explanation: 'Happening at time of speaking.' }
                            ]
                        }
                    ],
                    resources: [
                        { title: 'Unit 1 Worksheet', url: '#', description: 'Practice PDF' },
                        { title: 'Grammar Reference', url: '#', description: 'List of Stative Verbs' }
                    ]
                },
                {
                    id: 'l-1-2', title: 'Present Simple (I do)', duration: '20 min', difficulty: 'Beginner', completed: false,
                    description: 'Use the Present Simple for general truths and habits.',
                    blocks: [
                        { id: 'b1', type: 'image', title: 'Routine: Every Day', content: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b2', type: 'text', content: '# Unit 2: Present Simple\n\nWe use the present simple to talk about things in general. We use it to say that something happens all the time or repeatedly, or that something is true in general.\n\n*   Nurses **look** after patients in hospitals.\n*   I usually **go** away at weekends.\n*   The earth **goes** round the sun.' },
                        { id: 'b3', type: 'youtube', title: 'Present Simple Deep Dive', content: 'https://www.youtube.com/embed/L9AWrJnhsRI' },
                        {
                            id: 'q1', type: 'quiz', title: 'Quick Check: Habits', content: [
                                { id: 'l2q1', type: 'multiple-choice', text: 'I ____ tennis every Sunday.', options: ['play', 'playing', 'am playing'], correctAnswer: 0, explanation: 'Repeated action/habit.' },
                                { id: 'l2q2', type: 'fill-blank', text: 'The sun ____ (rise) in the east.', correctAnswer: 'rises', explanation: 'General truth.' },
                                { id: 'l2q3', type: 'multiple-choice', text: 'She ____ drink coffee.', options: ['don\'t', 'doesn\'t', 'isn\'t'], correctAnswer: 1, explanation: 'Negative form for She is "doesn\'t".' }
                            ]
                        }
                    ],
                    resources: [{ title: 'Adverbs of Frequency', url: '#', description: 'always, usually, often' }]
                },
                {
                    id: 'l-1-3', title: 'Present Continuous vs. Simple', duration: '25 min', difficulty: 'Intermediate', completed: false,
                    description: 'Comparing "I am doing" and "I do".',
                    blocks: [
                        { id: 'b1', type: 'text', content: '# Comparison\n\n*   **Continuous:** "The water is boiling. Can you turn it off?" (Happening Now)\n*   **Simple:** "Water boils at 100 degrees Celsius." (Fact)\n\nSome verbs are rarely used in continuous (e.g., like, love, want, know, understand, believe). "I **know** him." NOT "I am knowing him."' },
                        { id: 'b2', type: 'image', title: 'Contrast', content: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b3', type: 'youtube', title: 'Tense Battle!', content: 'https://www.youtube.com/embed/AEBRIBtq7q0' },
                        {
                            id: 'q1', type: 'quiz', title: 'Quick Check: Which Tense?', content: [
                                { id: 'l3q1', type: 'multiple-choice', text: 'He often ____ a hat, but he ____ a hat today.', options: ['wears / isn\'t wearing', 'is wearing / doesn\'t wear'], correctAnswer: 0 },
                                { id: 'l3q2', type: 'fill-blank', text: 'I ____ (not/understand) this sentence.', correctAnswer: 'do not understand' },
                                { id: 'l3q3', type: 'multiple-choice', text: 'What ____? "I am an architect."', options: ['are you doing', 'do you do'], correctAnswer: 1 }
                            ]
                        }
                    ],
                    resources: [{ title: 'Stative Verbs', url: '#', description: 'Verbs not used in continuous' }]
                },
                {
                    id: 'l-1-4', title: 'Past Simple (I did)', duration: '20 min', difficulty: 'Beginner', completed: false,
                    description: 'Talking about completed actions in the past.',
                    blocks: [
                        { id: 'b1', type: 'text', content: '# Unit 5: Past Simple\n\nVery often the past simple ends in **-ed** (regular verbs).\n*   I work in such an agency -> I **worked** in an agency.\n*   We invite them -> We **invited** them to our party.\n\n**Irregular Verbs:**\n*   Write -> Wrote\n*   See -> Saw\n*   Go -> Went' },
                        { id: 'b2', type: 'image', title: 'History', content: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b3', type: 'youtube', title: 'Past Simple Pronunciation', content: 'https://www.youtube.com/embed/0Wrv_ZviMEc' },
                        {
                            id: 'q1', type: 'quiz', title: 'Quick Check: Past Events', content: [
                                { id: 'l4q1', type: 'fill-blank', text: 'Wolfgang Amadeus Mozart ____ (write) more than 600 pieces of music.', correctAnswer: 'wrote' },
                                { id: 'l4q2', type: 'multiple-choice', text: 'We ____ to the cinema yesterday.', options: ['go', 'went', 'gone'], correctAnswer: 1 },
                                { id: 'l4q3', type: 'fill-blank', text: 'When ____ (do) you arrive?', correctAnswer: 'did' }
                            ]
                        }
                    ],
                    resources: [{ title: 'Irregular Verbs List', url: '#', description: 'Top 100 irregulars' }]
                },
                {
                    id: 'l-1-5', title: 'Past Continuous (I was doing)', duration: '25 min', difficulty: 'Intermediate', completed: false,
                    description: 'Actions that were in progress at a specific time in the past.',
                    blocks: [
                        { id: 'b1', type: 'text', content: '# Unit 6: Past Continuous\n\nThis time last year I was living in Brazil.\nWhat were you doing at 10 o\'clock last night?\n\n**I was doing** something = I was in the middle of doing it at a certain time.' },
                        { id: 'b2', type: 'image', title: 'In Progress', content: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b3', type: 'youtube', title: 'Past Continuous Story', content: 'https://www.youtube.com/embed/M4b22jUqG5A' },
                        {
                            id: 'q1', type: 'quiz', title: 'Quick Check: Was/Were + ing', content: [
                                { id: 'l5q1', type: 'multiple-choice', text: 'I waved to Helen, but she ____.', options: ['wasn\'t looking', 'didn\'t look'], correctAnswer: 0, explanation: 'She was in the middle of not looking.' },
                                { id: 'l5q2', type: 'fill-blank', text: 'It ____ (rain) when I got up.', correctAnswer: 'was raining' },
                                { id: 'l5q3', type: 'multiple-choice', text: 'What ____ at 2pm?', options: ['did you do', 'were you doing'], correctAnswer: 1 }
                            ]
                        }
                    ],
                    resources: [{ title: 'Narrative Tenses', url: '#', description: 'Guide' }]
                }
            ],
            quiz: {
                title: 'Module 1 Assessment: Tense Mastery',
                questions: [
                    { id: 'm1q1', type: 'multiple-choice', text: 'Look! The bus ____.', options: ['come', 'comes', 'is coming', 'coming'], correctAnswer: 2 },
                    { id: 'm1q2', type: 'fill-blank', text: 'I usually ____ (go) to work by car.', correctAnswer: 'go' },
                    { id: 'm1q3', type: 'multiple-choice', text: 'Where did you go? "I ____ to the dentist."', options: ['go', 'went', 'gone', 'going'], correctAnswer: 1 },
                    { id: 'm1q4', type: 'fill-blank', text: 'While I was walking, I ____ (see) Dave.', correctAnswer: 'saw' },
                    { id: 'm1q5', type: 'matching', text: 'Match the time word to the tense.', matchingPairs: [{ left: 'Now', right: 'Present Continuous' }, { left: 'Yesterday', right: 'Past Simple' }, { left: 'Usually', right: 'Present Simple' }] }
                ]
            }
        },
        // ==================================================================================
        // MODULE 2: Present Perfect & Past
        // ==================================================================================
        {
            id: 'mod-2',
            title: 'Module 2: Present Perfect & Past',
            lessons: [
                {
                    id: 'l-2-1', title: 'Present Perfect 1 (I have done)', duration: '30 min', difficulty: 'Intermediate', completed: false,
                    description: 'Connecting past actions to the present result.',
                    blocks: [
                        { id: 'b1', type: 'text', content: '# Unit 7: Present Perfect\n\nTom is looking for his key. He can\'t find it. He **has lost** his key. This means he lost it a short time ago and he still doesn\'t have it.\n\nForm: Have/Has + Past Participle.' },
                        { id: 'b2', type: 'image', title: 'Result Now', content: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b3', type: 'youtube', title: 'Present Perfect Intro', content: 'https://www.youtube.com/embed/AEBRIBtq7q0' },
                        {
                            id: 'q1', type: 'quiz', title: 'Quick Check', content: [
                                { id: 'q1', type: 'fill-blank', text: 'I ____ (lose) my passport.', correctAnswer: 'have lost' },
                                { id: 'q2', type: 'multiple-choice', text: 'Where is Linda? "She ____ to bed."', options: ['has gone', 'is going', 'went'], correctAnswer: 0 },
                                { id: 'q3', type: 'multiple-choice', text: 'I ____ a new car.', options: ['buy', 'have bought'], correctAnswer: 1 }
                            ]
                        }
                    ],
                    resources: [{ title: 'Participle List', url: '#', description: 'PDF' }]
                },
                {
                    id: 'l-2-2', title: 'Present Perfect 2 (Just, Already, Yet)', duration: '20 min', difficulty: 'Intermediate', completed: false,
                    description: 'Using time markers with Present Perfect.',
                    blocks: [
                        { id: 'b1', type: 'text', content: '# Unit 8: Key Words\n\n*   **Just**: A short time ago. "I\'ve just seen him."\n*   **Already**: Sooner than expected. "I\'ve already done it."\n*   **Yet**: Until now. (Questions/Negatives). "Have you finished it yet?"' },
                        { id: 'b2', type: 'image', title: 'Time Markers', content: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b3', type: 'youtube', title: 'Just/Already/Yet Usage', content: 'https://www.youtube.com/embed/AEBRIBtq7q0' },
                        {
                            id: 'q1', type: 'quiz', title: 'Quick Check', content: [
                                { id: 'q1', type: 'multiple-choice', text: 'Don\'t forget to send the email. "I\'ve ____ sent it."', options: ['already', 'yet', 'still'], correctAnswer: 0 },
                                { id: 'q2', type: 'fill-blank', text: 'Has it stopped raining ____?', correctAnswer: 'yet' },
                                { id: 'q3', type: 'multiple-choice', text: 'I have ____ had lunch. (5 mins ago)', options: ['just', 'yet'], correctAnswer: 0 }
                            ]
                        }
                    ],
                    resources: [{ title: 'Practice Exercises', url: '#', description: 'Already/Yet practice' }]
                },
                {
                    id: 'l-2-3', title: 'Present Perfect Continuous', duration: '35 min', difficulty: 'Advanced', completed: false,
                    description: 'Focus on the activity, not just the result (I have been doing).',
                    blocks: [
                        { id: 'b1', type: 'text', content: '# Unit 9: Continuous Form\n\nIt has been raining. (The ground is wet). Use this for an activity that has recently stopped or is still happening.\n\n*   "You are out of breath. Have you been running?"' },
                        { id: 'b2', type: 'image', title: 'Activity Duration', content: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b3', type: 'youtube', title: 'Have been doing', content: 'https://www.youtube.com/embed/AEBRIBtq7q0' },
                        {
                            id: 'q1', type: 'quiz', title: 'Quick Check', content: [
                                { id: 'q1', type: 'multiple-choice', text: 'It ____ raining for two hours.', options: ['is', 'has been'], correctAnswer: 1 },
                                { id: 'q2', type: 'fill-blank', text: 'How long have you ____ (learn) English?', correctAnswer: 'been learning' },
                                { id: 'q3', type: 'multiple-choice', text: 'I am tired. I ____ hard.', options: ['have worked', 'have been working'], correctAnswer: 1 }
                            ]
                        }
                    ],
                    resources: [{ title: 'Duration vs Result', url: '#', description: 'Guide' }]
                },
                {
                    id: 'l-2-4', title: 'Present Perfect vs. Past Simple 1', duration: '30 min', difficulty: 'Intermediate', completed: false,
                    description: 'Distinguishing between finished time and unfinished time.',
                    blocks: [
                        { id: 'b1', type: 'text', content: '# Unit 13: Comparison\n\n*   **Present Perfect:** Time until now (Unfinished). "I have ever been to Spain." (in my life)\n*   **Past Simple:** Finished time. "I went to Spain last year." (2023 is finished)' },
                        { id: 'b2', type: 'image', title: 'Timeline Comparison', content: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b3', type: 'youtube', title: 'The Ultimate Guide', content: 'https://www.youtube.com/embed/L9AWrJnhsRI' },
                        {
                            id: 'q1', type: 'quiz', title: 'Quick Check', content: [
                                { id: 'q1', type: 'multiple-choice', text: 'I ____ my key yesterday.', options: ['lost', 'have lost'], correctAnswer: 0 },
                                { id: 'q2', type: 'fill-blank', text: '____ (you/see) Ann this morning? (It is now 11am - morning)', correctAnswer: 'Have you seen' },
                                { id: 'q3', type: 'fill-blank', text: '____ (you/see) Ann this morning? (It is now 2pm - morning over)', correctAnswer: 'Did you see' }
                            ]
                        }
                    ],
                    resources: [{ title: 'Time Chart', url: '#', description: 'Yesterday vs. Today' }]
                },
                {
                    id: 'l-2-5', title: 'Present Perfect vs. Past Simple 2', duration: '30 min', difficulty: 'Advanced', completed: false,
                    description: 'More practice on the most difficult distinction.',
                    blocks: [
                        { id: 'b1', type: 'text', content: '# Unit 14: More Practice\n\nDo not use the present perfect (have done) when you talk about a finished time (yesterday / 10 minutes ago / in 2005 / when I was a child).' },
                        { id: 'b2', type: 'image', title: 'Finished Time', content: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b3', type: 'youtube', title: 'Common Mistakes', content: 'https://www.youtube.com/embed/M4b22jUqG5A' },
                        {
                            id: 'q1', type: 'quiz', title: 'Quick Check', content: [
                                { id: 'q1', type: 'multiple-choice', text: 'When ____ your new car?', options: ['have you bought', 'did you buy'], correctAnswer: 1 },
                                { id: 'q2', type: 'fill-blank', text: 'The Chinese ____ (invent) printing.', correctAnswer: 'invented' },
                                { id: 'q3', type: 'multiple-choice', text: 'I ____ (not/eat) anything yesterday.', options: ['didn\'t eat', 'haven\'t eaten'], correctAnswer: 0 }
                            ]
                        }
                    ],
                    resources: [{ title: 'Advanced Exercises', url: '#', description: 'Test yourself' }]
                }
            ],
            quiz: {
                title: 'Module 2 Assessment',
                questions: [
                    { id: 'm2q1', type: 'multiple-choice', text: 'I ____ my homework. Can I go out?', options: ['did', 'have done', 'doing'], correctAnswer: 1 },
                    { id: 'm2q2', type: 'fill-blank', text: 'I ____ (live) here since 2010.', correctAnswer: 'have lived' },
                    { id: 'm2q3', type: 'multiple-choice', text: 'It started raining an hour ago and it is ____ raining.', options: ['still', 'yet', 'already'], correctAnswer: 0 },
                    { id: 'm2q4', type: 'fill-blank', text: 'I ____ (never/eat) caviar.', correctAnswer: 'have never eaten' },
                    { id: 'm2q5', type: 'matching', text: 'Match the sentences.', matchingPairs: [{ left: 'I have lost my key', right: 'I don\'t have it now' }, { left: 'I lost my key', right: 'I lost it in the past' }, { left: 'I am losing my key', right: 'Happening now' }] }
                ]
            }
        },
        // ==================================================================================
        // MODULE 3: Future Tenses
        // ==================================================================================
        {
            id: 'mod-3',
            title: 'Module 3: Future Tenses',
            lessons: [
                {
                    id: 'l-3-1', title: 'Present Tenses for Future', duration: '20 min', difficulty: 'Intermediate', completed: false,
                    description: 'Using "I am doing" and "I do" for the future.',
                    blocks: [
                        { id: 'b1', type: 'text', content: '# Unit 19: Arrangements\n\nWe use the present continuous when we have **arranged** to do something.\n*   "What are you doing on Saturday evening?" (Arrangement)\n\nWe use the present simple for **schedules**.\n*   "The train leaves at 07:30."' },
                        { id: 'b2', type: 'image', title: 'Calendar/Schedule', content: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b3', type: 'youtube', title: 'Future Arrangements', content: 'https://www.youtube.com/embed/M4b22jUqG5A' },
                        {
                            id: 'q1', type: 'quiz', title: 'Quick Check', content: [
                                { id: 'q1', type: 'multiple-choice', text: 'I ____ the dentist tomorrow at 10.', options: ['see', 'am seeing'], correctAnswer: 1 },
                                { id: 'q2', type: 'fill-blank', text: 'The concert ____ (start) at 8pm.', correctAnswer: 'starts' },
                                { id: 'q3', type: 'multiple-choice', text: 'What time ____?', options: ['does the bus leave', 'is the bus leaving'], correctAnswer: 0 }
                            ]
                        }
                    ],
                    resources: [{ title: 'Diary Plan Template', url: '#', description: 'Plan your week' }]
                },
                {
                    id: 'l-3-2', title: 'Will/Shall (Future Simple)', duration: '20 min', difficulty: 'Beginner', completed: false,
                    description: 'Decisions made at the moment of speaking.',
                    blocks: [
                        { id: 'b1', type: 'text', content: '# Unit 21: Will\n\nWe use "I will" when we decide to do something at the time of speaking (Instant decision).\n*   "Oh, I\'ve left the door open. I will go and shut it."\n\nWe also use it for predictions.' },
                        { id: 'b2', type: 'image', title: 'I will help you', content: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b3', type: 'youtube', title: 'Will for Offers and Promises', content: 'https://www.youtube.com/embed/0Wrv_ZviMEc' },
                        {
                            id: 'q1', type: 'quiz', title: 'Quick Check', content: [
                                { id: 'q1', type: 'multiple-choice', text: 'It\'s cold. "I ____ close the window."', options: ['will', 'am going to'], correctAnswer: 0 },
                                { id: 'q2', type: 'fill-blank', text: 'I promise I ____ (pay) you back.', correctAnswer: 'will pay' },
                                { id: 'q3', type: 'multiple-choice', text: '____ we go out tonight?', options: ['Will', 'Shall'], correctAnswer: 1 }
                            ]
                        }
                    ],
                    resources: [{ title: 'Offers and Promises', url: '#', description: 'Functional language' }]
                },
                {
                    id: 'l-3-3', title: 'Going to (I am going to do)', duration: '25 min', difficulty: 'Intermediate', completed: false,
                    description: 'Intentions and plans already made.',
                    blocks: [
                        { id: 'b1', type: 'text', content: '# Unit 20: Going to\n\nI am going to do something = I have decided to do it (Intention).\n*   "I am going to buy a new car."\n\nAlso for predictions based on evidence:\n*   "Look at those black clouds. It is going to rain."' },
                        { id: 'b2', type: 'image', title: 'Black Clouds', content: 'https://images.unsplash.com/photo-1532468307011-807d956a9437?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b3', type: 'youtube', title: 'Going to vs Will', content: 'https://www.youtube.com/embed/AEBRIBtq7q0' },
                        {
                            id: 'q1', type: 'quiz', title: 'Quick Check', content: [
                                { id: 'q1', type: 'fill-blank', text: 'I ____ (buy) some bread. Do we need anything else? (Plan)', correctAnswer: 'am going to buy' },
                                { id: 'q2', type: 'multiple-choice', text: 'Watch out! You ____ hit your head!', options: ['will', 'are going to'], correctAnswer: 1 },
                                { id: 'q3', type: 'fill-blank', text: 'My sister ____ (have) a baby.', correctAnswer: 'is going to have' }
                            ]
                        }
                    ],
                    resources: [{ title: 'Future Plans', url: '#', description: 'Worksheet' }]
                },
                {
                    id: 'l-3-4', title: 'Will vs. Going to', duration: '30 min', difficulty: 'Intermediate', completed: false,
                    description: 'Comparing prediction types and decision timing.',
                    blocks: [
                        { id: 'b1', type: 'text', content: '# Unit 23: Comparison\n\n*   **Will:** Neutral future / Prediction / Instant decision.\n*   **Going to:** Plan / Evidence based prediction.' },
                        { id: 'b2', type: 'image', title: 'Prediction', content: 'https://images.unsplash.com/photo-1519810755548-392116d9a061?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b3', type: 'youtube', title: 'Master the Future', content: 'https://www.youtube.com/embed/M4b22jUqG5A' },
                        {
                            id: 'q1', type: 'quiz', title: 'Quick Check', content: [
                                { id: 'q1', type: 'multiple-choice', text: 'Gary called while you were out. "OK, I ____ call him back."', options: ['will', 'am going to'], correctAnswer: 0 },
                                { id: 'q2', type: 'multiple-choice', text: 'Gary called. "I know. I ____ call him back."', options: ['will', 'am going to'], correctAnswer: 1 },
                                { id: 'q3', type: 'fill-blank', text: 'I think it ____ (rain) later.', correctAnswer: 'will rain' }
                            ]
                        }
                    ],
                    resources: [{ title: 'Contrast Chart', url: '#', description: 'Will vs Going To' }]
                },
                {
                    id: 'l-3-5', title: 'Future Continuous & Perfect', duration: '35 min', difficulty: 'Advanced', completed: false,
                    description: '"I will be doing" and "I will have done".',
                    blocks: [
                        { id: 'b1', type: 'text', content: '# Unit 24: Advanced Future\n\n*   **Future Continuous:** "Don\'t phone me between 7 and 8. I will be having dinner." (In the middle of doing it)\n*   **Future Perfect:** "By next year, I will have finished my degree." (Completed before a future time)' },
                        { id: 'b2', type: 'image', title: 'Graduation', content: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b3', type: 'youtube', title: 'Advanced Future Tenses', content: 'https://www.youtube.com/embed/AEBRIBtq7q0' },
                        {
                            id: 'q1', type: 'quiz', title: 'Quick Check', content: [
                                { id: 'q1', type: 'fill-blank', text: 'This time tomorrow, I ____ (lying) on the beach.', correctAnswer: 'will be lying' },
                                { id: 'q2', type: 'multiple-choice', text: 'We are late. The film ____ by the time we get there.', options: ['will start', 'will have started'], correctAnswer: 1 },
                                { id: 'q3', type: 'fill-blank', text: 'I ____ (finish) this book by tomorrow.', correctAnswer: 'will have finished' }
                            ]
                        }
                    ],
                    resources: [{ title: 'Timeline Exercise', url: '#', description: 'Visualize' }]
                }
            ],
            quiz: {
                title: 'Module 3 Assessment',
                questions: [
                    { id: 'm3q1', type: 'multiple-choice', text: 'The phone is ringing. "I ____ get it!"', options: ['am going to', 'will'], correctAnswer: 1 },
                    { id: 'm3q2', type: 'fill-blank', text: 'Look at the traffic. We ____ (be) late.', correctAnswer: 'are going to be' },
                    { id: 'm3q3', type: 'multiple-choice', text: 'I ____ Tom tonight. We are going to the cinema.', options: ['see', 'am seeing'], correctAnswer: 1 },
                    { id: 'm3q4', type: 'fill-blank', text: 'In 2030, people ____ (buy) different things.', correctAnswer: 'will buy' },
                    { id: 'm3q5', type: 'matching', text: 'Match usage.', matchingPairs: [{ left: 'Intention', right: 'Going to' }, { left: 'Offer', right: 'Will' }, { left: 'Arrangement', right: 'Present Continuous' }] }
                ]
            }
        },
        // ==================================================================================
        // MODULE 4: Modals
        // ==================================================================================
        {
            id: 'mod-4',
            title: 'Module 4: Modals & Auxiliaries',
            lessons: [
                {
                    id: 'l-4-1', title: 'Can, Could and (Be) Able To', duration: '25 min', difficulty: 'Intermediate', completed: false, description: 'Ability.', blocks: [
                        { id: 'b1', type: 'text', content: '# Unit 26: Can/Could\n\n"I can make these data."\n"I could run fast when I was a boy."' },
                        { id: 'b2', type: 'image', title: 'Running', content: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b3', type: 'youtube', title: 'Can Could Video', content: 'https://www.youtube.com/embed/L9AWrJnhsRI' },
                        { id: 'q1', type: 'quiz', title: 'Quick Check', content: [{ id: 'q1', type: 'fill-blank', text: 'I ____ (not/can) sleep last night.', correctAnswer: 'could not' }, { id: 'q2', type: 'multiple-choice', text: '____ you swim?', options: ['Can', 'May'], correctAnswer: 0 }, { id: 'q3', type: 'fill-blank', text: 'I will be ____ (able) do it.', correctAnswer: 'able to' }] }
                    ], resources: [{ title: 'List', url: '#', description: 'List' }]
                },
                {
                    id: 'l-4-2', title: 'Must and Can\'t (Deduction)', duration: '25 min', difficulty: 'Intermediate', completed: false, description: 'Deduction.', blocks: [
                        { id: 'b1', type: 'text', content: '# Unit 28: Deduction\n\nTo express certainty based on evidence.' },
                        { id: 'b2', type: 'image', title: 'Thinking', content: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b3', type: 'youtube', title: 'Deduction Video', content: 'https://www.youtube.com/embed/5D3o5q5V_3g' },
                        { id: 'q1', type: 'quiz', title: 'Quick Check', content: [{ id: 'q1', type: 'multiple-choice', text: 'You passed? You ____ be happy.', options: ['must', 'can\'t'], correctAnswer: 0 }, { id: 'q2', type: 'fill-blank', text: 'It ____ (can\'t) be true!', correctAnswer: 'can\'t' }, { id: 'q3', type: 'multiple-choice', text: 'She is eating. She ____ be hungry.', options: ['must', 'must not'], correctAnswer: 0 }] }
                    ], resources: [{ title: 'List', url: '#', description: 'List' }]
                },
                {
                    id: 'l-4-3', title: 'May and Might (Possibility)', duration: '20 min', difficulty: 'Beginner', completed: false, description: 'Possibility.', blocks: [
                        { id: 'b1', type: 'text', content: '# Unit 29: May/Might\n\nPossible/Not certain.' },
                        { id: 'b2', type: 'image', title: 'Clouds', content: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b3', type: 'youtube', title: 'May Might Video', content: 'https://www.youtube.com/embed/AEBRIBtq7q0' },
                        { id: 'q1', type: 'quiz', title: 'Quick Check', content: [{ id: 'q1', type: 'multiple-choice', text: 'It ____ rain.', options: ['might', 'must'], correctAnswer: 0 }, { id: 'q2', type: 'fill-blank', text: 'I ____ (may) go to the party.', correctAnswer: 'may' }, { id: 'q3', type: 'multiple-choice', text: 'He might ____ at home.', options: ['be', 'is'], correctAnswer: 0 }] }
                    ], resources: [{ title: 'List', url: '#', description: 'List' }]
                },
                {
                    id: 'l-4-4', title: 'Must vs. Have to', duration: '30 min', difficulty: 'Intermediate', completed: false, description: 'Obligation.', blocks: [
                        { id: 'b1', type: 'text', content: '# Must vs Have to\n\nMust is internal.' },
                        { id: 'b2', type: 'image', title: 'Rules', content: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b3', type: 'youtube', title: 'Obligation Video', content: 'https://www.youtube.com/embed/L9AWrJnhsRI' },
                        { id: 'q1', type: 'quiz', title: 'Quick Check', content: [{ id: 'q1', type: 'multiple-choice', text: 'I ____ wear a uniform.', options: ['have to', 'must'], correctAnswer: 0 }, { id: 'q2', type: 'fill-blank', text: 'You ____ (must/not) smoke here.', correctAnswer: 'must not' }, { id: 'q3', type: 'multiple-choice', text: 'I ____ get up early yesterday.', options: ['had to', 'must'], correctAnswer: 0 }] }
                    ], resources: [{ title: 'List', url: '#', description: 'List' }]
                },
                {
                    id: 'l-4-5', title: 'Should (Advice)', duration: '20 min', difficulty: 'Beginner', completed: false, description: 'Advice.', blocks: [
                        { id: 'b1', type: 'text', content: '# Should\n\nGood thing to do.' },
                        { id: 'b2', type: 'image', title: 'Advice', content: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b3', type: 'youtube', title: 'Should Video', content: 'https://www.youtube.com/embed/0Wrv_ZviMEc' },
                        { id: 'q1', type: 'quiz', title: 'Quick Check', content: [{ id: 'q1', type: 'fill-blank', text: 'You ____ (should) stop smoking.', correctAnswer: 'should' }, { id: 'q2', type: 'multiple-choice', text: '____ I buy this?', options: ['Should', 'Must'], correctAnswer: 0 }, { id: 'q3', type: 'multiple-choice', text: 'You shouldn\'t ____ so hard.', options: ['work', 'working'], correctAnswer: 0 }] }
                    ], resources: [{ title: 'List', url: '#', description: 'List' }]
                }
            ],
            quiz: {
                title: 'Module 4 Assessment',
                questions: [
                    { id: 'm4q1', type: 'multiple-choice', text: 'The lights are out. They ____ be home.', options: ['must not', 'can\'t'], correctAnswer: 1 },
                    { id: 'm4q2', type: 'fill-blank', text: 'I ____ (have to) go to the doctor yesterday.', correctAnswer: 'had to' },
                    { id: 'm4q3', type: 'multiple-choice', text: 'You ____ eat that. It is bad for you.', options: ['should', 'should not'], correctAnswer: 1 },
                    { id: 'm4q4', type: 'fill-blank', text: '____ (Can) you open the door, please?', correctAnswer: 'Can' },
                    { id: 'm4q5', type: 'matching', text: 'Match.', matchingPairs: [{ left: 'Must', right: 'Obligation' }, { left: 'Might', right: 'Possibility' }, { left: 'Should', right: 'Advice' }] }
                ]
            }
        },
        // ==================================================================================
        // MODULE 5: Passive & Reported
        // ==================================================================================
        {
            id: 'mod-5',
            title: 'Module 5: Passive Voice & Reported',
            lessons: [
                {
                    id: 'l-5-1', title: 'Passive Voice 1', duration: '30 min', difficulty: 'Intermediate', completed: false, description: 'Basics.', blocks: [
                        { id: 'b1', type: 'text', content: '# Passive Voice\n\nObject + be + Past Participle.' },
                        { id: 'b2', type: 'image', title: 'Built', content: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b3', type: 'youtube', title: 'Passive Video', content: 'https://www.youtube.com/embed/nkO9g0qS2CA' },
                        { id: 'q1', type: 'quiz', title: 'Quick Check', content: [{ id: 'q1', type: 'multiple-choice', text: 'The room ____ every day.', options: ['is cleaned', 'cleans'], correctAnswer: 0 }, { id: 'q2', type: 'fill-blank', text: 'Glass ____ (make) from sand.', correctAnswer: 'is made' }, { id: 'q3', type: 'multiple-choice', text: 'The house ____ yesterday.', options: ['painted', 'was painted'], correctAnswer: 1 }] }
                    ], resources: [{ title: 'List', url: '#', description: 'List' }]
                },
                {
                    id: 'l-5-2', title: 'Passive Voice 2', duration: '30 min', difficulty: 'Advanced', completed: false, description: 'Advanced.', blocks: [
                        { id: 'b1', type: 'text', content: '# Passive 2\n\nBeing done / has been done.' },
                        { id: 'b2', type: 'image', title: 'Being Cleaned', content: 'https://images.unsplash.com/photo-1581578731117-10d78b211289?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b3', type: 'youtube', title: 'Passive 2 Video', content: 'https://www.youtube.com/embed/1v6m4j6j8oA' },
                        { id: 'q1', type: 'quiz', title: 'Quick Check', content: [{ id: 'q1', type: 'fill-blank', text: 'The car is ____ (repair) at the moment.', correctAnswer: 'being repaired' }, { id: 'q2', type: 'multiple-choice', text: 'The room looks nice. It ____ cleaned.', options: ['has been', 'was'], correctAnswer: 0 }, { id: 'q3', type: 'multiple-choice', text: 'My key ____ stolen.', options: ['has been', 'is being'], correctAnswer: 0 }] }
                    ], resources: [{ title: 'List', url: '#', description: 'List' }]
                },
                {
                    id: 'l-5-3', title: 'Reported Speech 1', duration: '35 min', difficulty: 'Intermediate', completed: false, description: 'Reporting Statements.', blocks: [
                        { id: 'b1', type: 'text', content: '# Reported Speech\n\nBackshift tenses.' },
                        { id: 'b2', type: 'image', title: 'Gossip', content: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b3', type: 'youtube', title: 'Reported Video', content: 'https://www.youtube.com/embed/M4b22jUqG5A' },
                        { id: 'q1', type: 'quiz', title: 'Quick Check', content: [{ id: 'q1', type: 'fill-blank', text: '"I am tired." -> He said he ____ (be) tired.', correctAnswer: 'was' }, { id: 'q2', type: 'multiple-choice', text: '"I will be there." -> He said he ____ be there.', options: ['will', 'would'], correctAnswer: 1 }, { id: 'q3', type: 'fill-blank', text: '"I can swim." -> He said he ____ (can) swim.', correctAnswer: 'could' }] }
                    ], resources: [{ title: 'List', url: '#', description: 'List' }]
                },
                {
                    id: 'l-5-4', title: 'Reported Speech 2', duration: '30 min', difficulty: 'Advanced', completed: false, description: 'Reporting Questions.', blocks: [
                        { id: 'b1', type: 'text', content: '# Reported Questions\n\nWord order.' },
                        { id: 'b2', type: 'image', title: 'Questions', content: 'https://images.unsplash.com/photo-1633511090164-b43840ea901d?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b3', type: 'youtube', title: 'Question Video', content: 'https://www.youtube.com/embed/AEBRIBtq7q0' },
                        { id: 'q1', type: 'quiz', title: 'Quick Check', content: [{ id: 'q1', type: 'multiple-choice', text: '"Where do you live?" -> He asked me where ____.', options: ['did I live', 'I lived'], correctAnswer: 1 }, { id: 'q2', type: 'fill-blank', text: '"Are you married?" -> He asked if I ____ (be) married.', correctAnswer: 'was' }, { id: 'q3', type: 'multiple-choice', text: '"What is your name?" -> He asked what ____.', options: ['my name was', 'was my name'], correctAnswer: 0 }] }
                    ], resources: [{ title: 'List', url: '#', description: 'List' }]
                },
                {
                    id: 'l-5-5', title: 'Conditionals', duration: '30 min', difficulty: 'Advanced', completed: false, description: 'If clauses.', blocks: [
                        { id: 'b1', type: 'text', content: '# Conditionals\n\nZero, First, Second.' },
                        { id: 'b2', type: 'image', title: 'If', content: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3a8?auto=format&fit=crop&w=800&q=80' },
                        { id: 'b3', type: 'youtube', title: 'Conditionals Video', content: 'https://www.youtube.com/embed/0Wrv_ZviMEc' },
                        { id: 'q1', type: 'quiz', title: 'Quick Check', content: [{ id: 'q1', type: 'multiple-choice', text: 'If it rains, we ____ get wet.', options: ['will', 'would'], correctAnswer: 0 }, { id: 'q2', type: 'fill-blank', text: 'If I ____ (know), I would tell you.', correctAnswer: 'knew' }, { id: 'q3', type: 'multiple-choice', text: 'If water is heated to 100 degrees, it ____.', options: ['boils', 'boiled'], correctAnswer: 0 }] }
                    ], resources: [{ title: 'List', url: '#', description: 'List' }]
                }
            ],
            quiz: {
                title: 'Module 5 Assessment',
                questions: [
                    { id: 'm5q1', type: 'multiple-choice', text: 'Active: They built the bridge. Passive: The bridge ____.', options: ['was built', 'is built'], correctAnswer: 0 },
                    { id: 'm5q2', type: 'fill-blank', text: 'He asked correct me if I ____ (like) coffee.', correctAnswer: 'liked' },
                    { id: 'm5q3', type: 'matching', text: 'Match.', matchingPairs: [{ left: 'Present', right: 'Past' }, { left: 'Will', right: 'Would' }, { left: 'Can', right: 'Could' }] },
                    { id: 'm5q4', type: 'multiple-choice', text: 'This house ____ 100 years ago.', options: ['was built', 'has been built'], correctAnswer: 0 },
                    { id: 'm5q5', type: 'fill-blank', text: 'If I had money, I ____ (travel) around the world.', correctAnswer: 'would travel' }
                ]
            }
        }
    ],
    finalExam: {
        questions: [
            // PAGE 1
            { id: 'f1', type: 'multiple-choice', text: 'I ____ (see) that film last week.', options: ['see', 'saw', 'have seen'], correctAnswer: 1 },
            { id: 'f2', type: 'fill-blank', text: 'Where ____ (be) you born?', correctAnswer: 'were' },
            { id: 'f3', type: 'multiple-choice', text: 'Look at the sky! It ____ rain.', options: ['will', 'is going to'], correctAnswer: 1 },
            { id: 'f4', type: 'matching', text: 'Match.', matchingPairs: [{ left: 'I am doing', right: 'Now' }, { left: 'I do', right: 'General' }, { left: 'I did', right: 'Past' }] },
            { id: 'f5', type: 'fill-blank', text: 'I have ____ (know) her since 2010.', correctAnswer: 'known' },
            // PAGE 2
            { id: 'f6', type: 'multiple-choice', text: 'You ____ smoke in hospitals.', options: ['don\'t have to', 'must not'], correctAnswer: 1 },
            { id: 'f7', type: 'writing', text: 'Change to Passive: "Somebody cleaned the room."' },
            { id: 'f8', type: 'fill-blank', text: 'If I ____ (be) you, I would study harder.', correctAnswer: 'were' },
            { id: 'f9', type: 'multiple-choice', text: 'He asked me where ____.', options: ['I lived', 'did I live'], correctAnswer: 0 },
            { id: 'f10', type: 'video', text: 'Record a video introducing yourself.' },
            // PAGE 3
            { id: 'f11', type: 'audio', text: 'Read: "She sells sea shells on the sea shore."' },
            { id: 'f12', type: 'matching', text: 'Match the conditionals.', matchingPairs: [{ left: 'Zero', right: 'Facts' }, { left: 'First', right: 'Real Future' }, { left: 'Second', right: 'Unreal Future' }] },
            { id: 'f13', type: 'multiple-choice', text: 'I enjoy ____.', options: ['to dance', 'dancing'], correctAnswer: 1 },
            { id: 'f14', type: 'fill-blank', text: 'She is good ____ (at/in) playing piano.', correctAnswer: 'at' },
            { id: 'f15', type: 'writing', text: 'Write about your last holiday.' }
        ]
    }
};
