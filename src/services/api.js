function __buildHeaders(opts = {}) {
  const { authToken, type } = opts;
  let headers = {
    'X-GOODCITY-APP-NAME': 'settings_editor',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  switch (type) {
    case 'json':
      headers['Content-Type'] = 'application/json';
      break;
    case 'form':
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
      break;
  };
  return headers;
}

async function __request(url, opts) {
  const res = await fetch(url, opts);
  const data = await res.json();
  if (res.status >= 400) {
    throw data;
  }
  return data;
}

function __serializeForm(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
};

export default {

  putJSON(url, data, authToken) {
    return __request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: __buildHeaders({ authToken, type: 'json' })
    });
  },

  postJSON(url, data, authToken) {
    return __request(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: __buildHeaders({ authToken, type: 'json' })
    });
  },

  postForm(url, data, authToken) {
    return __request(url, {
      method: 'POST',
      body: __serializeForm(data),
      headers: __buildHeaders({ authToken, type: 'form' })
    });
  },

  get(url) {
    return __request(url, {
      headers: __buildHeaders()
    });
  },

  delete(url, authToken) {
    return __request(url, {
      method: 'DELETE',
      headers: __buildHeaders({ authToken })
    });
  }
};