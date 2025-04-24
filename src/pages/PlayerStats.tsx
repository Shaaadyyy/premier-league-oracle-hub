
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Search, Users, ArrowUpDown, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const PlayerStats = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [teamFilter, setTeamFilter] = useState('all');
  const [priceSort, setPriceSort] = useState('asc');
  const [comparisonPlayers, setComparisonPlayers] = useState([1, 2]);
  
  // Mock player data
  const players = [
    { 
      id: 1,
      name: "Mohamed Salah", 
      team: "Liverpool", 
      position: "MID", 
      price: 13.2,
      points: 245,
      selectedBy: 45.6,
      form: 8.2,
      stats: {
        goals: 28,
        assists: 14,
        cleanSheets: 12,
        bonus: 32,
        xG: 24.34,
        xA: 10.87,
        shots: 142,
        keyPasses: 78,
        ictIndex: 345.2
      },
      lastFiveScores: [12, 8, 9, 15, 2],
      radarData: [
        { stat: "Goals", value: 9.5 },
        { stat: "Assists", value: 8.5 },
        { stat: "Bonus", value: 9 },
        { stat: "Clean Sheets", value: 7 },
        { stat: "xGI", value: 9.5 },
        { stat: "ICT", value: 10 }
      ]
    },
    { 
      id: 2,
      name: "Erling Haaland", 
      team: "Man City", 
      position: "FWD", 
      price: 14.0,
      points: 262,
      selectedBy: 62.3,
      form: 7.8,
      stats: {
        goals: 34,
        assists: 7,
        cleanSheets: 16,
        bonus: 42,
        xG: 32.12,
        xA: 5.63,
        shots: 156,
        keyPasses: 46,
        ictIndex: 367.8
      },
      lastFiveScores: [6, 15, 12, 8, 6],
      radarData: [
        { stat: "Goals", value: 10 },
        { stat: "Assists", value: 6 },
        { stat: "Bonus", value: 10 },
        { stat: "Clean Sheets", value: 7.5 },
        { stat: "xGI", value: 10 },
        { stat: "ICT", value: 8 }
      ]
    },
    { 
      id: 3,
      name: "Bukayo Saka", 
      team: "Arsenal", 
      position: "MID", 
      price: 10.5,
      points: 232,
      selectedBy: 38.7,
      form: 9.1,
      stats: {
        goals: 19,
        assists: 18,
        cleanSheets: 14,
        bonus: 36,
        xG: 16.56,
        xA: 15.24,
        shots: 110,
        keyPasses: 92,
        ictIndex: 310.5
      },
      lastFiveScores: [9, 12, 7, 13, 8],
      radarData: [
        { stat: "Goals", value: 8 },
        { stat: "Assists", value: 9 },
        { stat: "Bonus", value: 8 },
        { stat: "Clean Sheets", value: 8 },
        { stat: "xGI", value: 8.5 },
        { stat: "ICT", value: 9 }
      ]
    }
  ];
  
  const formChartData = players.map(player => ({
    name: player.name,
    GW1: player.lastFiveScores[0],
    GW2: player.lastFiveScores[1],
    GW3: player.lastFiveScores[2],
    GW4: player.lastFiveScores[3],
    GW5: player.lastFiveScores[4]
  }));
  
  const goalAssistData = players.map(player => ({
    name: player.name,
    goals: player.stats.goals,
    assists: player.stats.assists,
    xG: player.stats.xG,
    xA: player.stats.xA
  }));
  
  const selectedPlayer1 = players.find(p => p.id === comparisonPlayers[0]);
  const selectedPlayer2 = players.find(p => p.id === comparisonPlayers[1]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="pl-section-title mb-6 text-3xl">Player Stats & Comparison</h1>
        
        {/* Search & Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="GKP">Goalkeeper</SelectItem>
                  <SelectItem value="DEF">Defender</SelectItem>
                  <SelectItem value="MID">Midfielder</SelectItem>
                  <SelectItem value="FWD">Forward</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  <SelectItem value="Arsenal">Arsenal</SelectItem>
                  <SelectItem value="Liverpool">Liverpool</SelectItem>
                  <SelectItem value="Man City">Man City</SelectItem>
                  {/* More teams would be added here */}
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" onClick={() => setPriceSort(priceSort === 'asc' ? 'desc' : 'asc')}>
              <ArrowUpDown size={16} className="mr-2" />
              Price {priceSort === 'asc' ? '↑' : '↓'}
            </Button>
          </div>
        </div>
        
        {/* Player Comparison Section */}
        <h2 className="text-xl font-bold mb-4 text-pl-purple">Player Comparison</h2>
        
        {/* Player Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {[0, 1].map((index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-3 text-pl-purple">
                Player {index + 1} Selection
              </h3>
              <Select 
                value={comparisonPlayers[index].toString()} 
                onValueChange={(value) => {
                  const newComparison = [...comparisonPlayers];
                  newComparison[index] = parseInt(value);
                  setComparisonPlayers(newComparison);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select player" />
                </SelectTrigger>
                <SelectContent>
                  {players.map(player => (
                    <SelectItem key={player.id} value={player.id.toString()}>
                      {player.name} ({player.team})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Selected Player Card */}
              {players.find(p => p.id === comparisonPlayers[index]) && (
                <div className="mt-4 p-4 border rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg">
                        {players.find(p => p.id === comparisonPlayers[index])?.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {players.find(p => p.id === comparisonPlayers[index])?.team} | 
                        {players.find(p => p.id === comparisonPlayers[index])?.position}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Price</div>
                      <div className="font-bold text-lg">
                        £{players.find(p => p.id === comparisonPlayers[index])?.price.toFixed(1)}m
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                    <div>
                      <div className="text-sm text-gray-500">Points</div>
                      <div className="font-bold text-pl-purple">
                        {players.find(p => p.id === comparisonPlayers[index])?.points}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Form</div>
                      <div className="font-bold text-pl-purple">
                        {players.find(p => p.id === comparisonPlayers[index])?.form}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Selected</div>
                      <div className="font-bold text-pl-purple">
                        {players.find(p => p.id === comparisonPlayers[index])?.selectedBy}%
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Comparison Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Form Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Form Comparison (Last 5 GWs)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={formChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" hide={true} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="GW1" 
                      name="GW1" 
                      stroke="#37003C" 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="GW2" 
                      name="GW2" 
                      stroke="#00FF87" 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="GW3" 
                      name="GW3" 
                      stroke="#FF2882" 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="GW4" 
                      name="GW4" 
                      stroke="#04F5FF" 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="GW5" 
                      name="GW5" 
                      stroke="#FFF200" 
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Goals & Assists Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Goals & Assists</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={goalAssistData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="goals" name="Goals" fill="#37003C" />
                    <Bar dataKey="assists" name="Assists" fill="#00FF87" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Radar Comparison Charts */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Player Attributes Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[selectedPlayer1, selectedPlayer2].map((player, index) => (
                  <div key={index} className="h-96">
                    <h3 className="text-center font-semibold mb-2">{player?.name}</h3>
                    <ResponsiveContainer width="100%" height="85%">
                      <RadarChart outerRadius={90} data={player?.radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="stat" />
                        <PolarRadiusAxis domain={[0, 10]} />
                        <Radar
                          name={player?.name}
                          dataKey="value"
                          stroke={index === 0 ? "#37003C" : "#00FF87"}
                          fill={index === 0 ? "#37003C" : "#00FF87"}
                          fillOpacity={0.6}
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Detailed Stats Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-4 py-3 text-left">Stat</th>
                    <th className="px-4 py-3 text-center">{selectedPlayer1?.name}</th>
                    <th className="px-4 py-3 text-center">{selectedPlayer2?.name}</th>
                    <th className="px-4 py-3 text-left">Difference</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-medium">Total Points</td>
                    <td className="px-4 py-3 text-center font-bold">{selectedPlayer1?.points}</td>
                    <td className="px-4 py-3 text-center font-bold">{selectedPlayer2?.points}</td>
                    <td className={`px-4 py-3 ${selectedPlayer1?.points > selectedPlayer2?.points ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedPlayer1?.points > selectedPlayer2?.points ? '+' : ''}{selectedPlayer1?.points - selectedPlayer2?.points}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-medium">Price</td>
                    <td className="px-4 py-3 text-center">£{selectedPlayer1?.price.toFixed(1)}m</td>
                    <td className="px-4 py-3 text-center">£{selectedPlayer2?.price.toFixed(1)}m</td>
                    <td className={`px-4 py-3 ${selectedPlayer1?.price < selectedPlayer2?.price ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedPlayer1?.price < selectedPlayer2?.price ? '' : '+'}{(selectedPlayer1?.price - selectedPlayer2?.price).toFixed(1)}m
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-medium">Form (avg last 5)</td>
                    <td className="px-4 py-3 text-center">{selectedPlayer1?.form}</td>
                    <td className="px-4 py-3 text-center">{selectedPlayer2?.form}</td>
                    <td className={`px-4 py-3 ${selectedPlayer1?.form > selectedPlayer2?.form ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedPlayer1?.form > selectedPlayer2?.form ? '+' : ''}{(selectedPlayer1?.form - selectedPlayer2?.form).toFixed(1)}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-medium">Goals</td>
                    <td className="px-4 py-3 text-center">{selectedPlayer1?.stats.goals}</td>
                    <td className="px-4 py-3 text-center">{selectedPlayer2?.stats.goals}</td>
                    <td className={`px-4 py-3 ${selectedPlayer1?.stats.goals > selectedPlayer2?.stats.goals ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedPlayer1?.stats.goals > selectedPlayer2?.stats.goals ? '+' : ''}{selectedPlayer1?.stats.goals - selectedPlayer2?.stats.goals}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-medium">Assists</td>
                    <td className="px-4 py-3 text-center">{selectedPlayer1?.stats.assists}</td>
                    <td className="px-4 py-3 text-center">{selectedPlayer2?.stats.assists}</td>
                    <td className={`px-4 py-3 ${selectedPlayer1?.stats.assists > selectedPlayer2?.stats.assists ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedPlayer1?.stats.assists > selectedPlayer2?.stats.assists ? '+' : ''}{selectedPlayer1?.stats.assists - selectedPlayer2?.stats.assists}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-medium">xG</td>
                    <td className="px-4 py-3 text-center">{selectedPlayer1?.stats.xG.toFixed(2)}</td>
                    <td className="px-4 py-3 text-center">{selectedPlayer2?.stats.xG.toFixed(2)}</td>
                    <td className={`px-4 py-3 ${selectedPlayer1?.stats.xG > selectedPlayer2?.stats.xG ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedPlayer1?.stats.xG > selectedPlayer2?.stats.xG ? '+' : ''}{(selectedPlayer1?.stats.xG - selectedPlayer2?.stats.xG).toFixed(2)}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-medium">xA</td>
                    <td className="px-4 py-3 text-center">{selectedPlayer1?.stats.xA.toFixed(2)}</td>
                    <td className="px-4 py-3 text-center">{selectedPlayer2?.stats.xA.toFixed(2)}</td>
                    <td className={`px-4 py-3 ${selectedPlayer1?.stats.xA > selectedPlayer2?.stats.xA ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedPlayer1?.stats.xA > selectedPlayer2?.stats.xA ? '+' : ''}{(selectedPlayer1?.stats.xA - selectedPlayer2?.stats.xA).toFixed(2)}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-medium">Bonus Points</td>
                    <td className="px-4 py-3 text-center">{selectedPlayer1?.stats.bonus}</td>
                    <td className="px-4 py-3 text-center">{selectedPlayer2?.stats.bonus}</td>
                    <td className={`px-4 py-3 ${selectedPlayer1?.stats.bonus > selectedPlayer2?.stats.bonus ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedPlayer1?.stats.bonus > selectedPlayer2?.stats.bonus ? '+' : ''}{selectedPlayer1?.stats.bonus - selectedPlayer2?.stats.bonus}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlayerStats;
