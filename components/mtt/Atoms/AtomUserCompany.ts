import { Prisma } from '@prisma/client'
import {atom} from 'jotai'



export const UserCompany = atom<Prisma.CompaniesCreateInput>()
