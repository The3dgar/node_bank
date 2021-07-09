const paginatedHelper = async  (modelDb, query, skip, limit ) => {
  
  const findPromise = new Promise((res) => {
    modelDb.find(query).skip(skip).limit(parseInt(limit)).then(res)
  })

  const totalPromise = new Promise((res) => {
    modelDb.find(query).countDocuments().then(res)
  })

  return Promise.all([totalPromise, findPromise])
}

export default paginatedHelper