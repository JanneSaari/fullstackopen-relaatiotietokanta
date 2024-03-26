const errorHandler = (error, request, response, next) => {
  console.error(error)
  // console.error(error.message)

  switch (error.name) {
    case 'SequelizeValidationError':
      return response.status(400).send({error: error.message})
    case 'SequelizeUniqueConstraintError':
      return response.status(400).send({
        error: `unique fields already in use: ${JSON.stringify(error.fields)}`})
    case 'SequelizeDatabaseError':
      return response.status(400).send({error: error.message})
    default:
      next(error)
      break;
  }
}

module.exports = errorHandler