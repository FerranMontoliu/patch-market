import { type Response, Router } from 'express'
import { Category, Patch } from '../models'
import { WebRequest } from '../types'
import { userExtractorMiddleware } from '../utils/middlewares'
import { type UserType } from '../models/user'
import { logError } from '../utils/logger'

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
    response.status(500).json({ error: 'Internal server error', details: error.message })
  }
})

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
    categories: [],
    image: image,
    tradeable: false
  })
  const categoriesPromises = categoriesNames.map(async (category : string) => {
    const newCategory = new Category({
      name: category
    })
    const categoryExists = await Category.findOne({ name: category })
    if (!categoryExists) {
      try {
        const addedCategory = await newCategory.save()
        patchToSave.categories.push(addedCategory._id)
      } catch(error) {
        logError('Error saving new category.')
        response.status(500).json({ error: 'Error saving new category.' })
        return
      }
    } else {
      patchToSave.categories.push(categoryExists._id)
    }
  })
  await Promise.all(categoriesPromises)
  try{
    const savedPatch = await patchToSave.save()
    response.status(201).json(savedPatch)
  } catch (error) {
    logError(error)
    response.status(500).json({ error: 'Error saving new patch.' })
  }
})

patchesRouter.put('/tradeable', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
  const { patch, tradeable } = request.body
  const user: UserType = request.user

  if (user.id === patch.owner.id) {
    const updatedPatch = await Patch
      .findByIdAndUpdate(patch.id, { tradeable: tradeable }, { new: true })
    if (updatedPatch) {
      response.json(updatedPatch)
    } else {
      logError('Error in changing the tradable status.')
      response.status(500).json({ error: 'Error in listing or delisting the patch.' })
    }
  }
  else {
    logError('User unauthorized to modify this patch.')
    response.status(401).json({ error: 'Unauthorized to modify this patch.' })
  }
})
