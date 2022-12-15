export const BASE_URL = "https://auth.nomoreparties.co";

function checkResponse(response) {
  if (response.ok) {
    return response.json()
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}

export const register = async (email, password) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  });
  return checkResponse(response);
};

export const authorize = async (email, password) => {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  });
  const data = await checkResponse(response);
  if (data.token) {
    localStorage.setItem("jwt", data.token);

    return data;
  }
};

export const checkToken = async (token) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await checkResponse(response);
  return data;
};
