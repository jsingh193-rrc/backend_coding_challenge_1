import { calculateRating, gamesPlayed, findPlayerById } from './playerService';
import { Player } from '../models/playerModel';

describe('playerService', () => {

  describe('calculateRating', () => {

    it('should calculate rating correctly for a player with wins and losses', () => {
      // Arrange
      const player: Player = { id: 1, name: 'ShadowStrike', wins: 15, losses: 5, totalScore: 28500 };
      const expected = (15 / 20) * 100 + (28500 / 20);

      // Act
      const rating = calculateRating(player);

      // Assert
      expect(rating).toBe(Math.round(expected * 100) / 100);
    });

    it('should return 0 for a player with 0 games', () => {
      // Arrange
      const player: Player = { id: 3, name: 'ProGamer99', wins: 0, losses: 0, totalScore: 0 };

      // Act
      const rating = calculateRating(player);

      // Assert
      expect(rating).toBe(0);
    });

    it('should calculate rating correctly for a player with only wins', () => {
      // Arrange
      const player: Player = { id: 2, name: 'TestPlayer', wins: 10, losses: 0, totalScore: 5000 };
      const expected = (10 / 10) * 100 + (5000 / 10);

      // Act
      const rating = calculateRating(player);

      // Assert
      expect(rating).toBe(Math.round(expected * 100) / 100);
    });

    it('should round rating to 2 decimal places', () => {
      // Arrange
      const player: Player = { id: 4, name: 'RoundTest', wins: 7, losses: 3, totalScore: 3333 };

      // Act
      const rating = calculateRating(player);

      // Assert
      expect(rating).toBe(Math.round(rating * 100) / 100);
      expect(String(rating).split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
    });

  });

  describe('findPlayerById', () => {

    it('should find a player that exists', () => {
      // Arrange
      const playerId = 1;

      // Act
      const player = findPlayerById(playerId);

      // Assert
      expect(player).toBeDefined();
      expect(player?.name).toBe('ShadowStrike');
      expect(player?.id).toBe(1);
    });

    it('should return undefined for a player that does not exist', () => {
      // Arrange
      const playerId = 999;

      // Act
      const player = findPlayerById(playerId);

      // Assert
      expect(player).toBeUndefined();
    });

  });

});
