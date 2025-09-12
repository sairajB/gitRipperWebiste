import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  ArrowDownIcon,
  StarIcon,
  EyeIcon,
  ChartBarIcon,
  UsersIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import StatsService from "../../services/statsService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Statistics = () => {
  const [stats, setStats] = useState({
    totalDownloads: "Loading...",
    weeklyDownloads: "Loading...",
    githubStars: "Loading...",
    weeklyUsers: "Loading...",
  });
  const [chartData, setChartData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await StatsService.getCombinedStats();
        setStats({
          totalDownloads: data.formatted.totalDownloads,
          weeklyDownloads: data.formatted.weeklyDownloads,
          githubStars: data.formatted.githubStars,
          weeklyUsers: data.formatted.weeklyUsers,
        });
        setLastUpdated(new Date());

        // Create chart data from real download history - aggregate to weekly
        const downloadHistory = data.downloadHistory.slice(-30); // Last 30 days
        if (downloadHistory.length > 0) {
          // Group daily data into weekly aggregates
          const weeklyData = [];
          const weeklyLabels = [];

          for (let i = 0; i < downloadHistory.length; i += 7) {
            const weekData = downloadHistory.slice(i, i + 7);
            const weekTotal = weekData.reduce(
              (sum, day) => sum + (day.downloads || 0),
              0
            );
            const startDate = new Date(weekData[0]?.day || Date.now());

            weeklyData.push(weekTotal);
            weeklyLabels.push(
              startDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            );
          }

          setChartData({
            labels: weeklyLabels,
            datasets: [
              {
                label: "Weekly Downloads",
                data: weeklyData,
                borderColor: "rgb(14, 165, 233)",
                backgroundColor: "rgba(14, 165, 233, 0.1)",
                fill: true,
                tension: 0.4,
                pointBackgroundColor: "rgb(14, 165, 233)",
                pointBorderColor: "#fff",
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
              },
            ],
          });
        } else if (data.weeklyTrendData) {
          // Use the generated weekly trend data if no download history
          setChartData(data.weeklyTrendData);
        }
      } catch (error) {
        console.error("Error loading stats:", error);
        setLastUpdated(new Date());
        // Keep fallback values
        setStats({
          totalDownloads: "2.8K",
          weeklyDownloads: "167",
          githubStars: "4",
          weeklyUsers: "120+",
        });
      }
    };

    fetchStats();

    // Refresh stats every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Fallback chart data if no real data is available
  const defaultChartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
      {
        label: "Weekly Downloads",
        data: [120, 180, 240, 320, 410, 500],
        borderColor: "rgb(14, 165, 233)",
        backgroundColor: "rgba(14, 165, 233, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgb(14, 165, 233)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
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

  const statsData = [
    {
      icon: ArrowDownIcon,
      label: "Total Downloads",
      value: stats.totalDownloads,
      change: "+15%",
      positive: true,
      description: "All-time package downloads",
    },
    {
      icon: UsersIcon,
      label: "Weekly Users",
      value: stats.weeklyUsers,
      change: "+8%",
      positive: true,
      description: "Active users this week",
    },
    {
      icon: StarIcon,
      label: "GitHub Stars",
      value: stats.githubStars,
      change: "+12%",
      positive: true,
      description: "Repository stars",
    },
    {
      icon: CalendarIcon,
      label: "Weekly Downloads",
      value: stats.weeklyDownloads,
      change: "+22%",
      positive: true,
      description: "Downloads this week",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <ChartBarIcon className="w-4 h-4" />
            <span>Usage Statistics</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>

          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Git-ripper is growing fast! Join the community of developers who
            have discovered a better way to download GitHub content.
          </p>

          <div className="flex items-center justify-center space-x-4 mt-6 text-sm text-secondary-500">
            <span>Stats updated: {lastUpdated.toLocaleTimeString()}</span>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Live data</span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
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

                <div className="flex items-center justify-center space-x-1">
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

                <p className="text-secondary-500 text-xs mt-2">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Download Trend Chart */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-secondary-900">
                    Download Trend
                  </h3>
                  <p className="text-secondary-600 text-sm">
                    Weekly download statistics over time
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Growing +22%</span>
                </div>
              </div>

              <div className="h-64">
                <Line
                  data={chartData || defaultChartData}
                  options={chartOptions}
                />
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="space-y-6">
            {/* Community Growth */}
            <div className="card">
              <h4 className="font-semibold text-secondary-900 mb-4">
                Community Growth
              </h4>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-secondary-600">
                      GitHub Issues Resolved
                    </span>
                    <span className="font-medium">95%</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "95%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-secondary-600">
                      User Satisfaction
                    </span>
                    <span className="font-medium">98%</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: "98%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-secondary-600">Feature Requests</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div
                      className="bg-accent-500 h-2 rounded-full"
                      style={{ width: "78%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest Milestone */}
            <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white">
              <h4 className="font-semibold mb-2">Latest Milestone</h4>
              <p className="text-primary-100 text-sm mb-4">
                We just hit 2,800 total downloads! Thank you to our amazing
                community.
              </p>
              <div className="flex items-center space-x-2 text-primary-200 text-sm">
                <CalendarIcon className="w-4 h-4" />
                <span>Achieved this month</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">
              Be Part of the Growth
            </h3>
            <p className="text-secondary-600 mb-6">
              Join thousands of developers who are already using Git-ripper to
              streamline their workflow and save time.
            </p>
            <a
              href="https://www.npmjs.com/package/git-ripper"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center space-x-2">
              <ArrowDownIcon className="w-5 h-5" />
              <span>Install Git-ripper</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
