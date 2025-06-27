export interface Player {
  name: string; // Uniquely identifies a player
}

export interface Game {
  date: string;
  playedFactions: Map<string, string>; // Maps from Player name to Faction name
  winnersName: string;
}

export interface Faction {
  name: string; // Uniquely identifies a faction
}

export interface PlayerStatistics {
  owner: Player;
  numberOfGames: number;
  numberOfVictories: number;
}

export interface CampaignInfo {
  id: string;
  registrationDate: string;
  passwordHash: string;
}
