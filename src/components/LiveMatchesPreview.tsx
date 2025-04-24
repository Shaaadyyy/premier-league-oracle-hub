
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const LiveMatchesPreview = () => {
  // Mock data for live matches
  const liveMatches = [
    {
      id: 1,
      homeTeam: "Arsenal",
      awayTeam: "Liverpool",
      homeScore: 2,
      awayScore: 1,
      time: "73'",
      status: "LIVE",
      homeScorers: ["Saka (23')", "Martinelli (56')"],
      awayScorers: ["Salah (34')"],
    },
    {
      id: 2,
      homeTeam: "Man City",
      awayTeam: "Chelsea",
      homeScore: 0,
      awayScore: 0,
      time: "18'",
      status: "LIVE",
      homeScorers: [],
      awayScorers: [],
    },
    {
      id: 3,
      homeTeam: "Tottenham",
      awayTeam: "Man United",
      homeScore: 0,
      awayScore: 0,
      time: "Pre",
      status: "TODAY",
      kickoff: "17:30",
      homeScorers: [],
      awayScorers: [],
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {liveMatches.map((match) => (
        <div key={match.id} className={`match-card ${match.status === 'LIVE' ? 'border-red-500' : 'border-gray-200'}`}>
          {match.status === 'LIVE' && (
            <Badge variant="destructive" className="absolute -top-2 -right-2">
              LIVE
            </Badge>
          )}
          
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-500">
                {match.status === 'LIVE' ? match.time : match.kickoff}
              </span>
            </div>
            <div>
              <Badge variant="outline" className={match.status === 'LIVE' ? 'bg-red-100 text-red-800 border-red-200' : 'bg-gray-100'}>
                {match.status}
              </Badge>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1">
              <p className="font-bold text-lg">{match.homeTeam}</p>
            </div>
            
            <div className="flex items-center justify-center px-3">
              {match.status === 'LIVE' || match.status === 'FT' ? (
                <div className="text-xl font-bold">
                  {match.homeScore} - {match.awayScore}
                </div>
              ) : (
                <div className="text-sm font-medium text-gray-400">vs</div>
              )}
            </div>
            
            <div className="flex-1 text-right">
              <p className="font-bold text-lg">{match.awayTeam}</p>
            </div>
          </div>
          
          {match.status === 'LIVE' && (
            <div className="mb-4">
              <div className="text-sm">
                <div className="mb-1">
                  <span className="font-medium">Home:</span> {match.homeScorers.length > 0 ? match.homeScorers.join(', ') : 'No goals'}
                </div>
                <div>
                  <span className="font-medium">Away:</span> {match.awayScorers.length > 0 ? match.awayScorers.join(', ') : 'No goals'}
                </div>
              </div>
            </div>
          )}
          
          <Button variant="outline" className="w-full border-pl-purple/20 hover:bg-gray-200">
            {match.status === 'LIVE' ? 'View Match Details' : 'Set Reminder'}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default LiveMatchesPreview;
