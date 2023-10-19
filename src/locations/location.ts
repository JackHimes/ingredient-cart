export interface Location {
  locationId: string
  storeNumber: string
  divisionNumber: string
  chain: string
  address: Address
  geolocation: Geolocation
  name: string
  hours: LocationHours
  phone: string
  departments: Department[]
}

export interface Address {
  addressLine1: string
  city: string
  state: string
  zipCode: string
  county: string
}

export interface Geolocation {
  latitude: number
  longitude: number
  latLng: string
}

export interface LocationHours {
  timezone: string
  gmtOffset: string
  open24: boolean
  monday: Hours
  tuesday: Hours
  wednesday: Hours
  thursday: Hours
  friday: Hours
  saturday: Hours
  sunday: Hours
}

export interface Hours {
  open: string
  close: string
  open24: boolean
}

export interface Department {
  departmentId: string
  name: string
  hours?: DepartmentHours
  phone?: string
}

export interface DepartmentHours {
  open24: boolean
  monday: Hours
  tuesday: Hours
  wednesday: Hours
  thursday: Hours
  friday: Hours
  saturday: Hours
  sunday: Hours
}
