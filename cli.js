require('dotenv').config()
const { Sequelize, QueryTypes, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize(encodeURI(process.env.PGHOST), {logging: false})

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author:{
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title:{
    type: DataTypes.TEXT,
    allowNull:false
  },
  likes:{
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
},
{
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

const main = async () => {
  try {

    await sequelize.authenticate()
    const blogs = await Blog.findAll()
    blogs.map(blog => {
      console.log(`${blog.dataValues.author}: '${blog.dataValues.title}', likes: ${blog.dataValues.likes}`)
    })

    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()