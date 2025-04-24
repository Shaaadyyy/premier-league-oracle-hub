import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Users, Clock, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar
} from 'recharts';

const LiveTracker = () => {
  const [selectedMatch, setSelectedMatch] = useState(1);
  
  // Mock match data
  const matches = [
    {
      id: 1,
      homeTeam: "Arsenal",
      awayTeam: "Liverpool",
      homeScore: 2,
      awayScore: 1,
      time: "73'",
      status: "LIVE",
    },
    {
      id: 2,
      homeTeam: "Man City",
      awayTeam: "Chelsea",
      homeScore: 0,
      awayScore: 0,
      time: "18'",
      status: "LIVE",
    },
    {
      id: 3,
      homeTeam: "Tottenham",
      awayTeam: "Man United",
      homeScore: 0,
      awayScore: 0,
      time: "Pre",
      status: "TODAY",
      kickoff: "17:30"
    }
  ];

  // Mock timeline data
  const timelineData = [
    { time: "1'", event: "Match starts", player: "", type: "kickoff" },
    { time: "23'", event: "GOAL", player: "Saka (Arsenal)", type: "goal" },
    { time: "34'", event: "GOAL", player: "Salah (Liverpool)", type: "goal" },
    { time: "45'", event: "Yellow Card", player: "Partey (Arsenal)", type: "card" },
    { time: "45+2'", event: "Half-time", player: "", type: "period" },
    { time: "46'", event: "Second half starts", player: "", type: "kickoff" },
    { time: "56'", event: "GOAL", player: "Martinelli (Arsenal)", type: "goal" },
    { time: "60'", event: "Substitution", player: "Jota for Diaz (Liverpool)", type: "sub" },
    { time: "68'", event: "Yellow Card", player: "Robertson (Liverpool)", type: "card" },
  ];

  // Mock match stats
  const matchStats = {
    possession: {
      home: 42,
      away: 58
    },
    shots: {
      home: 11,
      away: 14
    },
    shotsOnTarget: {
      home: 5,
      away: 3
    },
    corners: {
      home: 4,
      away: 7
    },
    fouls: {
      home: 8,
      away: 10
    },
    xG: {
      home: 1.45,
      away: 1.68
    }
  };

  // Mock xG timeline data
  const xgTimelineData = [
    { minute: 10, homeXG: 0, awayXG: 0 },
    { minute: 20, homeXG: 0.12, awayXG: 0.08 },
    { minute: 30, homeXG: 0.68, awayXG: 0.08 },
    { minute: 40, homeXG: 0.68, awayXG: 0.52 },
    { minute: 50, homeXG: 0.68, awayXG: 0.76 },
    { minute: 60, homeXG: 1.23, awayXG: 0.76 },
    { minute: 70, homeXG: 1.45, awayXG: 1.68 }
  ];

  // Player fantasy points for the current match
  const playerFantasyPoints = [
    { name: "Saka", team: "Arsenal", position: "MID", points: 9, goals: 1, assists: 0, bonus: 2 },
    { name: "Martinelli", team: "Arsenal", position: "MID", points: 8, goals: 1, assists: 0, bonus: 1 },
    { name: "Saliba", team: "Arsenal", position: "DEF", points: 6, goals: 0, assists: 0, bonus: 0 },
    { name: "Salah", team: "Liverpool", position: "MID", points: 7, goals: 1, assists: 0, bonus: 0 },
    { name: "Virgil van Dijk", team: "Liverpool", position: "DEF", points: 1, goals: 0, assists: 0, bonus: 0 },
    { name: "Alisson", team: "Liverpool", position: "GKP", points: 1, goals: 0, assists: 0, bonus: 0 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="pl-section-title mb-6 text-3xl">Live Match Tracker</h1>
        
        {/* Match Selection Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-6 gap-3">
          {matches.map((match) => (
            <Button
              key={match.id}
              variant={selectedMatch === match.id ? "default" : "outline"}
              className={selectedMatch === match.id 
                ? "bg-pl-purple text-white" 
                : "border-gray-200 hover:border-pl-green hover:text-pl-green"
              }
              onClick={() => setSelectedMatch(match.id)}
            >
              <div className="flex flex-col items-center md:flex-row md:gap-2">
                <span>{match.homeTeam} vs {match.awayTeam}</span>
                <div className="flex items-center">
                  {match.status === "LIVE" && (
                    <Badge variant="destructive" className="ml-2">LIVE</Badge>
                  )}
                </div>
              </div>
            </Button>
          ))}
        </div>
        
        {/* Match Score Card */}
        <Card className="mb-6">
          <CardHeader className="bg-pl-purple text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Clock size={18} className="mr-2" />
                <span>{matches.find(m => m.id === selectedMatch)?.time}</span>
              </div>
              {matches.find(m => m.id === selectedMatch)?.status === "LIVE" && (
                <Badge className="bg-red-500">LIVE</Badge>
              )}
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="text-2xl font-bold text-white">
                {matches.find(m => m.id === selectedMatch)?.homeTeam}
              </div>
              <div className="text-3xl font-bold">
                {matches.find(m => m.id === selectedMatch)?.homeScore} - {matches.find(m => m.id === selectedMatch)?.awayScore}
              </div>
              <div className="text-2xl font-bold text-white text-right">
                {matches.find(m => m.id === selectedMatch)?.awayTeam}
              </div>
            </div>
          </CardHeader>
        </Card>
        
        {/* Content Tabs */}
        <Tabs defaultValue="timeline">
          <TabsList className="mb-6">
            <TabsTrigger value="timeline" className="data-[state=active]:bg-pl-green data-[state=active]:text-pl-purple">
              <Clock size={16} className="mr-2" /> Timeline
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-pl-green data-[state=active]:text-pl-purple">
              <BarChart size={16} className="mr-2" /> Match Stats
            </TabsTrigger>
            <TabsTrigger value="players" className="data-[state=active]:bg-pl-green data-[state=active]:text-pl-purple">
              <Users size={16} className="mr-2" /> Players
            </TabsTrigger>
          </TabsList>
          
          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            {/* Timeline Chart */}
            <Card>
              <CardHeader>
                <CardTitle>xG Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={xgTimelineData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="minute" name="Minute" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [parseFloat(value).toFixed(2), "xG"]}
                        labelFormatter={(value) => `Minute ${value}`}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="homeXG" 
                        name={matches.find(m => m.id === selectedMatch)?.homeTeam + " xG"} 
                        stroke="#37003C" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="awayXG" 
                        name={matches.find(m => m.id === selectedMatch)?.awayTeam + " xG"} 
                        stroke="#00FF87" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Timeline Events */}
            <Card>
              <CardHeader>
                <CardTitle>Match Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {timelineData.map((event, index) => (
                    <li 
                      key={index} 
                      className={`flex items-start p-3 border-l-4 rounded ${
                        event.type === 'goal' ? 'border-green-500 bg-green-50' : 
                        event.type === 'card' ? 'border-yellow-500 bg-yellow-50' : 
                        event.type === 'period' ? 'border-gray-500 bg-gray-50' : 
                        'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex-shrink-0 w-12 text-sm font-bold">{event.time}</div>
                      <div className="flex-grow">
                        <div className={`font-semibold ${
                          event.type === 'goal' ? 'text-green-700' : 
                          event.type === 'card' ? 'text-yellow-700' : 
                          'text-gray-700'
                        }`}>
                          {event.event}
                        </div>
                        {event.player && <div className="text-sm text-gray-600">{event.player}</div>}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Possession Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Possession</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-48">
                    <div className="w-full h-12 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-pl-purple" 
                        style={{ width: `${matchStats.possession.home}%` }}
                      >
                        <div className="flex h-full items-center justify-center text-white font-bold">
                          {matchStats.possession.home}%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4 text-sm">
                    <div>{matches.find(m => m.id === selectedMatch)?.homeTeam}</div>
                    <div>{matches.find(m => m.id === selectedMatch)?.awayTeam}</div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Expected Goals */}
              <Card>
                <CardHeader>
                  <CardTitle>Expected Goals (xG)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={[
                          {
                            name: matches.find(m => m.id === selectedMatch)?.homeTeam,
                            xG: matchStats.xG.home,
                            goals: matches.find(m => m.id === selectedMatch)?.homeScore
                          },
                          {
                            name: matches.find(m => m.id === selectedMatch)?.awayTeam,
                            xG: matchStats.xG.away,
                            goals: matches.find(m => m.id === selectedMatch)?.awayScore
                          }
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="xG" name="Expected Goals" fill="#37003C" />
                        <Bar dataKey="goals" name="Actual Goals" fill="#00FF87" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Other Stats */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Match Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Shots */}
                    <div className="flex items-center">
                      <div className="w-1/4 text-right pr-4 font-medium">{matchStats.shots.home}</div>
                      <div className="w-2/4">
                        <div className="text-xs text-center mb-1">Shots</div>
                        <div className="flex">
                          <div 
                            className="h-2 bg-pl-purple rounded-l" 
                            style={{ width: `${(matchStats.shots.home / (matchStats.shots.home + matchStats.shots.away)) * 100}%` }}
                          ></div>
                          <div 
                            className="h-2 bg-pl-green rounded-r" 
                            style={{ width: `${(matchStats.shots.away / (matchStats.shots.home + matchStats.shots.away)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-1/4 pl-4 font-medium">{matchStats.shots.away}</div>
                    </div>
                    
                    {/* Shots on Target */}
                    <div className="flex items-center">
                      <div className="w-1/4 text-right pr-4 font-medium">{matchStats.shotsOnTarget.home}</div>
                      <div className="w-2/4">
                        <div className="text-xs text-center mb-1">Shots on Target</div>
                        <div className="flex">
                          <div 
                            className="h-2 bg-pl-purple rounded-l" 
                            style={{ width: `${(matchStats.shotsOnTarget.home / (matchStats.shotsOnTarget.home + matchStats.shotsOnTarget.away)) * 100}%` }}
                          ></div>
                          <div 
                            className="h-2 bg-pl-green rounded-r" 
                            style={{ width: `${(matchStats.shotsOnTarget.away / (matchStats.shotsOnTarget.home + matchStats.shotsOnTarget.away)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-1/4 pl-4 font-medium">{matchStats.shotsOnTarget.away}</div>
                    </div>
                    
                    {/* Corners */}
                    <div className="flex items-center">
                      <div className="w-1/4 text-right pr-4 font-medium">{matchStats.corners.home}</div>
                      <div className="w-2/4">
                        <div className="text-xs text-center mb-1">Corners</div>
                        <div className="flex">
                          <div 
                            className="h-2 bg-pl-purple rounded-l" 
                            style={{ width: `${(matchStats.corners.home / (matchStats.corners.home + matchStats.corners.away)) * 100}%` }}
                          ></div>
                          <div 
                            className="h-2 bg-pl-green rounded-r" 
                            style={{ width: `${(matchStats.corners.away / (matchStats.corners.home + matchStats.corners.away)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-1/4 pl-4 font-medium">{matchStats.corners.away}</div>
                    </div>
                    
                    {/* Fouls */}
                    <div className="flex items-center">
                      <div className="w-1/4 text-right pr-4 font-medium">{matchStats.fouls.home}</div>
                      <div className="w-2/4">
                        <div className="text-xs text-center mb-1">Fouls</div>
                        <div className="flex">
                          <div 
                            className="h-2 bg-pl-purple rounded-l" 
                            style={{ width: `${(matchStats.fouls.home / (matchStats.fouls.home + matchStats.fouls.away)) * 100}%` }}
                          ></div>
                          <div 
                            className="h-2 bg-pl-green rounded-r" 
                            style={{ width: `${(matchStats.fouls.away / (matchStats.fouls.home + matchStats.fouls.away)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-1/4 pl-4 font-medium">{matchStats.fouls.away}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Players Tab */}
          <TabsContent value="players" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Fantasy Points Tracker</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter size={14} /> Filter
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-4 py-3 text-left">Player</th>
                    <th className="px-4 py-3 text-left">Team</th>
                    <th className="px-4 py-3 text-left">Pos</th>
                    <th className="px-4 py-3 text-right">FPL Pts</th>
                    <th className="px-4 py-3 text-center">Goals</th>
                    <th className="px-4 py-3 text-center">Assists</th>
                    <th className="px-4 py-3 text-center">Bonus</th>
                  </tr>
                </thead>
                <tbody>
                  {playerFantasyPoints.map((player, index) => (
                    <tr 
                      key={index} 
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-4 font-medium">{player.name}</td>
                      <td className="px-4 py-4">{player.team}</td>
                      <td className="px-4 py-4">{player.position}</td>
                      <td className="px-4 py-4 text-right font-bold">{player.points}</td>
                      <td className="px-4 py-4 text-center">{player.goals}</td>
                      <td className="px-4 py-4 text-center">{player.assists}</td>
                      <td className="px-4 py-4 text-center">{player.bonus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LiveTracker;
