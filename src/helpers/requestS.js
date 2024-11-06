import { useAlertStore } from '../store/alert.store';
import { useAuthStore } from '../store/auth.store';

export const requestS = {
  get: request('GET'),
  post: request('POST'),
  upload: request('POST', true),
  put: request('PUT'),
  patch: request('PATCH'),
  delete: request('DELETE'),
};

function request(method, isUpload = false) {
  return async (url, params) => {
    const requestOptions = {
      method,
      headers: userToken(url),
    };

    if (method === 'PUT' && params instanceof FormData) {
      params.append('_method', 'PUT');
      requestOptions.method = 'POST';
    }

    switch (method) {
      case 'GET':
        if (params && Object.keys(params).length) {
          url += `?${new URLSearchParams(params).toString()}`;
        }
        break;

      default:
        if (params instanceof FormData) {
          requestOptions.body = params;
        } else if (params && !isUpload) {
          requestOptions.headers['Content-Type'] = 'application/json';
          requestOptions.body = JSON.stringify(params);
        } else if (params) {
          requestOptions.body = params;
        }
        break;
    }

    const response = await fetch(url, requestOptions);
    return handleResponse(response);
  };
}

function userToken(url) {
  const { token } = useAuthStore();
  const isLoggedIn = !!token;
  // eslint-disable-next-line no-undef
  const isApiUrl = url.startsWith(process.env.VUE_APP_API_URL);
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

function listErrors(errors) {
  let messages = '';
  if (typeof errors === 'object') {
    for (const [field, msgs] of Object.entries(errors)) {
      if (Array.isArray(msgs)) {
        msgs.forEach((msg) => {
          messages += `${msg}\r\n`;
        });
      } else if (typeof msgs === 'string') {
        messages += `${msgs}\r\n`;
      }
    }
  } else if (typeof errors === 'string') {
    messages += `${errors}\r\n`;
  }
  return messages.trim();
}

async function handleResponse(response) {
  const isJson = response.headers?.get('content-type')?.includes('application/json');
  
  const data = isJson ? await response.json() : true;

  if (!response.ok) {
    const alertStore = useAlertStore();
    const { user } = useAuthStore();
    let msgDefault;

    if ([401, 403].includes(response.status) && user) {
      msgDefault = 'Sem permissão para acessar.';
    }

    if ([502].includes(response.status) && user) {
      msgDefault = 'Erro de comunicação do servidor.';
    }

    let errorMessage = msgDefault ?? response.statusText ?? 'Ocorreu um erro.';
    if (data) {
      if (data.errors) {
        errorMessage = listErrors(data.errors);
      } else if (data.error) {
        errorMessage = data.error;
      } else if (data.message) {
        errorMessage = data.message;
      }
    }

    alertStore.error(errorMessage);
    return Promise.reject(errorMessage);
  } 

  return data;
}
