export interface RapidResponse {
  id: string
  name: string
  status: 'Active' | 'Eliminated'
  properties: number
  lastPropertyEntry: string
  price: string
  lastDeploy: string
}
