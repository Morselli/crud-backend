
interface IUserDto {
  name: string,
  email: string,
  password: string
}

interface IRequest {
  email: string,
  password: string
}

interface IResponse {
  token: string,
  user: {
    id: string,
    name: string,
    email: string
  }
}

export { IUserDto, IRequest, IResponse }