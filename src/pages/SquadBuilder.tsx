
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Search, Save, ClipboardCopy, CheckCircle2, Download, ArrowRight, Filter, Clock, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { toast } from "@/components/ui/use-toast";

const SquadBuilder = () => {
  const [budget, setBudget] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [remainingBudget, setRemainingBudget] = useState(100.0);
  const [predictionPoints, setPredictionPoints] = useState(0);
  const [selectedPositionCounts, setSelectedPositionCounts] = useState({
    GKP: 0,
    DEF: 0,
    MID: 0,
    FWD: 0
  });

  // Mock players data
  const allPlayers = [
    // Goalkeepers
    { id: 1, name: "Alisson", team: "Liverpool", position: "GKP", price: 6.0, points: 9, form: 5.3, totalPoints: 162 },
    { id: 2, name: "Ederson", team: "Man City", position: "GKP", price: 5.8, points: 8, form: 5.0, totalPoints: 153 },
    { id: 3, name: "David Raya", team: "Arsenal", position: "GKP", price: 5.5, points: 8, form: 4.7, totalPoints: 158 },
    { id: 4, name: "Jordan Pickford", team: "Everton", position: "GKP", price: 4.8, points: 6, form: 4.2, totalPoints: 138 },
    { id: 5, name: "Robert Sánchez", team: "Chelsea", position: "GKP", price: 4.7, points: 7, form: 4.0, totalPoints: 125 },
    
    // Defenders
    { id: 6, name: "Virgil van Dijk", team: "Liverpool", position: "DEF", price: 6.5, points: 12, form: 6.8, totalPoints: 175 },
    { id: 7, name: "William Saliba", team: "Arsenal", position: "DEF", price: 6.3, points: 11, form: 6.5, totalPoints: 183 },
    { id: 8, name: "Joško Gvardiol", team: "Man City", position: "DEF", price: 5.8, points: 14, form: 7.2, totalPoints: 165 },
    { id: 9, name: "Trent Alexander-Arnold", team: "Liverpool", position: "DEF", price: 8.2, points: 10, form: 5.8, totalPoints: 168 },
    { id: 10, name: "Gabriel", team: "Arsenal", position: "DEF", price: 5.5, points: 9, form: 6.1, totalPoints: 162 },
    { id: 11, name: "Pervis Estupiñán", team: "Brighton", position: "DEF", price: 5.2, points: 8, form: 5.5, totalPoints: 139 },
    { id: 12, name: "Destiny Udogie", team: "Tottenham", position: "DEF", price: 4.8, points: 7, form: 4.8, totalPoints: 127 },
    { id: 13, name: "Antonee Robinson", team: "Fulham", position: "DEF", price: 4.6, points: 7, form: 4.3, totalPoints: 115 },
    
    // Midfielders
    { id: 14, name: "Mohamed Salah", team: "Liverpool", position: "MID", price: 13.2, points: 15, form: 8.2, totalPoints: 245 },
    { id: 15, name: "Bukayo Saka", team: "Arsenal", position: "MID", price: 10.5, points: 13, form: 9.1, totalPoints: 232 },
    { id: 16, name: "Cole Palmer", team: "Chelsea", position: "MID", price: 9.8, points: 12, form: 7.5, totalPoints: 227 },
    { id: 17, name: "Bruno Fernandes", team: "Man United", position: "MID", price: 8.7, points: 9, form: 6.3, totalPoints: 188 },
    { id: 18, name: "Kevin De Bruyne", team: "Man City", position: "MID", price: 10.7, points: 12, form: 6.9, totalPoints: 170 },
    { id: 19, name: "Son Heung-min", team: "Tottenham", position: "MID", price: 10.0, points: 10, form: 6.7, totalPoints: 208 },
    { id: 20, name: "Martin Ødegaard", team: "Arsenal", position: "MID", price: 8.8, points: 8, form: 5.9, totalPoints: 185 },
    { id: 21, name: "Bernardo Silva", team: "Man City", position: "MID", price: 7.5, points: 9, form: 6.2, totalPoints: 156 },
    { id: 22, name: "Luis Díaz", team: "Liverpool", position: "MID", price: 8.0, points: 9, form: 5.8, totalPoints: 161 },
    { id: 23, name: "Eberechi Eze", team: "Crystal Palace", position: "MID", price: 6.5, points: 7, form: 5.2, totalPoints: 148 },
    
    // Forwards
    { id: 24, name: "Erling Haaland", team: "Man City", position: "FWD", price: 14.0, points: 16, form: 7.8, totalPoints: 262 },
    { id: 25, name: "Alexander Isak", team: "Newcastle", position: "FWD", price: 8.8, points: 9, form: 7.1, totalPoints: 187 },
    { id: 26, name: "Dominic Solanke", team: "Tottenham", position: "FWD", price: 7.5, points: 8, form: 6.8, totalPoints: 168 },
    { id: 27, name: "Nicolas Jackson", team: "Chelsea", position: "FWD", price: 7.3, points: 8, form: 6.2, totalPoints: 150 },
    { id: 28, name: "Ollie Watkins", team: "Aston Villa", position: "FWD", price: 9.2, points: 11, form: 7.3, totalPoints: 195 },
    { id: 29, name: "Darwin Núñez", team: "Liverpool", position: "FWD", price: 8.0, points: 8, form: 5.8, totalPoints: 142 },
  ];

  // Filter players based on search term and position filter
  const filteredPlayers = allPlayers.filter(player => {
    // Filter by search term
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        player.team.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by position
    const matchesPosition = positionFilter === 'all' || player.position === positionFilter;
    
    // Filter out already selected players
    const notSelected = !selectedTeam.some(selectedPlayer => selectedPlayer.id === player.id);
    
    return matchesSearch && matchesPosition && notSelected;
  });

  // Function to add player to selected team
  const addPlayer = (player) => {
    // Check if we can add more players of this position
    const maxPlayers = {
      GKP: 2,
      DEF: 5,
      MID: 5,
      FWD: 3
    };
    
    if (selectedTeam.length >= 15) {
      toast({
        title: "Squad Full",
        description: "You can only select 15 players.",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedPositionCounts[player.position] >= maxPlayers[player.position]) {
      toast({
        title: `Too many ${player.position}s`,
        description: `You can only select ${maxPlayers[player.position]} ${player.position}s.`,
        variant: "destructive"
      });
      return;
    }
    
    // Check if enough budget
    if (player.price > remainingBudget) {
      toast({
        title: "Insufficient Budget",
        description: `You don't have enough budget to add ${player.name}.`,
        variant: "destructive"
      });
      return;
    }
    
    // Add player to selected team
    setSelectedTeam([...selectedTeam, player]);
    setRemainingBudget(parseFloat((remainingBudget - player.price).toFixed(1)));
    setSelectedPositionCounts({
      ...selectedPositionCounts,
      [player.position]: selectedPositionCounts[player.position] + 1
    });
    
    // Update prediction points
    setPredictionPoints(predictionPoints + player.points);
  };

  // Function to remove player from selected team
  const removePlayer = (playerId) => {
    const playerToRemove = selectedTeam.find(p => p.id === playerId);
    if (!playerToRemove) return;
    
    setSelectedTeam(selectedTeam.filter(player => player.id !== playerId));
    setRemainingBudget(parseFloat((remainingBudget + playerToRemove.price).toFixed(1)));
    setSelectedPositionCounts({
      ...selectedPositionCounts,
      [playerToRemove.position]: selectedPositionCounts[playerToRemove.position] - 1
    });
    
    // Update prediction points
    setPredictionPoints(predictionPoints - playerToRemove.points);
  };

  // Function to save team
  const saveTeam = () => {
    toast({
      title: "Team Saved",
      description: "Your fantasy team has been saved successfully.",
      action: (
        <Button className="bg-pl-green text-pl-purple">
          <CheckCircle2 className="h-4 w-4 mr-1" /> OK
        </Button>
      ),
    });
  };

  // Function to copy team link
  const copyTeamLink = () => {
    // In a real app, generate a shareable link here
    navigator.clipboard.writeText("https://fantasawy.com/shared-team/abc123");
    toast({
      title: "Link Copied",
      description: "Shareable team link copied to clipboard.",
    });
  };

  // Group selected players by position for display
  const selectedGKP = selectedTeam.filter(p => p.position === 'GKP');
  const selectedDEF = selectedTeam.filter(p => p.position === 'DEF');
  const selectedMID = selectedTeam.filter(p => p.position === 'MID');
  const selectedFWD = selectedTeam.filter(p => p.position === 'FWD');

  // Using Pitch visualization based on 3-4-3 formation
  const getPitchLayout = () => {
    // Default to 3-4-3 visual layout (or adapt based on selected players)
    const gkps = selectedGKP.slice(0, 1); // Show only the first goalkeeper
    const defs = selectedDEF.slice(0, 3); // Show only first 3 defenders
    const mids = selectedMID.slice(0, 4); // Show only first 4 midfielders
    const fwds = selectedFWD.slice(0, 3); // Show only first 3 forwards
    
    return { gkps, defs, mids, fwds };
  };

  const pitchLayout = getPitchLayout();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="pl-section-title mb-6 text-3xl">Fantasy Squad Builder</h1>
        
        {/* Squad Budget Controls */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Squad Settings</span>
              <Badge 
                variant={remainingBudget >= 0 ? "outline" : "destructive"}
                className={remainingBudget >= 0 ? "bg-green-100 text-green-800 border-green-200" : ""}
              >
                £{remainingBudget.toFixed(1)}m Remaining
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Budget (£{budget}m)
                </label>
                <Slider
                  defaultValue={[100]}
                  min={80}
                  max={120}
                  step={0.5}
                  onValueChange={(value) => {
                    setBudget(value[0]);
                    setRemainingBudget(value[0] - (budget - remainingBudget));
                  }}
                  className="my-4"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-3 text-center">
                <div>
                  <div className="text-sm text-gray-500">GKP</div>
                  <div className={`font-bold text-lg ${selectedPositionCounts.GKP === 2 ? 'text-green-600' : 'text-gray-700'}`}>
                    {selectedPositionCounts.GKP}/2
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">DEF</div>
                  <div className={`font-bold text-lg ${selectedPositionCounts.DEF === 5 ? 'text-green-600' : 'text-gray-700'}`}>
                    {selectedPositionCounts.DEF}/5
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">MID</div>
                  <div className={`font-bold text-lg ${selectedPositionCounts.MID === 5 ? 'text-green-600' : 'text-gray-700'}`}>
                    {selectedPositionCounts.MID}/5
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">FWD</div>
                  <div className={`font-bold text-lg ${selectedPositionCounts.FWD === 3 ? 'text-green-600' : 'text-gray-700'}`}>
                    {selectedPositionCounts.FWD}/3
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Main Squad Builder Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Players Selection */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card>
              <CardHeader>
                <CardTitle>Add Players</CardTitle>
                <CardDescription>
                  Select players for your squad ({selectedTeam.length}/15)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <Input
                      placeholder="Search players..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    <Button
                      size="sm"
                      variant={positionFilter === 'all' ? "default" : "outline"}
                      className={positionFilter === 'all' ? "bg-pl-purple text-white" : ""}
                      onClick={() => setPositionFilter('all')}
                    >
                      All
                    </Button>
                    <Button
                      size="sm"
                      variant={positionFilter === 'GKP' ? "default" : "outline"}
                      className={positionFilter === 'GKP' ? "bg-pl-purple text-white" : ""}
                      onClick={() => setPositionFilter('GKP')}
                    >
                      GKP
                    </Button>
                    <Button
                      size="sm"
                      variant={positionFilter === 'DEF' ? "default" : "outline"}
                      className={positionFilter === 'DEF' ? "bg-pl-purple text-white" : ""}
                      onClick={() => setPositionFilter('DEF')}
                    >
                      DEF
                    </Button>
                    <Button
                      size="sm"
                      variant={positionFilter === 'MID' ? "default" : "outline"}
                      className={positionFilter === 'MID' ? "bg-pl-purple text-white" : ""}
                      onClick={() => setPositionFilter('MID')}
                    >
                      MID
                    </Button>
                    <Button
                      size="sm"
                      variant={positionFilter === 'FWD' ? "default" : "outline"}
                      className={positionFilter === 'FWD' ? "bg-pl-purple text-white" : ""}
                      onClick={() => setPositionFilter('FWD')}
                    >
                      FWD
                    </Button>
                  </div>
                </div>
                
                <div className="max-h-[500px] overflow-y-auto space-y-2">
                  {filteredPlayers.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-gray-100">{player.position}</Badge>
                          <span className="font-medium">{player.name}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{player.team}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-semibold">£{player.price}m</div>
                          <div className="text-xs text-gray-500">Pts: {player.points}</div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => addPlayer(player)}
                          className="bg-pl-green text-pl-purple hover:bg-pl-green/90"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {filteredPlayers.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No players match your search criteria.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Team Visualization */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Team</CardTitle>
                <CardDescription className="flex justify-between items-center">
                  <span>Points Prediction: {predictionPoints}</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={saveTeam}
                    >
                      <Save size={14} /> Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={copyTeamLink}
                    >
                      <ClipboardCopy size={14} /> Share
                    </Button>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Football pitch visualization */}
                <div className="bg-green-600 rounded-lg mb-6 h-96 relative overflow-hidden border-2 border-white">
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
                  {selectedTeam.length > 0 ? (
                    <div className="absolute inset-0 flex flex-col">
                      {/* GK row */}
                      <div className="flex justify-center mt-4">
                        {pitchLayout.gkps.map((player) => (
                          <button
                            key={player.id}
                            onClick={() => removePlayer(player.id)}
                            className="bg-white rounded-lg w-20 h-20 flex flex-col items-center justify-center shadow-lg m-1 hover:bg-red-100 transition-colors"
                          >
                            <div className="text-xs bg-green-700 text-white w-full text-center rounded-t-lg py-0.5">GKP</div>
                            <div className="font-semibold text-sm mt-1">{player.name}</div>
                            <div className="text-xs text-gray-600">{player.points} pts</div>
                            <div className="text-xs font-semibold text-green-700">£{player.price}m</div>
                          </button>
                        ))}
                      </div>
                      
                      {/* DEF row */}
                      <div className="flex justify-around mt-8">
                        {pitchLayout.defs.map((player) => (
                          <button
                            key={player.id}
                            onClick={() => removePlayer(player.id)}
                            className="bg-white rounded-lg w-20 h-20 flex flex-col items-center justify-center shadow-lg m-1 hover:bg-red-100 transition-colors"
                          >
                            <div className="text-xs bg-blue-700 text-white w-full text-center rounded-t-lg py-0.5">DEF</div>
                            <div className="font-semibold text-sm mt-1">{player.name}</div>
                            <div className="text-xs text-gray-600">{player.points} pts</div>
                            <div className="text-xs font-semibold text-green-700">£{player.price}m</div>
                          </button>
                        ))}
                      </div>
                      
                      {/* MID row */}
                      <div className="flex justify-around mt-6">
                        {pitchLayout.mids.map((player) => (
                          <button
                            key={player.id}
                            onClick={() => removePlayer(player.id)}
                            className="bg-white rounded-lg w-20 h-20 flex flex-col items-center justify-center shadow-lg m-1 hover:bg-red-100 transition-colors"
                          >
                            <div className="text-xs bg-yellow-500 text-white w-full text-center rounded-t-lg py-0.5">MID</div>
                            <div className="font-semibold text-sm mt-1">{player.name}</div>
                            <div className="text-xs text-gray-600">{player.points} pts</div>
                            <div className="text-xs font-semibold text-green-700">£{player.price}m</div>
                          </button>
                        ))}
                      </div>
                      
                      {/* FWD row */}
                      <div className="flex justify-around mt-auto mb-8">
                        {pitchLayout.fwds.map((player) => (
                          <button
                            key={player.id}
                            onClick={() => removePlayer(player.id)}
                            className="bg-white rounded-lg w-20 h-20 flex flex-col items-center justify-center shadow-lg m-1 hover:bg-red-100 transition-colors"
                          >
                            <div className="text-xs bg-red-700 text-white w-full text-center rounded-t-lg py-0.5">FWD</div>
                            <div className="font-semibold text-sm mt-1">{player.name}</div>
                            <div className="text-xs text-gray-600">{player.points} pts</div>
                            <div className="text-xs font-semibold text-green-700">£{player.price}m</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-white bg-black/30 p-6 rounded-lg backdrop-blur-sm">
                        <Users size={40} className="mx-auto mb-2" />
                        <p className="text-lg font-medium">Build Your Team</p>
                        <p className="text-sm">Add players from the left panel</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Selected players by position */}
                <Tabs defaultValue="all">
                  <TabsList className="grid grid-cols-5 mb-4">
                    <TabsTrigger value="all" className="data-[state=active]:bg-pl-green data-[state=active]:text-pl-purple">
                      All ({selectedTeam.length})
                    </TabsTrigger>
                    <TabsTrigger value="gkp" className="data-[state=active]:bg-pl-green data-[state=active]:text-pl-purple">
                      GKP ({selectedGKP.length})
                    </TabsTrigger>
                    <TabsTrigger value="def" className="data-[state=active]:bg-pl-green data-[state=active]:text-pl-purple">
                      DEF ({selectedDEF.length})
                    </TabsTrigger>
                    <TabsTrigger value="mid" className="data-[state=active]:bg-pl-green data-[state=active]:text-pl-purple">
                      MID ({selectedMID.length})
                    </TabsTrigger>
                    <TabsTrigger value="fwd" className="data-[state=active]:bg-pl-green data-[state=active]:text-pl-purple">
                      FWD ({selectedFWD.length})
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="text-xs uppercase bg-gray-50 text-gray-600">
                          <tr>
                            <th className="px-2 py-2 text-left">Pos</th>
                            <th className="px-2 py-2 text-left">Name</th>
                            <th className="px-2 py-2 text-left">Team</th>
                            <th className="px-2 py-2 text-right">Price</th>
                            <th className="px-2 py-2 text-center">Points</th>
                            <th className="px-2 py-2 text-right">Form</th>
                            <th className="px-2 py-2 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedTeam.map((player) => (
                            <tr key={player.id} className="border-t hover:bg-gray-50">
                              <td className="px-2 py-2">
                                <Badge variant="outline">{player.position}</Badge>
                              </td>
                              <td className="px-2 py-2 font-medium">{player.name}</td>
                              <td className="px-2 py-2">{player.team}</td>
                              <td className="px-2 py-2 text-right">£{player.price}m</td>
                              <td className="px-2 py-2 text-center">{player.points}</td>
                              <td className="px-2 py-2 text-right">{player.form}</td>
                              <td className="px-2 py-2 text-center">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="hover:bg-red-100 hover:text-red-700 hover:border-red-300"
                                  onClick={() => removePlayer(player.id)}
                                >
                                  Remove
                                </Button>
                              </td>
                            </tr>
                          ))}
                          
                          {selectedTeam.length === 0 && (
                            <tr>
                              <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                                No players selected yet.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="gkp">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="text-xs uppercase bg-gray-50 text-gray-600">
                          <tr>
                            <th className="px-2 py-2 text-left">Name</th>
                            <th className="px-2 py-2 text-left">Team</th>
                            <th className="px-2 py-2 text-right">Price</th>
                            <th className="px-2 py-2 text-center">Points</th>
                            <th className="px-2 py-2 text-right">Form</th>
                            <th className="px-2 py-2 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedGKP.map((player) => (
                            <tr key={player.id} className="border-t hover:bg-gray-50">
                              <td className="px-2 py-2 font-medium">{player.name}</td>
                              <td className="px-2 py-2">{player.team}</td>
                              <td className="px-2 py-2 text-right">£{player.price}m</td>
                              <td className="px-2 py-2 text-center">{player.points}</td>
                              <td className="px-2 py-2 text-right">{player.form}</td>
                              <td className="px-2 py-2 text-center">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="hover:bg-red-100 hover:text-red-700 hover:border-red-300"
                                  onClick={() => removePlayer(player.id)}
                                >
                                  Remove
                                </Button>
                              </td>
                            </tr>
                          ))}
                          
                          {selectedGKP.length === 0 && (
                            <tr>
                              <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                No goalkeepers selected yet.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="def">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="text-xs uppercase bg-gray-50 text-gray-600">
                          <tr>
                            <th className="px-2 py-2 text-left">Name</th>
                            <th className="px-2 py-2 text-left">Team</th>
                            <th className="px-2 py-2 text-right">Price</th>
                            <th className="px-2 py-2 text-center">Points</th>
                            <th className="px-2 py-2 text-right">Form</th>
                            <th className="px-2 py-2 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedDEF.map((player) => (
                            <tr key={player.id} className="border-t hover:bg-gray-50">
                              <td className="px-2 py-2 font-medium">{player.name}</td>
                              <td className="px-2 py-2">{player.team}</td>
                              <td className="px-2 py-2 text-right">£{player.price}m</td>
                              <td className="px-2 py-2 text-center">{player.points}</td>
                              <td className="px-2 py-2 text-right">{player.form}</td>
                              <td className="px-2 py-2 text-center">
                                <Button 
                                  size="sm"
                                  variant="outline"
                                  className="hover:bg-red-100 hover:text-red-700 hover:border-red-300"
                                  onClick={() => removePlayer(player.id)}
                                >
                                  Remove
                                </Button>
                              </td>
                            </tr>
                          ))}
                          
                          {selectedDEF.length === 0 && (
                            <tr>
                              <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                No defenders selected yet.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="mid">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="text-xs uppercase bg-gray-50 text-gray-600">
                          <tr>
                            <th className="px-2 py-2 text-left">Name</th>
                            <th className="px-2 py-2 text-left">Team</th>
                            <th className="px-2 py-2 text-right">Price</th>
                            <th className="px-2 py-2 text-center">Points</th>
                            <th className="px-2 py-2 text-right">Form</th>
                            <th className="px-2 py-2 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedMID.map((player) => (
                            <tr key={player.id} className="border-t hover:bg-gray-50">
                              <td className="px-2 py-2 font-medium">{player.name}</td>
                              <td className="px-2 py-2">{player.team}</td>
                              <td className="px-2 py-2 text-right">£{player.price}m</td>
                              <td className="px-2 py-2 text-center">{player.points}</td>
                              <td className="px-2 py-2 text-right">{player.form}</td>
                              <td className="px-2 py-2 text-center">
                                <Button 
                                  size="sm"
                                  variant="outline"
                                  className="hover:bg-red-100 hover:text-red-700 hover:border-red-300"
                                  onClick={() => removePlayer(player.id)}
                                >
                                  Remove
                                </Button>
                              </td>
                            </tr>
                          ))}
                          
                          {selectedMID.length === 0 && (
                            <tr>
                              <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                No midfielders selected yet.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="fwd">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="text-xs uppercase bg-gray-50 text-gray-600">
                          <tr>
                            <th className="px-2 py-2 text-left">Name</th>
                            <th className="px-2 py-2 text-left">Team</th>
                            <th className="px-2 py-2 text-right">Price</th>
                            <th className="px-2 py-2 text-center">Points</th>
                            <th className="px-2 py-2 text-right">Form</th>
                            <th className="px-2 py-2 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedFWD.map((player) => (
                            <tr key={player.id} className="border-t hover:bg-gray-50">
                              <td className="px-2 py-2 font-medium">{player.name}</td>
                              <td className="px-2 py-2">{player.team}</td>
                              <td className="px-2 py-2 text-right">£{player.price}m</td>
                              <td className="px-2 py-2 text-center">{player.points}</td>
                              <td className="px-2 py-2 text-right">{player.form}</td>
                              <td className="px-2 py-2 text-center">
                                <Button 
                                  size="sm"
                                  variant="outline"
                                  className="hover:bg-red-100 hover:text-red-700 hover:border-red-300"
                                  onClick={() => removePlayer(player.id)}
                                >
                                  Remove
                                </Button>
                              </td>
                            </tr>
                          ))}
                          
                          {selectedFWD.length === 0 && (
                            <tr>
                              <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                No forwards selected yet.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquadBuilder;
