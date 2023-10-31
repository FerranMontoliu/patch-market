import { Router, type Response } from 'express'
import { Patch } from '../models/patch'
import { WebRequest } from '../types'
import { userExtractorMiddleware } from '../utils/middlewares'
import { type UserType } from '../models/user'

export const patchesRouter = Router()

patchesRouter.get('/owned', userExtractorMiddleware, async (request: WebRequest, response: Response): Promise<void> => {
  const user: UserType = request.user

  const patches = await Patch
    .find({
      user: user.id,
    })
    .populate('user', {
      name: 1,
    })
    .populate('university', {
      name: 1,
    })
    .populate('categories', {
      name: 1,
    })

  response.json(patches)
})

patchesRouter.get('/tradeable', async (request: WebRequest, response: Response): Promise<void> => {
  const patches = await Patch
    .find({
      tradeable: true,
    })
    .populate('user', {
      name: 1,
    })
    .populate('university', {
      name: 1,
    })
    .populate('categories', {
      name: 1,
    })

  response.json(patches)
})

patchesRouter.get('/:id', async (request: WebRequest, response: Response): Promise<void> => {
  const patch = await Patch
    .findById(request.params.id)
    .populate('user', {
      name: 1,
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

// patchesRouter.post('/', async (request: WebRequest, response: Response): Promise<void> => {
//   // TODO: CREATE PATCH
//   const patchToSave = new Patch({
//     // TODO
//   })
//
//   // TODO: LINK EXISTING CATEGORIES AND CREATE NEW CATEGORIES NEEDED
//
//   const savedPatch = await patchToSave.save()
//
//   response.status(201).json(savedPatch)
// })
