import React, { createContext, useContext, useState } from 'react';
import type { CourseData } from "@/data/mockCourse";
import { courseService } from "@/services/api";

interface CourseContextType {
    course: CourseData | null;
    isLoading: boolean;
    error: string | null;
    progress: number;
    // Actions
    fetchCourse: (id: string) => Promise<void>;
    completeLesson: (lessonId: string) => Promise<void>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: React.ReactNode }) {
    const [course, setCourse] = useState<CourseData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState<number>(0);

    const fetchCourse = async (id: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await courseService.getCourseById(id);
            setCourse(data);
            setProgress(data.progress); // Initialize with saved progress
        } catch (err) {
            console.error(err);
            setError("Failed to load course content.");
        } finally {
            setIsLoading(false);
        }
    };

    const completeLesson = async (lessonId: string) => {
        if (!course) return;

        // Optimistic Update
        const updatedModules = course.modules.map(m => ({
            ...m,
            lessons: m.lessons.map(l =>
                l.id === lessonId ? { ...l, completed: true } : l
            )
        }));

        const newCourseData = { ...course, modules: updatedModules };
        setCourse(newCourseData);

        // Calculate new progress (Mock logic: simple count)
        const totalLessons = updatedModules.flatMap(m => m.lessons).length;
        const completedLessons = updatedModules.flatMap(m => m.lessons).filter(l => l.completed).length;
        const newProgress = Math.round((completedLessons / totalLessons) * 100);

        setProgress(newProgress);

        try {
            // API Call
            await courseService.markLessonComplete(course.id || 'demo', lessonId);
        } catch (err) {
            // Revert on failure (simplified)
            console.error("Failed to save progress", err);
        }
    };

    return (
        <CourseContext.Provider value={{
            course,
            isLoading,
            error,
            progress,
            fetchCourse,
            completeLesson
        }}>
            {children}
        </CourseContext.Provider>
    );
}

export function useCourse() {
    const context = useContext(CourseContext);
    if (context === undefined) {
        throw new Error("useCourse must be used within a CourseProvider");
    }
    return context;
}
