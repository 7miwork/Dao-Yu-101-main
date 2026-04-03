import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Users, Star, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

const courses = [
  {
    id: 1,
    title: "Mathematics Kingdom",
    description: "Master algebra, geometry, and calculus with interactive lessons",
    students: 1250,
    rating: 4.8,
    price: 29.99,
    image: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "English Literature",
    description: "Explore poetry, novels, and literary analysis",
    students: 980,
    rating: 4.7,
    price: 24.99,
    image: "bg-gradient-to-br from-purple-500 to-purple-600",
  },
  {
    id: 3,
    title: "Science Fundamentals",
    description: "Learn physics, chemistry, and biology basics",
    students: 750,
    rating: 4.9,
    price: 34.99,
    image: "bg-gradient-to-br from-green-500 to-green-600",
  },
  {
    id: 4,
    title: "History & Culture",
    description: "Discover world history and cultural heritage",
    students: 620,
    rating: 4.6,
    price: 19.99,
    image: "bg-gradient-to-br from-amber-500 to-amber-600",
  },
  {
    id: 5,
    title: "Art & Design",
    description: "Develop creative skills in visual arts",
    students: 540,
    rating: 4.8,
    price: 27.99,
    image: "bg-gradient-to-br from-pink-500 to-pink-600",
  },
  {
    id: 6,
    title: "Technology & Programming",
    description: "Learn coding, web development, and software engineering",
    students: 1890,
    rating: 4.9,
    price: 39.99,
    image: "bg-gradient-to-br from-indigo-500 to-indigo-600",
  },
];

export default function Courses() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-500/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Dao-Yu Courses</span>
          </div>
          <Button
            onClick={() => setLocation("/dashboard")}
            variant="outline"
            className="border-purple-500/30 text-purple-200 hover:bg-purple-500/10"
          >
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Explore Our Courses</h1>
          <p className="text-purple-300">Choose from hundreds of courses and start learning today</p>
        </div>

        {/* Filter & Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search courses..."
            className="flex-1 px-4 py-2 bg-slate-700/50 border border-purple-500/30 text-white placeholder-purple-400/50 rounded-lg focus:outline-none focus:border-purple-500"
          />
          <select className="px-4 py-2 bg-slate-700/50 border border-purple-500/30 text-white rounded-lg focus:outline-none focus:border-purple-500">
            <option>All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <select className="px-4 py-2 bg-slate-700/50 border border-purple-500/30 text-white rounded-lg focus:outline-none focus:border-purple-500">
            <option>Sort by: Popular</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 overflow-hidden hover:border-purple-500/50 transition group">
              {/* Course Image */}
              <div className={`${course.image} h-40 flex items-center justify-center group-hover:scale-105 transition`}>
                <BookOpen className="w-16 h-16 text-white/50" />
              </div>

              {/* Course Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
                <p className="text-purple-300 text-sm mb-4">{course.description}</p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center gap-1 text-purple-300">
                    <Users className="w-4 h-4" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">${course.price}</span>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 gap-2">
                    Enroll
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
