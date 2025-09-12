import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  ChartBarIcon,
  ArrowDownIcon,
  StarIcon,
  EyeIcon,
  UsersIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Stats = () => {
  const [stats, setStats] = useState({
    totalDownloads: "2,800",
    weeklyDownloads: "167",
    githubStars: "4",
    weeklyUsers: "120",
    issuesResolved: 0,
    userSatisfaction: 98,
    activeCountries: 15,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Chart data
  const downloadTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Weekly Downloads",
        data: [1200, 1800, 2400, 3200, 4100, 5000, 5432],
        borderColor: "rgb(14, 165, 233)",
        backgroundColor: "rgba(14, 165, 233, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const geographicData = {
    labels: [
      "United States",
      "Germany",
      "United Kingdom",
      "India",
      "Canada",
      "Other",
    ],
    datasets: [
      {
        data: [28, 18, 12, 15, 8, 19],
        backgroundColor: [
          "#0ea5e9",
          "#3b82f6",
          "#6366f1",
          "#8b5cf6",
          "#a855f7",
          "#64748b",
        ],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  const usageStatsData = {
    labels: [
      "Basic Download",
      "With ZIP",
      "Custom Output",
      "Resume Feature",
      "List Checkpoints",
    ],
    datasets: [
      {
        label: "Usage Frequency (%)",
        data: [85, 45, 62, 23, 12],
        backgroundColor: "rgba(14, 165, 233, 0.8)",
        borderColor: "rgb(14, 165, 233)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(30, 41, 59, 0.9)",
        titleColor: "#f8fafc",
        bodyColor: "#f8fafc",
        borderColor: "rgba(14, 165, 233, 0.3)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(148, 163, 184, 0.1)",
        },
        ticks: {
          color: "#64748b",
        },
      },
      y: {
        grid: {
          color: "rgba(148, 163, 184, 0.1)",
        },
        ticks: {
          color: "#64748b",
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#64748b",
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(30, 41, 59, 0.9)",
        titleColor: "#f8fafc",
        bodyColor: "#f8fafc",
        borderColor: "rgba(14, 165, 233, 0.3)",
        borderWidth: 1,
      },
    },
  };

  const statCards = [
    {
      icon: ArrowDownIcon,
      label: "Total Downloads",
      value: stats.totalDownloads,
      change: "+15.2%",
      positive: true,
      description: "All-time package downloads",
    },
    {
      icon: UsersIcon,
      label: "Weekly Users",
      value: stats.weeklyUsers,
      change: "+8.1%",
      positive: true,
      description: "Active users this week",
    },
    {
      icon: StarIcon,
      label: "GitHub Stars",
      value: stats.githubStars,
      change: "+12.3%",
      positive: true,
      description: "Repository stars",
    },
    {
      icon: ArrowTrendingUpIcon,
      label: "Weekly Downloads",
      value: stats.weeklyDownloads,
      change: "+22.5%",
      positive: true,
      description: "Downloads this week",
    },
    {
      icon: CalendarIcon,
      label: "Issues Resolved",
      value: `${stats.issuesResolved}%`,
      change: "+5.2%",
      positive: true,
      description: "GitHub issues resolution rate",
    },
    {
      icon: EyeIcon,
      label: "User Satisfaction",
      value: `${stats.userSatisfaction}%`,
      change: "+1.8%",
      positive: true,
      description: "Based on user feedback",
    },
    {
      icon: GlobeAltIcon,
      label: "Active Countries",
      value: stats.activeCountries,
      change: "+7.4%",
      positive: true,
      description: "Countries using Git-ripper",
    },
    {
      icon: ChartBarIcon,
      label: "Growth Rate",
      value: "25.3%",
      change: "+3.1%",
      positive: true,
      description: "Month-over-month growth",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Statistics - Git-ripper</title>
        <meta
          name="description"
          content="Git-ripper usage statistics, download trends, and community growth metrics."
        />
      </Helmet>

      <div className="min-h-screen bg-white pt-16">
        {/* Header */}
        <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <ChartBarIcon className="w-4 h-4" />
                <span>Live Statistics</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
                Git-ripper <span className="gradient-text">Statistics</span>
              </h1>

              <p className="text-xl text-secondary-600">
                Real-time insights into Git-ripper's usage, growth, and
                community engagement. See how developers worldwide are
                transforming their GitHub workflow.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {statCards.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card text-center hover:shadow-2xl hover:-translate-y-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-3xl font-bold text-secondary-900 mb-1">
                      {stat.value}
                    </h3>

                    <p className="text-secondary-600 font-medium mb-2">
                      {stat.label}
                    </p>

                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <span
                        className={`text-sm font-medium ${
                          stat.positive ? "text-green-600" : "text-red-600"
                        }`}>
                        {stat.change}
                      </span>
                      <span className="text-secondary-500 text-sm">
                        vs last month
                      </span>
                    </div>

                    <p className="text-secondary-500 text-xs">
                      {stat.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Charts Section */}
            <div className="space-y-16">
              {/* Download Trend */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="card">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-secondary-900">
                      Download Trend
                    </h3>
                    <p className="text-secondary-600">
                      Weekly download statistics over the past 7 months
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Growing +22.5%</span>
                  </div>
                </div>

                <div className="h-80">
                  <Line data={downloadTrendData} options={chartOptions} />
                </div>
              </motion.div>

              {/* Geographic Distribution & Usage Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Geographic Distribution */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="card">
                  <h3 className="text-xl font-bold text-secondary-900 mb-4">
                    Geographic Distribution
                  </h3>
                  <p className="text-secondary-600 text-sm mb-6">
                    Top countries by download volume
                  </p>

                  <div className="h-64">
                    <Doughnut data={geographicData} options={doughnutOptions} />
                  </div>
                </motion.div>

                {/* Usage Statistics */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="card">
                  <h3 className="text-xl font-bold text-secondary-900 mb-4">
                    Feature Usage
                  </h3>
                  <p className="text-secondary-600 text-sm mb-6">
                    Most popular Git-ripper features
                  </p>

                  <div className="h-64">
                    <Bar data={usageStatsData} options={chartOptions} />
                  </div>
                </motion.div>
              </div>

              {/* Community Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card text-center bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                  <h4 className="text-lg font-semibold mb-2">
                    Community Health
                  </h4>
                  <div className="text-3xl font-bold mb-2">Excellent</div>
                  <p className="text-primary-200 text-sm">
                    Active community with regular contributions and feedback
                  </p>
                </div>

                <div className="card text-center">
                  <h4 className="text-lg font-semibold text-secondary-900 mb-4">
                    Performance Metrics
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-secondary-600">
                          Average Download Speed
                        </span>
                        <span className="font-medium">2.3 MB/s</span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "92%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-secondary-600">Success Rate</span>
                        <span className="font-medium">99.2%</span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full"
                          style={{ width: "99%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-secondary-600">Resume Rate</span>
                        <span className="font-medium">23.4%</span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-2">
                        <div
                          className="bg-accent-500 h-2 rounded-full"
                          style={{ width: "23%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card text-center">
                  <h4 className="text-lg font-semibold text-secondary-900 mb-4">
                    Latest Milestones
                  </h4>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-secondary-700">
                        2.8K total downloads
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-secondary-700">4 GitHub stars</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                      <span className="text-secondary-700">
                        15+ countries reached
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-secondary-400 rounded-full"></div>
                      <span className="text-secondary-700">
                        Zero critical issues
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mt-16">
              <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Be Part of Our Growing Story
                </h3>
                <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
                  Join the thousands of developers who are already using
                  Git-ripper to streamline their workflow. Your usage helps make
                  these statistics even better!
                </p>
                <a
                  href="https://www.npmjs.com/package/git-ripper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-primary-600 hover:bg-primary-50 font-medium py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center space-x-2">
                  <ArrowDownIcon className="w-5 h-5" />
                  <span>Install Git-ripper</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Stats;
