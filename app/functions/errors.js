import { showToast } from './helpers';

export class ApiError {
  constructor(message = 'Une erreur s\'est produite. Veuillez réessayer ultérieurement.') {
    this.message = message;
  }

  show() {
    showToast(this.message)
  }
}

export const handleErrors = async response => {
  if (!response.ok) {
    const jsonResponse = await response.json()
    throw new ApiError(jsonResponse.error)
  } else if (response.status === 500) {
    throw new ApiError();
  }

  return response;
}

export const catchErrors = error => {
  console.log('Error type :', error instanceof ApiError ? 'API' : 'Internal');
  console.log('Error :', error.message);

  if (error instanceof ApiError) {
    error.show()
  } else { 
    showToast();
  }
}