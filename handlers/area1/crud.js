const { PrismaClient } = require('@prisma/client')
const res = require('express/lib/response')

const prisma = new PrismaClient()

async function create(timestamp) {
  let response
  prisma.area1.findMany({
  where: {
    AND: [
      {
        time: {
          gte: parseInt(timestamp) - 1,
        }
      },
      {
        time: {
          lte: parseInt(timestamp),
        }
      }
    ],
  },
  }).then(res => {
    console.log(res)
    if(res.length > 0)
    {
      response = prisma.area1.create({
        data: {
          time: parseInt(timestamp),
          direction: "Leaving"
        }
      }).then(res => {
      return {"Status": "Success", "Data": res}
      }).catch(err => {
        console.log(err)
        return {"Status": "Error", "Data": err}
      })
    }
    else
    {
      response = prisma.area1.create({
        data: {
          time: parseInt(timestamp),
          direction: "Entering"
        }
      }).then(res => {
      return {"Status": "Success", "Data": res}
      }).catch(err => {
        console.log(err)
        return {"Status": "Error", "Data": err}
      })
    }
  }).catch(err => {
    return err
  })


  // if(records.length == 0)
  // {
  //   response = prisma.area1.create({
  //     data: {
  //       time: parseInt(timestamp),
  //       direction: "Entering"
  //     }
  //   }).then(res => {
  //   return {"Status": "Success", "Data": res}
  //   }).catch(err => {
  //     console.log(err)
  //     return {"Status": "Error", "Data": err}
  //   })
  // }else 
  // {
  //   response = prisma.area1.create({
  //     data: {
  //       time: parseInt(timestamp),
  //       direction: "Leaving"
  //     }
  //   }).then(res => {
  //   return {"Status": "Success", "Data": res}
  //   }).catch(err => {
  //     console.log(err)
  //     return {"Status": "Error", "Data": err}
  //   })
  // }
  return await response
}

async function get() {
   const response = prisma.area1.findMany({}).then(res => {
    return {"Status": "Success", "Data": res}
  }).catch(err => {
    return {"Status": "Error", "Data": err}
  })
  return await response
}

async function nuke() {
  const response = prisma.area1.deleteMany({}).then(res => {
    return {"Status": "Success", "Data": res}
  }).catch(err => {
    return {"Status": "Error", "Data": err}
  })
  return await response
}

module.exports = { create, nuke, get }
