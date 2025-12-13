import { MOCK_COURSE } from "@/data/mockCourse";
import type { Course } from "@/data/mockCourse";

/**
 * Service to simulate API calls.
 * In a real app, these would be fetch/axios calls to a backend.
 */

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const courseService = {
    /**
     * Fetch the full course data by ID.
     */
    getCourseById: async (id: string): Promise<Course> => {
        await delay(800); // Simulate authentic loading wait

        // In a real app, we would look up by ID. 
        // For now, we always return the English course if requested.
        if (id === 'english-101' || id === 'demo') {
            return { ...MOCK_COURSE };
        }

        throw new Error("Course not found");
    },

    /**
     * Simulate saving progress (e.g., completing a lesson).
     */
    markLessonComplete: async (courseId: string, lessonId: string): Promise<void> => {
        await delay(400);
        console.log(`[API] Marked lesson ${lessonId} complete for course ${courseId}`);
        // In a real app, this would update the DB.
        // Here we just resolve successful.
    },

    /**
     * Simulate submitting a quiz score.
     */
    submitQuizScore: async (courseId: string, quizId: string, score: number): Promise<void> => {
        await delay(600);
        console.log(`[API] Submitted score ${score} for quiz ${quizId} in course ${courseId}`);
    }
};
