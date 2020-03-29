import Sequelize from 'sequelize';

export default new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
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
