require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(encodeURI(process.env.PGHOST), {logging: false})

const main = async () => {
  try {
    await sequelize.authenticate()
    const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
    blogs.map(blog => {
      console.log(`${blog.author}: '${blog.title}', likes: ${blog.likes}`)
    })

    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()