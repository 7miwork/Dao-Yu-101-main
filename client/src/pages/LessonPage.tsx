import { useState } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, Play, CheckCircle, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Lesson {
  id: number;
  title: string;
  emoji: string;
  description: string;
  duration: number;
  videoUrl: string;
  content: string;
  xpReward: number;
  questions: Question[];
}

const lessonData: Record<number, Lesson> = {
  101: {
    id: 101,
    title: "Algebra Basics",
    emoji: "📐",
    description: "Learn the fundamentals of algebra including variables, equations, and solving techniques.",
    duration: 15,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    content: `
# Algebra Basics

Algebra is a branch of mathematics dealing with symbols and the rules for manipulating those symbols.

## Key Concepts:
- **Variables**: Letters that represent unknown numbers
- **Equations**: Mathematical statements showing equality
- **Operations**: Addition, subtraction, multiplication, division

## Example:
If x + 5 = 12, then x = 7

## Practice:
Solve these equations:
1. x + 3 = 10
2. 2x = 16
3. x - 5 = 3
    `,
    xpReward: 50,
    questions: [
      {
        id: 1,
        text: "What is the value of x in the equation: x + 5 = 12?",
        options: ["5", "7", "12", "17"],
        correctAnswer: 1,
        explanation: "Subtract 5 from both sides: x = 12 - 5 = 7",
      },
      {
        id: 2,
        text: "Solve: 2x = 16",
        options: ["8", "14", "18", "32"],
        correctAnswer: 0,
        explanation: "Divide both sides by 2: x = 16 / 2 = 8",
      },
      {
        id: 3,
        text: "What is x - 5 = 3?",
        options: ["2", "8", "-2", "-8"],
        correctAnswer: 1,
        explanation: "Add 5 to both sides: x = 3 + 5 = 8",
      },
    ],
  },
};

export default function LessonPage() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState<"intro" | "video" | "content" | "quiz" | "complete">("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const { t } = useI18n();

  // Get lesson ID from URL
  const lessonId = 101; // In real app, get from URL params
  const lesson = lessonData[lessonId];

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Lesson not found</h1>
          <Button onClick={() => setLocation("/archipelago")}>Back to Archipelago</Button>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < lesson.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      lesson.questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctAnswer) {
          correctCount++;
        }
      });
      setScore(correctCount);
      setCurrentStep("complete");
    }
  };

  const handleBack = () => {
    setLocation("/archipelago");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {lesson.emoji} {lesson.title}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
            <Zap className="w-5 h-5" />
            +{lesson.xpReward} XP
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {currentStep === "intro" && (
          <div className="card-modern p-8 space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">{lesson.emoji}</div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{lesson.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">{lesson.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm">Duration</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{lesson.duration} min</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm">Questions</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{lesson.questions.length}</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => setCurrentStep("video")}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-6 text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Lesson
              </Button>
              <Button
                onClick={() => setCurrentStep("quiz")}
                variant="outline"
                className="w-full py-6 text-lg"
              >
                Skip to Quiz
              </Button>
            </div>
          </div>
        )}

        {currentStep === "video" && (
          <div className="space-y-6">
            <div className="card-modern p-6 overflow-hidden rounded-2xl">
              <div className="aspect-video bg-black rounded-xl overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={lesson.videoUrl}
                  title={lesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div className="card-modern p-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Lesson Content</h3>
              <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                {lesson.content}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setCurrentStep("intro")}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={() => setCurrentStep("quiz")}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
              >
                Take Quiz
              </Button>
            </div>
          </div>
        )}

        {currentStep === "quiz" && (
          <div className="card-modern p-8 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Question {currentQuestion + 1} of {lesson.questions.length}
                </h3>
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all"
                    style={{ width: `${((currentQuestion + 1) / lesson.questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {lesson.questions[currentQuestion].text}
              </h2>
            </div>

            <div className="space-y-3">
              {lesson.questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(idx)}
                  className={`w-full p-4 rounded-lg border-2 transition text-left font-medium ${
                    selectedAnswers[currentQuestion] === idx
                      ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                      : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswers[currentQuestion] === idx
                          ? "border-indigo-600 bg-indigo-600"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {selectedAnswers[currentQuestion] === idx && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white disabled:opacity-50"
            >
              {currentQuestion === lesson.questions.length - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
          </div>
        )}

        {currentStep === "complete" && (
          <div className="card-modern p-8 space-y-6 text-center">
            <div className="text-6xl mb-4">
              {score === lesson.questions.length ? "🎉" : score >= lesson.questions.length * 0.7 ? "🎊" : "✨"}
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Quiz Complete!</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                You scored {score} out of {lesson.questions.length}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Score</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {Math.round((score / lesson.questions.length) * 100)}%
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">XP Earned</p>
                <p className="text-2xl font-bold text-amber-500">+{lesson.xpReward}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Status</p>
                <p className="text-2xl font-bold text-green-500">
                  {score === lesson.questions.length ? "Perfect!" : "Passed!"}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => setLocation("/archipelago")}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-6 text-lg"
              >
                <Award className="w-5 h-5 mr-2" />
                Back to Archipelago
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
