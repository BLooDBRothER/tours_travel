function apiFunction() {
  const get = async (url) => {
    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
    });
    let retData = await res.json();
    return retData;
  };

  const post_json = async (url, data) => {
    console.log("Calling ")
    const res = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    let retData = await res.json();
    return retData;
  };

  const post = async (url, data) => {
    console.log("Calling post method");
    const res = await fetch(url, {
      method: "POST",
      mode: "cors",
      body: data,
    });
    let retData = await res.json();
    return retData;
  };

  return { get, post_json, post };
}

export const api=apiFunction();

