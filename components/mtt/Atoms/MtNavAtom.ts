import {atom} from 'jotai'
import { MttNavItems } from '../MttNavigation/NavList'
import { MtNavItemsProp } from '../Types/MttTypes'





export const MttNavIsVisibleAtom = atom(true)
export const MttNavIsExpandedAtom = atom(true)
export const MttNavIsMobileSIdeAtom = atom(true)
export const NavHeading = atom<string | null>(null)
export const MttNavItemsATOM = atom<MtNavItemsProp[] | null>(MttNavItems?MttNavItems:null)