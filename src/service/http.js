import axios from 'axios'
import { isAuth, tempoExpirou } from '../auth'
import Router from '../router'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_HG
})

const intercepRequest = async (config) => {
  if ( ! isAuth()) {
    tempoExpirou()
    // console.log('isAuth - DENIED');
    // redirect
    Router.push('/logout')
  }
  return config
}

const intercepRequestError = (error) => {
  let rejection = error.request
  console.log(rejection)
  // setSearching(false)
  if (error.status === 500) {
    // setToast('error', 'Houve um erro no servidor, por favor tente mas tarde.', '', null)
    // console.log('Error!', 'Houve um erro no servidor, por favor tente mas tarde.')
  }

  if (error.status === 401 && error.config.url.indexOf('login') < 0) {
    // setToast('info', rejection.data.message, '', null)
    // console.log('info', '', 'Recurso não disponível para a sua função.')
  }

  if (error.status === 405 || error.status === 404 || error.status === 403) {
    // setToast('error', rejection.data.message, '', null)
    // console.log('Error!', error.statusText)
  }

  if (error.status === 400) {
    if (error.data && error.data.message) {
      // setToast('warning', rejection.data.message, '', null)
      // console.log('warning', 'Atenção!', error.data.message)
    } else {
      // setToast('warning', 'Por favor verifique os valores digitados.', '', null)
      // console.log('warning', 'Atenção!', 'Por favor verifique os valores digitados.')
    }
  }
  return error.response
}

const intercepResponse = (response) => {
  // setSearching(false)
  response.config.method = response.config.method.toUpperCase()
  if ((response.config.method === 'POST' || response.config.method === 'PUT' || response.config.method === 'DELETE') && response.config.url.indexOf('rest') > 0 && response.config.url.indexOf('login') === -1) {
    if (typeof response.data.data === 'string') {
      // setToast('success', response.data.data, '', null)
    } else if (response.data.code === 200 || response.data.code === 201) {
      if (response.config.method === 'POST') {
        // setToast('success', 'Registro inserido.', '', null)
      } else if (response.config.method === 'PUT') {
        // setToast('success', 'Registro atualizado.', '', null)
      } else if (response.config.method === 'DELETE') {
        // setToast('success', 'Registro excluído.', '', null)
      }
    }
    // console.log('Sucesso', response.data.data)
  }
  return response
}

const intercepResponseError = (error) => {
  let rejection = error.response
  // setSearching(false)
  if (rejection.status === 500) {
    // setToast('error', 'Houve um erro no servidor, por favor tente mas tarde.', '', null)
    // console.log('Error!', 'Houve um erro no servidor, por favor tente mas tarde.')
  }

  if (rejection.status === 401 && rejection.config.url.indexOf('login') < 0 && rejection.config.url.indexOf('menu') < 0) {
    // setToast('info', rejection.data.message, '', null)
    // console.log('info', '', 'Recurso não disponível para a sua função.')
  }

  if (rejection.status === 405 || rejection.status === 404 || rejection.status === 403) {
    // || rejection.status === 403) { tratar esse cara depois
    // setToast('error', rejection.data.message, '', null)
  }

  if (rejection.status === 400) {
    if (rejection.data && rejection.data.message) {
      // setToast('warning', rejection.data.message, '', null)
      // console.log('warning', 'Atenção!', rejection.data.message)
    } else {
      // setToast('warning', 'Por favor verifique os valores digitados.', '', null)
      // console.log('warning', 'Atenção!', 'Por favor verifique os valores digitados.')
    }
  }
  return error.response
}

http.interceptors.request.use(intercepRequest, intercepRequestError)
http.interceptors.response.use(intercepResponse, intercepResponseError)

export default http