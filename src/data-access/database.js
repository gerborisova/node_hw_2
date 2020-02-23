import Sequelize from 'sequelize';
export default new Sequelize('myDB', 'postgres', 'Kaktus52', {
    dialect:'postgres',
    pool: { max:5,
        min:0,
        acquire:30000,
        idle:10000
    },
    define: {
        timestamps: false
    }
});
