import { Button } from "@/components/ui/button";
import { BookOpen, Zap, Users, Trophy, ArrowRight, Globe, Sparkles, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { useI18n } from "@/contexts/I18nContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Home() {
  const [email, setEmail] = useState("");
  const [, setLocation] = useLocation();
  const { t } = useI18n();

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      titleKey: "home.gamifiedLearning",
      descriptionKey: "home.gamifiedDescription",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: <Users className="w-6 h-6" />,
      titleKey: "home.multiRoleSystem",
      descriptionKey: "home.multiRoleDescription",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      titleKey: "home.achievementSystem",
      descriptionKey: "home.achievementDescription",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      titleKey: "home.globalLearning",
      descriptionKey: "home.globalDescription",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const stats = [
    { value: "50K+", label: "home.activeStudents" },
    { value: "1000+", label: "home.courses" },
    { value: "98%", label: "home.satisfaction" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">{t("common.appName")}</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium">{t("navigation.features")}</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium">{t("navigation.pricing")}</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium">{t("navigation.about")}</a>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button onClick={() => setLocation("/login")} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transition-all">{t("navigation.signIn")}</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fadeInUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Next-Generation EdTech Platform</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              {t("home.heroTitle")}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
              {t("home.heroDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button onClick={() => setLocation("/register")} className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                {t("home.getStarted")} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button onClick={() => setLocation("/courses")} variant="outline" className="border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-6 text-lg">
                {t("home.watchDemo")}
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stat.value}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{t(stat.label)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative animate-slideInRight">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-8 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                    🏝️
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white font-semibold">Welcome to Archipelago</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Your learning journey starts here</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Mathematics Kingdom</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">English Literature</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">2,450</p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">XP Earned</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">5</p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Level</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">12</p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Streak</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{t("home.powerfulFeatures")}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">{t("home.featureDescription")}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group card-modern p-8 hover:scale-105 transition-transform duration-300">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{t(feature.titleKey)}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{t(feature.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 rounded-3xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Why Choose Dao-Yu?</h2>
            <div className="space-y-4">
              {[
                "Personalized learning paths for every student",
                "Real-time progress tracking and analytics",
                "Engaging gamification system",
                "Multi-language support",
                "Teacher and parent dashboards",
                "Secure and scalable platform"
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Track your progress with detailed analytics and insights</p>
                <div className="space-y-3">
                  <div className="text-left">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Learning Consistency</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Course Completion</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">{t("home.readyToTransform")}</h2>
          <p className="text-lg text-indigo-100 mb-8">{t("home.joinThousands")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input
              type="email"
              placeholder={t("home.enterEmail")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-6 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full sm:w-auto font-medium"
            />
            <Button onClick={() => setLocation("/register")} className="bg-white text-indigo-600 hover:bg-gray-100 border-0 px-8 py-3 font-semibold w-full sm:w-auto shadow-lg hover:shadow-xl transition-all">
              {t("home.startLearning")}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-4">{t("footer.product")}</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">{t("footer.features")}</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">{t("footer.pricing")}</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">{t("footer.security")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-4">{t("footer.company")}</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">{t("footer.about")}</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">{t("footer.blog")}</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">{t("footer.careers")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-4">{t("footer.resources")}</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">{t("footer.documentation")}</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">{t("footer.support")}</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">{t("footer.community")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-4">{t("footer.legal")}</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">{t("footer.privacy")}</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">{t("footer.terms")}</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">{t("footer.contact")}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">© 2026 Dao-Yu. {t("footer.allRightsReserved")}</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium">Twitter</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium">LinkedIn</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
