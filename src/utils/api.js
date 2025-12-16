import { baseUrl } from "./constants";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
}

export const getProfile = (token) => {
  return fetch(`${baseUrl}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
};

export const updateBudget = (token, budget) => {
  return fetch(`${baseUrl}/profile/budget`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ budget }),
  }).then(checkResponse);
};

export const addGift = (token, gift) => {
  return fetch(`${baseUrl}/gifts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(gift),
  }).then(checkResponse);
};

export const updateGiftStatus = (token, index, status) => {
  return fetch(`${baseUrl}/gifts/${index}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  }).then(checkResponse);
};

export const deleteGift = (token, index) => {
  return fetch(`${baseUrl}/gifts/${index}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
};
export async function uploadAvatar(token, file) {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await fetch(`${baseUrl}/profile/avatar`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Avatar upload failed");
  return res.json();
}
