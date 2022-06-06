'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      homeTeam: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'home_team',
        references: { model: 'teams', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        field: 'home_team_goals',
      },
      awayTeam: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'away_team',
        references: { model: 'teams', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        field: 'away_team_goals',
      },
      inProgress: {
        type: Sequelize.TINYINT,
        field: 'in_progress',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
