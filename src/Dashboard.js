import React from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { CheckCircle, User, BookOpen, Lightbulb, Target, PieChart, BarChart3, TrendingUp } from "lucide-react";
import { ResponsiveContainer, PieChart as RePieChart, Pie, BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, Cell, Legend, LineChart, Line, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

// Data for pie chart - Based on research of Indian unicorn founders
const founderDist = [
  { name: "B.Tech / Engineering", value: 68, description: "Majority from IITs and top engineering colleges" },
  { name: "Commerce / Business", value: 17, description: "Often with MBAs from IIMs/ISB" },
  { name: "Other Backgrounds", value: 15, description: "Including arts, science, and college dropouts" },
];

// Custom tooltip for the pie chart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold">{data.name}: {data.value}%</p>
        <p className="text-sm text-gray-600">{data.description}</p>
      </div>
    );
  }
  return null;
};

// Radar chart data: strategy weight per category
const radarData = [
  { category: "Tech Foundation", eng: 9, comm: 6, others: 4 },
  { category: "Compliance Setup", eng: 8, comm: 5, others: 3 },
  { category: "Team Leadership", eng: 7, comm: 8, others: 5 },
  { category: "Fundraising Fit", eng: 8.5, comm: 7, others: 6 },
];

// Detailed Startup Roadmap with strategies
const timelineData = [
  {
    stage: "Ideation",
    strategy: "Validate problem, identify target market, research remittance pain points",
    progress: 10
  },
  {
    stage: "Concept Validation",
    strategy: "Refine value proposition, conduct competitor analysis, outline compliance landscape",
    progress: 25
  },
  {
    stage: "Prototype Development",
    strategy: "Upskill via FinTech tools, hire core tech team, start compliance documentation",
    progress: 40
  },
  {
    stage: "MVP & Internal Testing",
    strategy: "Build secure MVP with KYC/AML, onboard legal advisor, test transaction logic",
    progress: 60
  },
  {
    stage: "External Pilots",
    strategy: "Launch beta, gather user feedback, iterate based on regulatory feedback",
    progress: 75
  },
  {
    stage: "Go‑To‑Market",
    strategy: "Finalize fundraising pitch, showcase stamp of quality, leverage PE mentorship",
    progress: 90
  },
  {
    stage: "Scaling & Optimization",
    strategy: "Expand cross-border partnerships, refine UX, strengthen compliance workflows",
    progress: 100
  }
];

const COLORS = ["#2563EB", "#60A5FA"];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <header className="text-3xl font-bold text-center text-gray-800">
        FinTech Founder Fit Dashboard
      </header>

      {/* Founder Background Distribution */}
      <Card className="max-w-5xl mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
              <PieChart className="text-blue-600" /> Founder Background (India Unicorns)
            </h2>
            <p className="text-sm text-gray-500 mt-1 md:mt-0">Analysis of 100+ Indian unicorn founders</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={founderDist}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {founderDist.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={[
                        '#2563EB', // Blue for Engineering
                        '#10B981', // Green for Commerce
                        '#8B5CF6'  // Purple for Others
                      ][index % 3]} 
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-gray-500 text-center">
            <p>Majority of Indian unicorn founders come from engineering backgrounds</p>
          </div>
        </CardContent>
      </Card>

      {/* Radar Chart for Strategy Weights */}
      <Card className="max-w-5xl mx-auto">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-4">
            <BarChart3 className="text-blue-600" /> Strategic Weighting by Profile
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={30} domain={[0, 10]} />
              <Radar name="Engineering" dataKey="eng" stroke="#2563EB" fill="#2563EB" fillOpacity={0.6} />
              <Radar name="Commerce" dataKey="comm" stroke="#60A5FA" fill="#60A5FA" fillOpacity={0.6} />
              <Radar name="Others" dataKey="others" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Timeline with Strategy per Stage */}
      <Card className="max-w-5xl mx-auto">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-4">
            <TrendingUp className="text-blue-600" /> Startup Journey & Strategy Roadmap
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={timelineData}>
              <XAxis dataKey="stage" />
              <YAxis domain={[0, 100]} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip formatter={(value, name, props) => [`${props.payload.strategy}`, "Focus"]} />
              <Line type="monotone" dataKey="progress" stroke="#2563EB" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
