function apiFunction() {
  const url = "http://localhost:3000/"
  const get = async (path) => {
    const fetchUrl = `${url}${path}`;
    const res = await fetch(fetchUrl, {
      method: "GET",
      mode: "cors",
    });
    console.log(res);
    if(res.status == 404){
      return false;
    }
    let retData = await res.json();
    return retData;
  };

  const post_json = async (path, data) => {
    const fetchUrl = `${url}${path}`;
    // console.log("Calling ")
    const res = await fetch(fetchUrl, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    return await res.json();
  };

  const post = async (path, data) => {
    const fetchUrl = `${url}${path}`;
    console.log("Calling post method");
    const res = await fetch(fetchUrl, {
      method: "POST",
      mode: "cors",
      body: data,
    });
    return await res.json();
  };

  const update = async (path, data) => {
    const fetchUrl = `${url}${path}`;
    const res = await fetch(fetchUrl, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    return res.status;
  }

  const remove = async (path) => {
    const fetchUrl = `${url}${path}`;
    const res = await fetch(fetchUrl, {
      method: "DELETE",
      mode: "cors"
    });
    return res.status == 200 ? true : false;
  }

  return { get, post_json, post, remove, update };
}

export const api=apiFunction();

