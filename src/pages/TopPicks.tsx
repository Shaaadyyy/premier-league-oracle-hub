
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, TrendingUp, Clock, Share, ChevronDown, Filter, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const TopPicks = () => {
  const [gameweek, setGameweek] = useState('37');
  
  // Mock top captaincy picks
  const captaincyPicks = [
    { id: 1, name: "Erling Haaland", team: "Man City", position: "FWD", price: 14.0, strength: 98, votes: 45.3, opponent: "WHU (H)" },
    { id: 2, name: "Mohamed Salah", team: "Liverpool", position: "MID", price: 13.2, strength: 90, votes: 28.7, opponent: "WOL (H)" },
    { id: 3, name: "Bukayo Saka", team: "Arsenal", position: "MID", price: 10.5, strength: 82, votes: 10.2, opponent: "EVE (H)" },
    { id: 4, name: "Kai Havertz", team: "Arsenal", position: "MID", price: 8.3, strength: 76, votes: 8.1, opponent: "EVE (H)" },
    { id: 5, name: "Cole Palmer", team: "Chelsea", position: "MID", price: 9.8, strength: 74, votes: 7.7, opponent: "BOU (A)" },
  ];
  
  const captainPieData = captaincyPicks.map(pick => ({
    name: pick.name,
    value: pick.votes
  }));
  
  // Top picks by position
  const topPicks = {
    GKP: [
      { id: 1, name: "Alisson", team: "Liverpool", price: 6.0, form: 5.3, points: 162, opponent: "WOL (H)" },
      { id: 2, name: "Ederson", team: "Man City", price: 5.8, form: 5.0, points: 153, opponent: "WHU (H)" },
      { id: 3, name: "David Raya", team: "Arsenal", price: 5.5, form: 4.7, points: 158, opponent: "EVE (H)" }
    ],
    DEF: [
      { id: 1, name: "Virgil van Dijk", team: "Liverpool", price: 6.5, form: 6.8, points: 175, opponent: "WOL (H)" },
      { id: 2, name: "William Saliba", team: "Arsenal", price: 6.3, form: 6.5, points: 183, opponent: "EVE (H)" },
      { id: 3, name: "Joško Gvardiol", team: "Man City", price: 5.8, form: 7.2, points: 165, opponent: "WHU (H)" }
    ],
    MID: [
      { id: 1, name: "Mohamed Salah", team: "Liverpool", price: 13.2, form: 8.2, points: 245, opponent: "WOL (H)" },
      { id: 2, name: "Bukayo Saka", team: "Arsenal", price: 10.5, form: 9.1, points: 232, opponent: "EVE (H)" },
      { id: 3, name: "Cole Palmer", team: "Chelsea", price: 9.8, form: 7.5, points: 227, opponent: "BOU (A)" }
    ],
    FWD: [
      { id: 1, name: "Erling Haaland", team: "Man City", price: 14.0, form: 7.8, points: 262, opponent: "WHU (H)" },
      { id: 2, name: "Alexander Isak", team: "Newcastle", price: 8.8, form: 7.1, points: 187, opponent: "BRE (A)" },
      { id: 3, name: "Dominic Solanke", team: "Tottenham", price: 7.5, form: 6.8, points: 168, opponent: "SHU (A)" }
    ]
  };
  
  // Team of the week
  const teamOfTheWeek = [
    { position: "GKP", name: "Alisson", team: "Liverpool", points: 9 },
    { position: "DEF", name: "Virgil van Dijk", team: "Liverpool", points: 12 },
    { position: "DEF", name: "William Saliba", team: "Arsenal", points: 11 },
    { position: "DEF", name: "Joško Gvardiol", team: "Man City", points: 14 },
    { position: "DEF", name: "Trent Alexander-Arnold", team: "Liverpool", points: 10 },
    { position: "MID", name: "Mohamed Salah", team: "Liverpool", points: 15 },
    { position: "MID", name: "Bukayo Saka", team: "Arsenal", points: 13 },
    { position: "MID", name: "Kevin De Bruyne", team: "Man City", points: 12 },
    { position: "MID", name: "Cole Palmer", team: "Chelsea", points: 12 },
    { position: "FWD", name: "Erling Haaland", team: "Man City", points: 16, captain: true },
    { position: "FWD", name: "Alexander Isak", team: "Newcastle", points: 9 }
  ];

  // Color scheme for the pie chart
  const COLORS = ['#37003C', '#00FF87', '#04F5FF', '#FF2882', '#FFF200'];

  // Fixture difficulty rating for top captaincy picks
  const difficultyRatings = captaincyPicks.map(pick => ({
    name: pick.name,
    difficulty: Math.floor(Math.random() * 5) + 1,
    form: pick.strength / 10,
    xGI: (pick.strength / 10) - (Math.random() * 0.5)
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="pl-section-title mb-6 text-3xl">Top Picks & Captaincy</h1>
        
        {/* Gameweek Selection */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-gray-500" />
              <span className="font-medium">Gameweek:</span>
              <Select value={gameweek} onValueChange={setGameweek}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Select GW" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="35">GW 35</SelectItem>
                  <SelectItem value="36">GW 36</SelectItem>
                  <SelectItem value="37">GW 37</SelectItem>
                  <SelectItem value="38">GW 38</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                <TrendingUp size={14} className="mr-1" /> Updated 2 hours ago
              </Badge>
              <Button variant="outline" className="flex items-center gap-2">
                <Share size={16} /> Share Picks
              </Button>
            </div>
          </div>
        </div>
        
        {/* Captaincy Picks Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-pl-purple">Captaincy Recommendations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Captaincy Chart */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Captaincy Strength</CardTitle>
                  <CardDescription>
                    Based on form, fixture difficulty, and expected goal involvement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={difficultyRatings}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="form" name="Form" fill="#37003C" />
                        <Bar dataKey="xGI" name="Expected Goal Involvement" fill="#00FF87" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Captaincy Poll */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Community Captaincy Poll</CardTitle>
                  <CardDescription>
                    Based on votes from 18,234 managers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={captainPieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                        >
                          {captainPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value.toFixed(1)}%`, "Vote Share"]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Captaincy Picks Table */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Top Captaincy Picks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left">Rank</th>
                      <th className="px-4 py-3 text-left">Player</th>
                      <th className="px-4 py-3 text-left">Team</th>
                      <th className="px-4 py-3 text-left">Position</th>
                      <th className="px-4 py-3 text-right">Price</th>
                      <th className="px-4 py-3 text-center">Fixture</th>
                      <th className="px-4 py-3 text-center">Strength</th>
                      <th className="px-4 py-3 text-right">Vote %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {captaincyPicks.map((pick, index) => (
                      <tr key={pick.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-4 font-semibold">{index + 1}</td>
                        <td className="px-4 py-4 font-medium">{pick.name}</td>
                        <td className="px-4 py-4">{pick.team}</td>
                        <td className="px-4 py-4">{pick.position}</td>
                        <td className="px-4 py-4 text-right">£{pick.price.toFixed(1)}m</td>
                        <td className="px-4 py-4 text-center">{pick.opponent}</td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex items-center justify-center">
                            <div 
                              className="bg-gray-200 h-2 rounded-full w-24"
                            >
                              <div 
                                className="bg-pl-purple h-2 rounded-full" 
                                style={{ width: `${pick.strength}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm font-medium">{pick.strength}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right font-semibold">{pick.votes}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Top Picks By Position Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-pl-purple">Top Picks by Position</h2>
          
          <Tabs defaultValue="GKP" className="w-full">
            <TabsList className="mb-6 grid grid-cols-4 w-full">
              <TabsTrigger value="GKP" className="data-[state=active]:bg-pl-purple data-[state=active]:text-white">
                Goalkeepers
              </TabsTrigger>
              <TabsTrigger value="DEF" className="data-[state=active]:bg-pl-purple data-[state=active]:text-white">
                Defenders
              </TabsTrigger>
              <TabsTrigger value="MID" className="data-[state=active]:bg-pl-purple data-[state=active]:text-white">
                Midfielders
              </TabsTrigger>
              <TabsTrigger value="FWD" className="data-[state=active]:bg-pl-purple data-[state=active]:text-white">
                Forwards
              </TabsTrigger>
            </TabsList>
            
            {Object.entries(topPicks).map(([position, players]) => (
              <TabsContent key={position} value={position} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {players.map((player, index) => (
                    <Card key={player.id} className="overflow-hidden">
                      <div className="bg-pl-purple text-white py-2 px-4 text-center">
                        <span className="font-semibold">Rank {index + 1}</span>
                      </div>
                      <CardHeader>
                        <CardTitle>{player.name}</CardTitle>
                        <CardDescription>
                          {player.team} | {position} | £{player.price.toFixed(1)}m
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-sm text-gray-500">Form</div>
                            <div className="font-bold text-pl-purple text-xl">{player.form}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Points</div>
                            <div className="font-bold text-pl-purple text-xl">{player.points}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Next</div>
                            <div className="font-bold text-pl-purple text-xl">{player.opponent}</div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-gray-50 flex justify-center py-3">
                        <Button variant="default" className="w-full bg-pl-green text-pl-purple hover:bg-pl-green/90">
                          View Player
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        {/* Team of the Week Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-pl-purple">Team of the Week</h2>
          
          <Card>
            <CardHeader className="bg-pl-purple text-white">
              <CardTitle>Gameweek {gameweek === '38' ? '37' : gameweek} Dream Team</CardTitle>
              <CardDescription className="text-white/80">
                Based on expected points for the upcoming gameweek
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Formation visualization */}
              <div className="mt-6 mb-10 relative">
                {/* Football pitch backdrop */}
                <div className="bg-green-600 rounded-lg h-96 w-full relative overflow-hidden">
                  {/* Center circle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/40 rounded-full"></div>
                  {/* Center line */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-white/40"></div>
                  {/* Penalty areas */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-16 border-b-2 border-x-2 border-white/40"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-16 border-t-2 border-x-2 border-white/40"></div>
                  {/* Goal areas */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-6 border-b-2 border-x-2 border-white/40"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-6 border-t-2 border-x-2 border-white/40"></div>
                  
                  {/* Players positioning */}
                  <div className="absolute inset-0 flex flex-col">
                    {/* GK */}
                    <div className="flex justify-center mt-2">
                      <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                        <span className="font-bold text-xs">GK</span>
                      </div>
                    </div>
                    
                    {/* DEF */}
                    <div className="flex justify-around mt-10">
                      {teamOfTheWeek.filter(p => p.position === "DEF").map((player, idx) => (
                        <div key={idx} className="bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                          <span className="font-bold text-xs">DEF</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* MID */}
                    <div className="flex justify-around mt-auto mb-auto">
                      {teamOfTheWeek.filter(p => p.position === "MID").map((player, idx) => (
                        <div key={idx} className="bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                          <span className="font-bold text-xs">MID</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* FWD */}
                    <div className="flex justify-around mb-10">
                      {teamOfTheWeek.filter(p => p.position === "FWD").map((player, idx) => (
                        <div key={idx} className={`${player.captain ? 'bg-yellow-400' : 'bg-white'} rounded-full w-12 h-12 flex items-center justify-center shadow-lg`}>
                          <span className="font-bold text-xs">{player.captain ? 'C' : 'FWD'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Players table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left">Position</th>
                      <th className="px-4 py-3 text-left">Player</th>
                      <th className="px-4 py-3 text-left">Team</th>
                      <th className="px-4 py-3 text-right">Exp. Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamOfTheWeek.map((player, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">{player.position}</td>
                        <td className="px-4 py-3 font-medium flex items-center">
                          {player.name}
                          {player.captain && (
                            <Badge className="ml-2 bg-yellow-400 text-yellow-900">Captain</Badge>
                          )}
                        </td>
                        <td className="px-4 py-3">{player.team}</td>
                        <td className="px-4 py-3 text-right font-bold">
                          {player.captain ? player.points * 2 : player.points}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3" colSpan={3}>
                        <span className="font-semibold">Total</span>
                      </td>
                      <td className="px-4 py-3 text-right font-bold">
                        {teamOfTheWeek.reduce((total, player) => total + (player.captain ? player.points * 2 : player.points), 0)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 flex justify-between">
              <Button variant="outline">Previous GW</Button>
              <Button variant="outline">Next GW</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TopPicks;
