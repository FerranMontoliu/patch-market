import { Router, type Response } from 'express'
import { Patch, Category } from '../models'
import { WebRequest } from '../types'
import { userExtractorMiddleware } from '../utils/middlewares'
import { type UserType } from '../models/user'
import { logInfo } from '../utils/logger'

export const patchesRouter = Router()

patchesRouter.get('/owned', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
  const user: UserType = request.user

  const patches = await Patch
    .find({
      owner: user.id,
    })
    .populate('owner', {
      name: 1,
      surname: 1,
    })
    .populate('university', {
      name: 1,
    })
    .populate('categories', {
      name: 1,
    })

  response.json(patches)
})

patchesRouter.get('/tradeable', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
  const user: UserType = request.user
  try {
    const patches = await Patch.find({
      tradeable: true,
      owner: { $ne: user.id }, // Exclude patches owned by the current user
    })
      .populate('owner', 'name surname')
      .populate('university', 'name')
      .populate('categories', 'name')

    response.json(patches)
  } catch (error) {
    console.error('Error while retrieving tradeable patches:', error)
    response.status(500).json({ error: 'Internal server error', details: error.message })
  }
})



//const patches = await Patch
//  .find({
//    tradeable: true,
//  owner: { $ne: user.id }, // TODO: THIS DOES NOT WORK, FIX IT
//})
// .populate('owner', {
//   name: 1,
// })
// .populate('university', {
//   name: 1,
// })
// .populate('categories', {
//   name: 1,
// })

//response.json(patches)
//})

patchesRouter.get('/:id', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
  const patch = await Patch
    .findById(request.params.id)
    .populate('owner', {
      name: 1,
      surname: 1,
    })
    .populate('university', {
      name: 1,
    })
    .populate('categories', {
      name: 1,
    })

  if (patch) {
    response.json(patch)
  } else {
    response.status(404).end()
  }
})

patchesRouter.post('/', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
  const { title, description, universityId, categoriesNames, image } = request.body
  const user: UserType = request.user
  const patchToSave = new Patch({
    owner: user.id,
    title: title,
    university: universityId,
    description: description,
    image: image,
    isTradeable: false
  })

  categoriesNames.forEach(async (category : string) => {
    const newCategory = new Category({
      name: category
    })
    const categoryExists = await Category.findOne({ name: category })
    if(!categoryExists){
      try{
        await newCategory.save()
        patchToSave.categories.push(newCategory._id)
      }catch(error){
        logInfo('Error saving new category.')
        response.status(500).json({ error: 'Error saving new category.' })
        return
      }
    }
    else{
      patchToSave.categories.push(categoryExists._id)
    }
  })

  try{
    const savedPatch = await patchToSave.save()
    response.status(201).json(savedPatch)
  } catch (error) {
    logInfo(error)
    response.status(500).json({ error: 'Error saving new patch.' })
  }
})
