const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.renameColumn('active_sessions', 'expires', 'expires_at')
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.renameColumn('active_sessions', 'expires_at', 'expires')
  },
}