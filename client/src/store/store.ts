import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../service/AuthService";
import axios from 'axios'
import { API_URL } from "../http";
import { AuthResponse } from "../models/response/AuthResponse";

export default class Store {
    user = {} as IUser
    isAuth = false
    isLoading = false
    
    constructor() {
        makeAutoObservable(this)
    }

    setAuth(flag: boolean) {
        this.isAuth = flag
    }

    setUser(user: IUser) {
        this.user = user
    }

    setLoading(flag: boolean) {
        this.isLoading = flag
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async ckeckAuth() {
        this.setLoading(true)
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e)
        }
        finally {
            this.setLoading(false)
        }
    }
}