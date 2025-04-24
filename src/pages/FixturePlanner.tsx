
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';

const FixturePlanner = () => {
  const [teamFilter, setTeamFilter] = useState('all');
  const [planner, setPlanner] = useState(Array(20).fill(false)); // Track which teams are in your planner
  const [viewMode, setViewMode] = useState('difficulty'); // 'difficulty' or 'planner'
  
  // Mock team data
  const teams = [
    { id: 1, name: "Arsenal", shortName: "ARS", color: "#EF0107", bgcolor: "#EF0107" },
    { id: 2, name: "Aston Villa", shortName: "AVL", color: "#95BFE5", bgcolor: "#670E36" },
    { id: 3, name: "Bournemouth", shortName: "BOU", color: "#000000", bgcolor: "#DA291C" },
    { id: 4, name: "Brentford", shortName: "BRE", color: "#000000", bgcolor: "#E30613" },
    { id: 5, name: "Brighton", shortName: "BHA", color: "#0057B8", bgcolor: "#0057B8" },
    { id: 6, name: "Chelsea", shortName: "CHE", color: "#034694", bgcolor: "#034694" },
    { id: 7, name: "Crystal Palace", shortName: "CRY", color: "#1B458F", bgcolor: "#1B458F" },
    { id: 8, name: "Everton", shortName: "EVE", color: "#003399", bgcolor: "#003399" },
    { id: 9, name: "Fulham", shortName: "FUL", color: "#000000", bgcolor: "#FFFFFF" },
    { id: 10, name: "Liverpool", shortName: "LIV", color: "#C8102E", bgcolor: "#C8102E" },
    { id: 11, name: "Man City", shortName: "MCI", color: "#6CABDD", bgcolor: "#6CABDD" },
    { id: 12, name: "Man United", shortName: "MUN", color: "#DA291C", bgcolor: "#DA291C" },
    { id: 13, name: "Newcastle", shortName: "NEW", color: "#241F21", bgcolor: "#FFFFFF" },
    { id: 14, name: "Nottm Forest", shortName: "NFO", color: "#DD0000", bgcolor: "#DD0000" },
    { id: 15, name: "Southampton", shortName: "SOU", color: "#D71920", bgcolor: "#D71920" },
    { id: 16, name: "Tottenham", shortName: "TOT", color: "#132257", bgcolor: "#132257" },
    { id: 17, name: "West Ham", shortName: "WHU", color: "#7A263A", bgcolor: "#7A263A" },
    { id: 18, name: "Wolves", shortName: "WOL", color: "#FDB913", bgcolor: "#231F20" },
    { id: 19, name: "Leicester", shortName: "LEI", color: "#003090", bgcolor: "#FDBE11" },
    { id: 20, name: "Ipswich", shortName: "IPS", color: "#0044A9", bgcolor: "#0044A9" }
  ];
  
  // Mock fixture data with difficulty ratings (1-5, 1 = easiest, 5 = hardest)
  const gameweeks = Array.from({ length: 6 }, (_, i) => i + 1);
  
  const fixtures = teams.map(team => ({
    teamId: team.id,
    teamName: team.name,
    shortName: team.shortName,
    color: team.color,
    bgcolor: team.bgcolor,
    fixtures: [
      { 
        gw: 1, 
        opponent: teams[(team.id + 3) % 20].shortName,
        isHome: team.id % 2 === 0,
        difficulty: team.id % 5 + 1
      },
      { 
        gw: 2, 
        opponent: teams[(team.id + 7) % 20].shortName,
        isHome: team.id % 2 !== 0,
        difficulty: ((team.id + 2) % 5) + 1
      },
      { 
        gw: 3, 
        opponent: teams[(team.id + 11) % 20].shortName,
        isHome: team.id % 2 === 0,
        difficulty: ((team.id + 1) % 5) + 1
      },
      { 
        gw: 4, 
        opponent: teams[(team.id + 5) % 20].shortName,
        isHome: team.id % 2 !== 0,
        difficulty: ((team.id + 3) % 5) + 1
      },
      { 
        gw: 5, 
        opponent: teams[(team.id + 9) % 20].shortName,
        isHome: team.id % 2 === 0,
        difficulty: ((team.id + 4) % 5) + 1
      },
      { 
        gw: 6, 
        opponent: teams[(team.id + 1) % 20].shortName,
        isHome: team.id % 2 !== 0,
        difficulty: ((team.id) % 5) + 1
      }
    ]
  }));
  
  const toggleTeamInPlanner = (teamId) => {
    const newPlanner = [...planner];
    newPlanner[teamId - 1] = !newPlanner[teamId - 1];
    setPlanner(newPlanner);
  };

  const filteredTeams = teamFilter === 'all' 
    ? fixtures 
    : viewMode === 'planner' 
      ? fixtures.filter((team) => planner[team.teamId - 1])
      : fixtures.filter((team) => team.shortName.includes(teamFilter));

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 1: return 'bg-green-500 text-white';
      case 2: return 'bg-green-300 text-gray-800';
      case 3: return 'bg-gray-200 text-gray-800';
      case 4: return 'bg-red-300 text-gray-800';
      case 5: return 'bg-red-500 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="pl-section-title mb-6 text-3xl">Fixture Difficulty & Planner</h1>
        
        {/* Filters & Controls */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative w-full md:w-64">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Filter teams..."
                  className="pl-10"
                  onChange={(e) => setTeamFilter(e.target.value ? e.target.value.toUpperCase() : 'all')}
                />
              </div>
              
              <Button 
                variant={viewMode === 'difficulty' ? "default" : "outline"} 
                onClick={() => setViewMode('difficulty')}
                className={viewMode === 'difficulty' ? "bg-pl-purple text-white" : ""}
              >
                Fixture Difficulty
              </Button>
              
              <Button 
                variant={viewMode === 'planner' ? "default" : "outline"} 
                onClick={() => setViewMode('planner')}
                className={viewMode === 'planner' ? "bg-pl-purple text-white" : ""}
              >
                My Planner ({planner.filter(Boolean).length})
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Download size={16} /> Export
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 size={16} /> Share
              </Button>
            </div>
          </div>
        </div>
        
        {/* Fixture Difficulty Legend */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Difficulty Rating</h3>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-green-500 text-white">1 - Very Easy</Badge>
            <Badge className="bg-green-300 text-gray-800">2 - Easy</Badge>
            <Badge className="bg-gray-200 text-gray-800">3 - Medium</Badge>
            <Badge className="bg-red-300 text-gray-800">4 - Difficult</Badge>
            <Badge className="bg-red-500 text-white">5 - Very Difficult</Badge>
          </div>
        </div>
        
        {/* Fixture Table */}
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left sticky left-0 bg-white z-10">Team</th>
                    {gameweeks.map(gw => (
                      <th key={gw} className="px-4 py-3 text-center">
                        GW {gw}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-center">
                      AVG
                    </th>
                    {viewMode === 'difficulty' && (
                      <th className="px-4 py-3 text-center">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredTeams.map((team) => (
                    <tr key={team.teamId} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-4 font-medium sticky left-0 bg-white z-10">
                        <div className="flex items-center">
                          <div 
                            className="w-6 h-6 rounded-full mr-2" 
                            style={{ backgroundColor: team.bgcolor, color: team.color === "#FFFFFF" ? "#000000" : team.color }}
                          >
                          </div>
                          <span>{team.teamName}</span>
                        </div>
                      </td>
                      {team.fixtures.map((fixture) => (
                        <td 
                          key={`${team.teamId}-${fixture.gw}`} 
                          className={`px-4 py-4 text-center ${getDifficultyColor(fixture.difficulty)}`}
                        >
                          <div className="text-sm">
                            {fixture.isHome ? fixture.opponent : `${fixture.opponent} (A)`}
                          </div>
                        </td>
                      ))}
                      <td className="px-4 py-4 text-center font-semibold">
                        {(team.fixtures.reduce((acc, f) => acc + f.difficulty, 0) / team.fixtures.length).toFixed(1)}
                      </td>
                      {viewMode === 'difficulty' && (
                        <td className="px-4 py-4 text-center">
                          <Button 
                            variant={planner[team.teamId - 1] ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleTeamInPlanner(team.teamId)}
                            className={planner[team.teamId - 1] ? "bg-pl-green text-pl-purple" : ""}
                          >
                            {planner[team.teamId - 1] ? 'In Planner' : 'Add to Planner'}
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredTeams.length === 0 && viewMode === 'planner' && (
                <div className="py-12 text-center">
                  <p className="text-gray-500">No teams in your planner yet. Add teams from the Fixture Difficulty view.</p>
                  <Button 
                    onClick={() => setViewMode('difficulty')} 
                    className="mt-4 bg-pl-purple text-white"
                  >
                    Go to Fixture Difficulty
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Fixture Analysis */}
        {filteredTeams.length > 0 && viewMode === 'planner' && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Planner Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {gameweeks.map(gw => (
                  <div key={gw} className="border-b pb-4 last:border-b-0">
                    <h3 className="text-lg font-semibold mb-2">Gameweek {gw}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Best fixtures */}
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Best Fixtures</h4>
                        <ul className="space-y-2">
                          {filteredTeams
                            .filter(t => planner[t.teamId - 1])
                            .map(t => t.fixtures.find(f => f.gw === gw))
                            .filter(fixture => fixture?.difficulty <= 2)
                            .map((fixture, index) => {
                              const team = filteredTeams.find(t => 
                                t.fixtures.some(f => f.gw === gw && f === fixture)
                              );
                              return team && (
                                <li key={index} className="flex items-center text-sm">
                                  <div 
                                    className="w-3 h-3 rounded-full mr-2" 
                                    style={{ backgroundColor: team.bgcolor }}
                                  ></div>
                                  <span className="font-medium">{team.teamName}</span>
                                  <span className="mx-1">vs</span>
                                  <span>{fixture.opponent} ({fixture.isHome ? 'H' : 'A'})</span>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                      
                      {/* Medium fixtures */}
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Medium Fixtures</h4>
                        <ul className="space-y-2">
                          {filteredTeams
                            .filter(t => planner[t.teamId - 1])
                            .map(t => t.fixtures.find(f => f.gw === gw))
                            .filter(fixture => fixture?.difficulty === 3)
                            .map((fixture, index) => {
                              const team = filteredTeams.find(t => 
                                t.fixtures.some(f => f.gw === gw && f === fixture)
                              );
                              return team && (
                                <li key={index} className="flex items-center text-sm">
                                  <div 
                                    className="w-3 h-3 rounded-full mr-2" 
                                    style={{ backgroundColor: team.bgcolor }}
                                  ></div>
                                  <span className="font-medium">{team.teamName}</span>
                                  <span className="mx-1">vs</span>
                                  <span>{fixture.opponent} ({fixture.isHome ? 'H' : 'A'})</span>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                      
                      {/* Difficult fixtures */}
                      <div className="p-4 bg-red-50 rounded-lg">
                        <h4 className="font-semibold text-red-800 mb-2">Difficult Fixtures</h4>
                        <ul className="space-y-2">
                          {filteredTeams
                            .filter(t => planner[t.teamId - 1])
                            .map(t => t.fixtures.find(f => f.gw === gw))
                            .filter(fixture => fixture?.difficulty >= 4)
                            .map((fixture, index) => {
                              const team = filteredTeams.find(t => 
                                t.fixtures.some(f => f.gw === gw && f === fixture)
                              );
                              return team && (
                                <li key={index} className="flex items-center text-sm">
                                  <div 
                                    className="w-3 h-3 rounded-full mr-2" 
                                    style={{ backgroundColor: team.bgcolor }}
                                  ></div>
                                  <span className="font-medium">{team.teamName}</span>
                                  <span className="mx-1">vs</span>
                                  <span>{fixture.opponent} ({fixture.isHome ? 'H' : 'A'})</span>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Team Rotation Suggestions */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Team Rotation Suggestions</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    These team combinations have complementary fixtures for rotation:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Rotation Pair 1 */}
                    <div className="bg-white border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        {filteredTeams.slice(0, 2).map((team, index) => (
                          <div key={index} className="flex items-center">
                            <div 
                              className="w-4 h-4 rounded-full mr-1" 
                              style={{ backgroundColor: team.bgcolor }}
                            ></div>
                            <span className="font-medium">{team.teamName}</span>
                            {index === 0 && <span className="mx-1">+</span>}
                          </div>
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">
                        Good rotation options with 100% fixture coverage at difficulty rating ≤ 3.
                      </div>
                    </div>
                    
                    {/* Rotation Pair 2 */}
                    <div className="bg-white border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        {filteredTeams.slice(2, 4).map((team, index) => (
                          <div key={index} className="flex items-center">
                            <div 
                              className="w-4 h-4 rounded-full mr-1" 
                              style={{ backgroundColor: team.bgcolor }}
                            ></div>
                            <span className="font-medium">{team.teamName}</span>
                            {index === 0 && <span className="mx-1">+</span>}
                          </div>
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">
                        Strong rotation for home fixtures with 83% home games in next 6 GWs.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FixturePlanner;
